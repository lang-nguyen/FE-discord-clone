import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/shared/components/Input.jsx';
import { Button } from '@/shared/components/Button.jsx';
import { authApi } from '@/features/auth/api/auth.api';
import { clearAuthError, loginThunk } from '@/store/slices/authSlice';

export function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotMessage, setForgotMessage] = useState("");
    const [isForgotOpen, setIsForgotOpen] = useState(false);
    const [isForgotLoading, setIsForgotLoading] = useState(false);

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
            setForgotMessage("If the email exists, a reset link has been sent.");
        } catch (forgotError) {
            setForgotMessage(forgotError.response?.data?.message || "Unable to send reset email.");
        } finally {
            setIsForgotLoading(false);
        }
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
                        onClick={() => {
                            setIsForgotOpen(true);
                            setForgotEmail(usernameOrEmail.includes("@") ? usernameOrEmail : "");
                        }}
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
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => setIsForgotOpen(false)}
                                    disabled={isForgotLoading}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isForgotLoading}>
                                    {isForgotLoading ? "Sending..." : "Send"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
