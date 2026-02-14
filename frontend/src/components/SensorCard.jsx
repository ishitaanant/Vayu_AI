import React from 'react';
import { Wind, Activity, Zap, Droplets } from 'lucide-react';

const SensorCard = ({ title, value, unit, type, status }) => {
    const getIcon = () => {
        switch (type) {
            case 'pm25': return <Wind className="w-6 h-6" />;
            case 'co2': return <Activity className="w-6 h-6" />;
            case 'co': return <Zap className="w-6 h-6" />;
            case 'voc': return <Droplets className="w-6 h-6" />;
            default: return <Activity className="w-6 h-6" />;
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'normal': return 'text-green-600';
            case 'warning': return 'text-amber-600';
            case 'critical': return 'text-red-600';
            default: return 'text-blue-600';
        }
    };

    return (
        <div className="bg-white p-6 shadow-lg border border-slate-300 rounded-none flex items-center justify-between">
            <div>
                <h3 className="text-slate-600 text-sm font-medium uppercase tracking-wider">{title}</h3>
                <div className="mt-2 flex items-baseline">
                    <span className={`text-3xl font-bold ${getStatusColor()}`}>{value}</span>
                    <span className="ml-2 text-slate-500">{unit}</span>
                </div>
            </div>
            <div className={`p-3 rounded-none bg-slate-100 ${getStatusColor()}`}>
                {getIcon()}
            </div>
        </div>
    );
};

export default SensorCard;
