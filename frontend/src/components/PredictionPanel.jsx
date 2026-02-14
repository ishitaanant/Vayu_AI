import React from 'react';
import { Brain, AlertCircle, CheckCircle } from 'lucide-react';

const PredictionPanel = ({ prediction, classification }) => {
    const riskLevel = prediction?.will_peak ? 'HIGH' : (prediction?.confidence > 0.7 ? 'MEDIUM' : 'LOW');

    const getRiskColor = (level) => {
        switch (level) {
            case 'HIGH': return 'text-red-600 border-red-400 bg-red-50';
            case 'MEDIUM': return 'text-amber-600 border-amber-400 bg-amber-50';
            case 'LOW': return 'text-green-600 border-green-400 bg-green-50';
            default: return 'text-slate-400 border-slate-300 bg-slate-50';
        }
    };

    return (
        <div className="bg-white p-6 shadow-lg border border-slate-300 rounded-none">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-600 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    AI Analysis
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className={`border rounded-none p-4 ${getRiskColor(riskLevel)}`}>
                    <p className="text-xs uppercase font-bold opacity-70">Smoke Risk</p>
                    <p className="text-2xl font-bold mt-1">{riskLevel}</p>
                </div>

                <div className="border border-slate-300 rounded-none p-4 bg-slate-50">
                    <p className="text-xs uppercase font-bold text-slate-600">Air Type</p>
                    <p className="text-lg font-bold mt-1 capitalize text-blue-600">
                        {classification?.air_type || 'Scanning...'}
                    </p>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <div className="bg-slate-50 rounded-none p-3 text-sm border border-slate-200">
                    <span className="text-blue-600 font-bold">Prediction: </span>
                    <span className="text-slate-700">{prediction?.reasoning || 'Analyzing sensor patterns...'}</span>
                </div>
                <div className="bg-slate-50 rounded-none p-3 text-sm border border-slate-200">
                    <span className="text-teal-600 font-bold">Classifier: </span>
                    <span className="text-slate-700">{classification?.reasoning || 'Identifying data signature...'}</span>
                </div>
            </div>
        </div>
    );
};

export default PredictionPanel;
