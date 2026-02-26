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
        <div className="w-full">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-100">Create an account</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    label="Username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    label="Password"
                    type="password"
                    required
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

                <Button type="submit" className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-200" size="lg">
                    Continue
                </Button>
            </form>

            <div className="mt-6 text-sm text-gray-400">
                <Link to="/login" className="font-medium text-indigo-400 hover:underline">Already have an account?</Link>
            </div>
        </div>
    );
}
