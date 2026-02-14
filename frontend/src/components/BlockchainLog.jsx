import React from 'react';
import { Scroll, ShieldCheck, AlertOctagon } from 'lucide-react';

const BlockchainLog = ({ logs }) => {
    return (
        <div className="bg-white p-6 shadow-lg border border-slate-300 rounded-none h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-600 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                    <Scroll className="w-4 h-4" />
                    Blockchain Ledger
                </h3>
                <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-none border border-green-200">
                    Synced
                </span>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {logs.map((log, index) => (
                    <div key={index} className="bg-slate-50 p-3 rounded-none border border-slate-200">
                        <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs font-bold uppercase px-1.5 py-0.5 rounded-none ${log.event_type === 'fault' ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-blue-100 text-blue-600 border border-blue-200'
                                }`}>
                                {log.event_type}
                            </span>
                            <span className="text-xs text-slate-500">
                                {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                        <div className="text-sm text-slate-700 truncate">
                            Target: {log.device_id}
                        </div>
                        <div className="text-xs text-slate-500 font-mono mt-1 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-green-600" />
                            {log.hash ? `${log.hash.substring(0, 16)}...` : 'Pending block...'}
                        </div>
                    </div>
                ))}
                {logs.length === 0 && (
                    <div className="text-center text-slate-500 py-8">
                        No transactions recorded in this session.
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlockchainLog;
