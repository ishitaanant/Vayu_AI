import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getSystemHealth, listDevices } from '../services/api';

const LandingPage = () => {
    const navigate = useNavigate();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const features = [
        {
            title: "Real-time Monitoring",
            description: "Live sensor data tracking for PM2.5, CO2, and VOCs.",
            color: "bg-blue-200 border-blue-400"
        },
        {
            title: "AI Analysis",
            description: "Predictive smoke detection and air quality classification.",
            color: "bg-teal-200 border-teal-400"
        },
        {
            title: "Blockchain Security",
            description: "Immutable logging of limit breaches and system faults.",
            color: "bg-indigo-200 border-indigo-400"
        },
        {
            title: "Auto-Control",
            description: "Smart fan regulation based on hazard levels.",
            color: "bg-purple-200 border-purple-400"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 relative overflow-hidden">
            <div className="container mx-auto px-6 py-12 relative z-10">
                <header className="flex justify-between items-center mb-16">
                    <div className="text-3xl font-bold text-slate-700 tracking-tight">
                        VAYU AI
                    </div>
                </header>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="text-center max-w-4xl mx-auto mt-20"
                >
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-slate-800">
                        Advanced Air Safety <br />
                        <span className="text-blue-500">Powered by Gen-AI</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
                        A comprehensive solution combining IoT sensors, AI agents, and Blockchain verification for next-generation environment safety.
                    </motion.p>

                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/dashboard')}
                        className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg flex items-center gap-2 mx-auto shadow-lg shadow-blue-200 transition-all rounded-none"
                    >
                        Launch Dashboard
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-32"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`p-8 border ${feature.color} hover:shadow-xl transition-shadow duration-300 rounded-none min-h-[180px] flex flex-col justify-center`}
                        >
                            <h3 className="text-lg font-bold mb-3 text-slate-800">{feature.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default LandingPage;
