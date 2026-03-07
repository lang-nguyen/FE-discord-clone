import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';

export function RegisterPage() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Register attempt', { email, username, password, dob });
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

                {/* Button dùng từ component */}
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full mt-6"
                >
                    Continue
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