import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "@/features/auth/api/auth.api";
import { profileApi } from "@/features/users/api/profile.api";
import { logoutThunk, updateProfileThunk } from "@/store/slices/authSlice";

const initialPasswordVisibility = {
  currentPassword: false,
  newPassword: false,
  confirmPassword: false,
};

export function useUserSettingsModal({ open, onOpenChange }) {
  const dispatch = useDispatch();
  const { profile, status, error } = useSelector((state) => state.auth);
  const [activeSection, setActiveSection] = useState("profile");
  const [form, setForm] = useState({
    displayName: "",
    bio: "",
    note: "",
    avatarMediaId: null,
    bannerColor: "#5865F2",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [visiblePasswords, setVisiblePasswords] = useState(initialPasswordVisibility);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUploadMessage, setAvatarUploadMessage] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("idle");
  const [passwordMessage, setPasswordMessage] = useState("");

  const isLoading = status === "loading";
  const isPasswordLoading = passwordStatus === "loading";

  useEffect(() => {
    if (open) {
      setForm({
        displayName: profile?.displayName || "",
        bio: profile?.bio || "",
        note: profile?.note || "",
        avatarMediaId: profile?.avatarMediaId ?? null,
        bannerColor: profile?.bannerColor || "#5865F2",
      });
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setVisiblePasswords(initialPasswordVisibility);
      setAvatarFile(null);
      setAvatarUploadMessage("");
      setPasswordMessage("");
    }
  }, [open, profile]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updatePasswordField = (field, value) => {
    setPasswordForm((current) => ({ ...current, [field]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setVisiblePasswords((current) => ({ ...current, [field]: !current[field] }));
  };

  const updateAvatarFile = (file) => {
    setAvatarFile(file);
    setAvatarUploadMessage(file ? file.name : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAvatarUploadMessage("");

    let avatarMediaId = form.avatarMediaId ?? null;
    if (avatarFile) {
      try {
        const uploadedAvatar = await profileApi.uploadAvatar(avatarFile);
        avatarMediaId = uploadedAvatar.id;
      } catch (uploadError) {
        setAvatarUploadMessage(
          uploadError.response?.data?.message ||
          uploadError.response?.data?.Message ||
          "Unable to upload avatar."
        );
        return;
      }
    }

    const result = await dispatch(updateProfileThunk({
      displayName: form.displayName,
      bio: form.bio || null,
      note: form.note || null,
      avatarMediaId,
      bannerColor: form.bannerColor || null,
      bannerUrl: null,
    }));

    if (updateProfileThunk.fulfilled.match(result)) {
      onOpenChange(false);
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    window.location.assign("/login");
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setPasswordMessage("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("New password and confirmation do not match.");
      return;
    }

    setPasswordStatus("loading");
    try {
      await authApi.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordMessage("Password changed successfully.");
    } catch (changeError) {
      setPasswordMessage(
        changeError.response?.data?.message ||
        changeError.response?.data?.Message ||
        "Unable to change password."
      );
    } finally {
      setPasswordStatus("idle");
    }
  };

  const navItemClass = (section) =>
    `mt-2 flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm ${
      activeSection === section
        ? "bg-[#404249] font-semibold text-white"
        : "text-gray-300 hover:bg-white/5 hover:text-white"
    }`;

  return {
    activeSection,
    avatarFile,
    avatarUploadMessage,
    error,
    form,
    handleChangePassword,
    handleLogout,
    handleSubmit,
    isLoading,
    isPasswordLoading,
    navItemClass,
    passwordForm,
    passwordMessage,
    setActiveSection,
    togglePasswordVisibility,
    updateField,
    updateAvatarFile,
    updatePasswordField,
    visiblePasswords,
  };
}
