import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/shared/components/Input.jsx';
import { Button } from '@/shared/components/Button.jsx';
import { authApi } from '@/features/auth/api/auth.api';
import { clearAuthError, loginThunk } from '@/store/slices/authSlice';
import { PasswordInput } from '@/features/users/components/PasswordInput';

export function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotCode, setForgotCode] = useState("");
    const [resetPassword, setResetPassword] = useState("");
    const [resetPasswordConfirm, setResetPasswordConfirm] = useState("");
    const [forgotMessage, setForgotMessage] = useState("");
    const [forgotStep, setForgotStep] = useState("email");
    const [isForgotOpen, setIsForgotOpen] = useState(false);
    const [isForgotLoading, setIsForgotLoading] = useState(false);
    const [visibleResetPassword, setVisibleResetPassword] = useState({
        newPassword: false,
        confirmPassword: false,
    });

    const isLoading = status === "loading";

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(clearAuthError());

        const result = await dispatch(loginThunk({ usernameOrEmail, password }));
        if (loginThunk.fulfilled.match(result)) {
            navigate("/channels/@me", { replace: true });
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setIsForgotLoading(true);
        setForgotMessage("");

        try {
            await authApi.forgotPassword(forgotEmail);
            setForgotMessage("If the email exists, a reset code has been sent.");
            setForgotStep("code");
        } catch (forgotError) {
            setForgotMessage(forgotError.response?.data?.message || "Unable to send reset email.");
        } finally {
            setIsForgotLoading(false);
        }
    };

    const handleVerifyResetCode = async (e) => {
        e.preventDefault();
        setIsForgotLoading(true);
        setForgotMessage("");

        try {
            await authApi.verifyResetCode({ email: forgotEmail, code: forgotCode });
            setForgotMessage("Code verified. Enter a new password.");
            setForgotStep("password");
        } catch (verifyError) {
            setForgotMessage(verifyError.response?.data?.message || "Invalid or expired code.");
        } finally {
            setIsForgotLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setForgotMessage("");

        if (resetPassword !== resetPasswordConfirm) {
            setForgotMessage("New password and confirmation do not match.");
            return;
        }

        setIsForgotLoading(true);
        try {
            await authApi.resetPassword({
                email: forgotEmail,
                code: forgotCode,
                newPassword: resetPassword,
            });
            setForgotMessage("Password reset successfully. You can log in now.");
            setForgotStep("done");
        } catch (resetError) {
            setForgotMessage(resetError.response?.data?.message || "Unable to reset password.");
        } finally {
            setIsForgotLoading(false);
        }
    };

    const openForgotPassword = () => {
        setIsForgotOpen(true);
        setForgotStep("email");
        setForgotEmail(usernameOrEmail.includes("@") ? usernameOrEmail : "");
        setForgotCode("");
        setResetPassword("");
        setResetPasswordConfirm("");
        setForgotMessage("");
        setVisibleResetPassword({ newPassword: false, confirmPassword: false });
    };

    const closeForgotPassword = () => {
        setIsForgotOpen(false);
    };

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-100">
                    Welcome Back!
                </h1>

                <p className="text-gray-400 text-sm mt-2">
                    We're so excited to see you again!
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                <Input
                    label="Email or Username"
                    type="text"
                    required
                    placeholder="Enter email or username"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                />

                <Input
                    label="Password"
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="text-left mt-1">
                    <button
                        type="button"
                        onClick={openForgotPassword}
                        className="text-sm font-medium text-[#00A8FC] hover:underline"
                    >
                        Forgot your password?
                    </button>
                </div>

                {error && (
                    <p className="rounded-sm bg-red-500/10 px-3 py-2 text-sm text-red-300">
                        {error}
                    </p>
                )}

                <Button
                    type="submit"
                    size="lg"
                    variant="primary"
                    className="w-full mt-2"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Log In"}
                </Button>

            </form>

            <div className="mt-6 text-sm text-gray-400">
                Need an account?{" "}
                <Link
                    to="/register"
                    className="font-medium text-[#00A8FC] hover:underline"
                >
                    Register
                </Link>
            </div>

            {isForgotOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
                    <div className="w-full max-w-sm rounded-md bg-[#313338] p-5 shadow-2xl">
                        <div className="mb-4">
                            <h2 className="text-lg font-bold text-gray-100">Reset password</h2>
                            <p className="mt-1 text-sm text-gray-400">Enter the email linked to your account.</p>
                        </div>

                        {forgotStep === "email" && (
                            <form onSubmit={handleForgotPassword} className="space-y-4">
                                <Input
                                    label="Email"
                                    type="email"
                                    required
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                />

                                {forgotMessage && (
                                    <p className="text-sm text-gray-300">{forgotMessage}</p>
                                )}

                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="secondary" onClick={closeForgotPassword} disabled={isForgotLoading}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isForgotLoading}>
                                        {isForgotLoading ? "Sending..." : "Send"}
                                    </Button>
                                </div>
                            </form>
                        )}

                        {forgotStep === "code" && (
                            <form onSubmit={handleVerifyResetCode} className="space-y-4">
                                <Input
                                    label="Code"
                                    type="text"
                                    inputMode="numeric"
                                    required
                                    value={forgotCode}
                                    onChange={(e) => setForgotCode(e.target.value)}
                                />
                                {forgotMessage && <p className="text-sm text-gray-300">{forgotMessage}</p>}
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="secondary" onClick={() => setForgotStep("email")} disabled={isForgotLoading}>
                                        Back
                                    </Button>
                                    <Button type="submit" disabled={isForgotLoading}>
                                        {isForgotLoading ? "Verifying..." : "Verify"}
                                    </Button>
                                </div>
                            </form>
                        )}

                        {forgotStep === "password" && (
                            <form onSubmit={handleResetPassword} className="space-y-4">
                                <PasswordInput
                                    label="New Password"
                                    required
                                    minLength={8}
                                    value={resetPassword}
                                    visible={visibleResetPassword.newPassword}
                                    onToggle={() => setVisibleResetPassword((current) => ({ ...current, newPassword: !current.newPassword }))}
                                    onChange={(e) => setResetPassword(e.target.value)}
                                />
                                <PasswordInput
                                    label="Confirm New Password"
                                    required
                                    minLength={8}
                                    value={resetPasswordConfirm}
                                    visible={visibleResetPassword.confirmPassword}
                                    onToggle={() => setVisibleResetPassword((current) => ({ ...current, confirmPassword: !current.confirmPassword }))}
                                    onChange={(e) => setResetPasswordConfirm(e.target.value)}
                                />
                                {forgotMessage && <p className="text-sm text-gray-300">{forgotMessage}</p>}
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="secondary" onClick={() => setForgotStep("code")} disabled={isForgotLoading}>
                                        Back
                                    </Button>
                                    <Button type="submit" disabled={isForgotLoading}>
                                        {isForgotLoading ? "Saving..." : "Save Password"}
                                    </Button>
                                </div>
                            </form>
                        )}

                        {forgotStep === "done" && (
                            <div className="space-y-4">
                                {forgotMessage && <p className="text-sm text-green-300">{forgotMessage}</p>}
                                <div className="flex justify-end">
                                    <Button type="button" onClick={closeForgotPassword}>
                                        Done
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}
