import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "@/features/auth/api/auth.api";
import {
  clearAuthSession,
  getStoredAccessToken,
  getStoredAuthUser,
  getStoredRefreshToken,
  persistAuthSession,
} from "@/features/auth/utils/authStorage";
import { profileApi } from "@/features/users/api/profile.api";

const storedAuth = getStoredAuthUser();

const initialState = {
  accessToken: getStoredAccessToken(),
  refreshToken: getStoredRefreshToken(),
  user: storedAuth?.user ?? null,
  profile: storedAuth?.profile ?? null,
  status: "idle",
  error: null,
  bootstrapped: false,
};

function getErrorMessage(error, fallback) {
  return error.response?.data?.message || error.response?.data?.Message || error.message || fallback;
}

function buildUserFromLoginResponse(response) {
  return {
    id: response.profile?.id ?? null,
    username: response.profile?.displayName ?? "Discord User",
    email: null,
  };
}

function normalizeCurrentAccount(response) {
  return {
    user: {
      id: response.id,
      username: response.username,
      email: response.email ?? null,
    },
    profile: response.profile,
  };
}

export const bootstrapAuthThunk = createAsyncThunk(
  "auth/bootstrap",
  async (_, { rejectWithValue }) => {
    const accessToken = getStoredAccessToken();
    const refreshToken = getStoredRefreshToken();

    if (!accessToken) {
      clearAuthSession();
      return { accessToken: null, refreshToken: null, user: null, profile: null };
    }

    try {
      const account = await authApi.me();
      const { user, profile } = normalizeCurrentAccount(account);
      persistAuthSession({ accessToken, refreshToken, user, profile });
      return { accessToken, refreshToken, user, profile };
    } catch (error) {
      clearAuthSession();
      return rejectWithValue(getErrorMessage(error, "Session expired"));
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ usernameOrEmail, password }, { rejectWithValue }) => {
    try {
      const response = await authApi.login({ usernameOrEmail, password });
      const user = buildUserFromLoginResponse(response);
      const profile = response.profile;

      persistAuthSession({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user,
        profile,
      });

      return {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user,
        profile,
      };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Login failed"));
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ email, username, password, displayName }, { dispatch, rejectWithValue }) => {
    try {
      await authApi.register({ email, username, password, displayName });
      return await dispatch(loginThunk({ usernameOrEmail: username, password })).unwrap();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Registration failed"));
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { getState }) => {
    const refreshToken = getState().auth.refreshToken || getStoredRefreshToken();

    try {
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    } catch {
      // Local logout should still complete if the server session is already gone.
    } finally {
      clearAuthSession();
    }
  }
);

export const updateProfileThunk = createAsyncThunk(
  "auth/updateProfile",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const profile = await profileApi.updateMe(payload);
      const { accessToken, refreshToken, user } = getState().auth;
      persistAuthSession({ accessToken, refreshToken, user, profile });
      return profile;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Update profile failed"));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    clearAuthState(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.profile = null;
      state.status = "idle";
      state.error = null;
      state.bootstrapped = true;
      clearAuthSession();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bootstrapAuthThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(bootstrapAuthThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.status = "idle";
        state.error = null;
        state.bootstrapped = true;
      })
      .addCase(bootstrapAuthThunk.rejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.profile = null;
        state.status = "idle";
        state.bootstrapped = true;
      })
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.status = "authenticated";
        state.error = null;
        state.bootstrapped = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(registerThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.status = "authenticated";
        state.error = null;
        state.bootstrapped = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.profile = null;
        state.status = "idle";
        state.error = null;
        state.bootstrapped = true;
      })
      .addCase(updateProfileThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        if (state.user) {
          state.user.username = action.payload.displayName;
        }
        state.status = "authenticated";
        state.error = null;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.status = "authenticated";
        state.error = action.payload;
      });
  },
});

export const { clearAuthError, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
