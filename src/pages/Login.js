import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate a small delay for better UX
        setTimeout(async () => {
            const result = await loginUser(email, password);
            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error);
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF9F0] to-[#FFE8CC] p-5">
            <div className="w-full max-w-[1000px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden grid md:grid-cols-2 min-h-[600px]">
                {/* Left Side - Form */}
                <div className="p-8 md:p-12 flex flex-col justify-center bg-white order-2 md:order-1">
                    <div className="mb-10 text-center md:text-left">
                        <h1 className="text-4xl font-bold text-[#103741] mb-3 font-[var(--font-heading)]">Welcome Back</h1>
                        <p className="text-[#696984] text-lg">Please enter your details to sign in.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium border border-red-100">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#103741] block">Email Address</label>
                            <div className="relative group">
                                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F48C06] transition-colors" />
                                <input
                                    type="email"
                                    className="w-full p-4 pl-12 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white text-gray-700 font-medium transition-all focus:border-[#F48C06] focus:ring-4 focus:ring-[#F48C06]/10 outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-[#103741] block">Password</label>
                            <div className="relative group">
                                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F48C06] transition-colors" />
                                <input
                                    type="password"
                                    className="w-full p-4 pl-12 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white text-gray-700 font-medium transition-all focus:border-[#F48C06] focus:ring-4 focus:ring-[#F48C06]/10 outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#F48C06] text-white h-14 rounded-xl font-bold text-lg hover:bg-[#e07b00] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#F48C06]/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className="animate-spin" size={24} /> : <>Sign In <ArrowRight size={20} /></>}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500">
                            Don't have an account? <span className="text-[#F48C06] font-bold cursor-pointer hover:underline underline-offset-2">Sign up</span>
                        </p>
                    </div>
                </div>

                {/* Right Side - Visual */}
                <div className="hidden md:flex relative bg-[#103741] p-12 flex-col justify-between text-white overflow-hidden order-1 md:order-2">
                    {/* Background Pattern - Subtle Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>

                    {/* Top Content */}
                    <div className="relative z-10 pt-10 h-full flex flex-col justify-center">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/5 shadow-lg backdrop-blur-sm">
                            <span className="text-3xl">⚡</span>
                        </div>
                        <h2 className="text-5xl lg:text-6xl font-bold mb-6 font-[var(--font-heading)] leading-tight tracking-tight text-white drop-shadow-md">
                            Start your <br />
                            <span className="text-[#F48C06]">learning journey.</span>
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-md font-light">
                            Join thousands of learners from around the world and master new skills today.
                        </p>
                    </div>

                    {/* Simple Copyright */}
                    <div className="absolute bottom-12 right-12 text-xs text-white/30 font-medium tracking-widest uppercase">
                        © EduEra {new Date().getFullYear()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
