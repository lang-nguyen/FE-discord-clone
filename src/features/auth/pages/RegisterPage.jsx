import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { clearAuthError, registerThunk } from '@/store/slices/authSlice';

export function RegisterPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');

    const isLoading = status === "loading";

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(clearAuthError());

        const result = await dispatch(registerThunk({
            email,
            username,
            password,
            displayName: displayName || username,
            dob,
        }));

        if (registerThunk.fulfilled.match(result)) {
            navigate("/channels/@me", { replace: true });
        }
    };

    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-100">
                    Create an account
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                <Input
                    label="Email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    label="Username"
                    type="text"
                    required
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                    label="Display Name"
                    type="text"
                    placeholder="How others see you"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />

                <Input
                    label="Password"
                    type="password"
                    required
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Input
                    label="Date of Birth"
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />

                {error && (
                    <p className="rounded-sm bg-red-500/10 px-3 py-2 text-sm text-red-300">
                        {error}
                    </p>
                )}

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full mt-6"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating account..." : "Continue"}
                </Button>

            </form>

            <div className="mt-6 text-sm text-gray-400">
                <Link
                    to="/login"
                    className="font-medium text-[#00A8FC] hover:underline"
                >
                    Already have an account?
                </Link>
            </div>

        </div>
    );
}
