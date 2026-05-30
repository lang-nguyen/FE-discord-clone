import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "@/features/auth/api/auth.api";
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
    avatarUrl: "",
    bannerColor: "#5865F2",
    bannerUrl: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [visiblePasswords, setVisiblePasswords] = useState(initialPasswordVisibility);
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
        avatarUrl: profile?.avatarUrl || "",
        bannerColor: profile?.bannerColor || "#5865F2",
        bannerUrl: profile?.bannerUrl || "",
      });
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setVisiblePasswords(initialPasswordVisibility);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await dispatch(updateProfileThunk({
      displayName: form.displayName,
      bio: form.bio || null,
      note: form.note || null,
      avatarUrl: form.avatarUrl || null,
      bannerColor: form.bannerColor || null,
      bannerUrl: form.bannerUrl || null,
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
    updatePasswordField,
    visiblePasswords,
  };
}
