import React, { useState } from 'react';
import { Fan, Power, AlertTriangle } from 'lucide-react';
import { setManualOverride, clearManualOverride } from '../services/api';

const FanControl = ({ deviceId, status, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    // Status might be null initially
    const isFanOn = status?.fan_on;
    const intensity = status?.fan_intensity || 0;
    const isOverride = status?.is_manual_override;

    const handleToggle = async () => {
        setLoading(true);
        try {
            if (isOverride) {
                await clearManualOverride(deviceId);
            } else {
                await setManualOverride(deviceId, !isFanOn, 100);
            }
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Failed to toggle fan:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 shadow-lg border border-slate-300 rounded-none">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-600 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                    <Fan className="w-4 h-4" />
                    Fan Control
                </h3>
                {isOverride && (
                    <span className="flex items-center gap-1 text-amber-600 text-xs font-bold px-2 py-1 bg-amber-50 rounded-none border border-amber-200">
                        <AlertTriangle className="w-3 h-3" />
                        Override Active
                    </span>
                )}
            </div>

            <div className="flex flex-col items-center">
                <button
                    onClick={handleToggle}
                    disabled={loading}
                    className={`
            w-24 h-24 rounded-none flex items-center justify-center transition-all duration-300
            ${isFanOn
                            ? 'bg-blue-600 shadow-lg shadow-blue-200 text-white'
                            : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}
          `}
                >
                    <Power className={`w-8 h-8 ${loading ? 'animate-pulse' : ''}`} />
                </button>

                <div className="mt-4 text-center">
                    <p className="text-xl font-bold text-slate-900">{isFanOn ? 'ACTIVE' : 'IDLE'}</p>
                    <p className="text-sm text-slate-600">{intensity}% Intensity</p>
                </div>
            </div>
        </div>
    );
};

export default FanControl;
