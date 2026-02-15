import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

const Dashboard = () => {
    const { user, logoutUser } = useAuth();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-[#FFF9F0] p-5">
            <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50">
                <div className="w-20 h-20 bg-[#F48C06]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                    👋
                </div>
                <h1 className="text-4xl font-bold mb-4 text-[#103741] font-[var(--font-heading)]">Dashboard</h1>
                <p className="text-xl mb-8 text-[#1F1F1F]">
                    Welcome, <span className="font-semibold text-[#F48C06]">{user?.email}</span>! <br />
                    <span className="text-base text-[#696984] block mt-2">This dashboard is under construction.</span>
                </p>

                <button
                    onClick={logoutUser}
                    className="w-full bg-[#103741] text-white py-4 rounded-xl font-semibold transition-all hover:bg-[#0d2e36] hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-3"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
