import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, User, Lock, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login - in a real app, this would call an API
        console.log('Logging in with:', credentials);
        navigate('/dashboard');
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50"></div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="w-full max-w-md bg-white border border-slate-200 shadow-2xl p-8 relative z-10 rounded-none"
            >
                <div className="mb-8 relative">
                    <button
                        onClick={() => navigate('/')}
                        className="absolute left-0 top-1 text-slate-400 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-3xl font-bold text-center text-slate-800 tracking-tight mt-2">
                        VAYU <span className="text-blue-600">AI</span>
                    </h1>
                    <p className="text-center text-slate-500 text-sm mt-2 font-medium tracking-wide border-b border-slate-100 pb-4">
                        SECURE ACCESS PORTAL
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                            Username
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                required
                                className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all rounded-none"
                                placeholder="Enter your username"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                            Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="password"
                                required
                                className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all rounded-none"
                                placeholder="••••••••"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-slate-500 cursor-pointer">
                            <input type="checkbox" className="mr-2 h-4 w-4 border-slate-300 rounded-none focus:ring-blue-500" />
                            Keep me logged in
                        </label>
                        <a href="#" className="text-blue-600 hover:underline font-medium">Forgot password?</a>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-widest text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-100 rounded-none"
                    >
                        LOGIN
                        <LogIn className="w-5 h-5" />
                    </motion.button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <p className="text-slate-500 text-sm">
                        Authorized personnel only. Logs are recorded on-chain.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
