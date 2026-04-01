import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/shared/components/Input.jsx';
import { Button } from '@/shared/components/Button.jsx';

export function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Login attempt", {
            email,
            password
        });
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

                {/* Email Input */}
                <Input
                    label="Email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password Input */}
                <Input
                    label="Password"
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="text-left mt-1">
                    <Link
                        to="#"
                        className="text-sm font-medium text-[#00A8FC] hover:underline"
                    >
                        Forgot your password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    size="lg"
                    variant="primary"
                    className="w-full mt-2"
                >
                    Log In
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

        </div>
    );
}