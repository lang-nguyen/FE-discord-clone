import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt', { email, password });
    };

    return (
        <div className="w-full">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-100">Welcome Back!</h1>
                <p className="text-gray-400 text-sm mt-1">We're so excited to see you again!</p>
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
                    label="Password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="text-left mt-1">
                    <Link to="#" className="text-sm font-medium text-indigo-400 hover:underline">Forgot your password?</Link>
                </div>
                <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-200" size="lg">
                    Log In
                </Button>
            </form>

            <div className="mt-6 text-sm text-gray-400">
                Need an account? <Link to="/register" className="font-medium text-indigo-400 hover:underline">Register</Link>
            </div>
        </div>
    );
}
