import React, { useState, useEffect } from 'react';
import { getSensorHistory, getControlStatus, getBlockchainLogs, listDevices } from '../services/api';
import SensorCard from '../components/SensorCard';
import FanControl from '../components/FanControl';
import PredictionPanel from '../components/PredictionPanel';
import BlockchainLog from '../components/BlockchainLog';
import { LayoutDashboard, RefreshCcw, Loader2 } from 'lucide-react';

const Dashboard = () => {
    const [sensorData, setSensorData] = useState(null);
    const [fanStatus, setFanStatus] = useState(null);
    const [logs, setLogs] = useState([]);
    const [prediction, setPrediction] = useState(null);
    const [classification, setClassification] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deviceId, setDeviceId] = useState(null);
    const [availableDevices, setAvailableDevices] = useState([]);

    // Initial device discovery
    useEffect(() => {
        const discoverDevices = async () => {
            try {
                const response = await listDevices();
                const devices = response.devices || [];
                setAvailableDevices(devices);
                if (devices.length > 0) {
                    setDeviceId(devices[0]);
                }
            } catch (error) {
                console.error("Failed to list devices:", error);
            } finally {
                setLoading(false);
            }
        };
        discoverDevices();
    }, []);

    const fetchData = async () => {
        if (!deviceId) return;

        try {
            // Parallel data fetching
            const [history, control, chainLogs] = await Promise.allSettled([
                getSensorHistory(deviceId, 1),
                getControlStatus(deviceId),
                getBlockchainLogs(10)
            ]);

            // Handle Sensor Data
            if (history.status === 'fulfilled' && history.value?.readings?.length > 0) {
                const latest = history.value.readings[history.value.readings.length - 1];
                setSensorData(latest);

                // Simple heuristic for prediction
                if (latest.pm25 > 100) {
                    setPrediction({ will_peak: true, confidence: 0.9, reasoning: 'PM2.5 rising rapidly' });
                    setClassification({ air_type: 'smoke', reasoning: 'High particulate matter' });
                } else {
                    setPrediction({ will_peak: false, confidence: 0.85, reasoning: 'Air quality stable' });
                    setClassification({ air_type: 'clean', reasoning: 'All sensors within normal range' });
                }
            } else {
                // Keep previous state or set to null if no data
            }

            // Handle Control Status
            if (control.status === 'fulfilled') {
                setFanStatus(control.value);
            }

            // Handle Logs
            if (chainLogs.status === 'fulfilled') {
                setLogs(chainLogs.value.logs || []);
            }

        } catch (error) {
            console.error("Dashboard sync error:", error);
        }
    };

    useEffect(() => {
        if (deviceId) {
            fetchData();
            const interval = setInterval(fetchData, 3000);
            return () => clearInterval(interval);
        }
    }, [deviceId]);

    if (loading && !deviceId) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-slate-600">Discovering devices...</p>
                </div>
            </div>
        );
    }

    if (!deviceId && !loading) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="text-center max-w-md p-6 bg-white border border-slate-300 rounded-none shadow-lg">
                    <LayoutDashboard className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-900 mb-2">No Devices Found</h2>
                    <p className="text-slate-600">
                        Ensure your ESP32 devices are connected and sending data to the backend.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-4 py-2 bg-blue-600 text-white font-bold rounded-none hover:bg-blue-700 transition"
                    >
                        Retry Discovery
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Vayu AI Dashboard
                    </h1>
                    <p className="text-slate-600 mt-1">Real-time Air Safety Monitoring</p>
                </div>
                <div className="flex items-center gap-4">
                    {availableDevices.length > 1 && (
                        <select
                            value={deviceId}
                            onChange={(e) => setDeviceId(e.target.value)}
                            className="bg-white text-slate-900 px-3 py-2 rounded-none border border-slate-300 focus:outline-none focus:border-blue-600"
                        >
                            {availableDevices.map(id => (
                                <option key={id} value={id}>{id}</option>
                            ))}
                        </select>
                    )}
                    <div className="bg-white px-4 py-2 rounded-none border border-slate-300">
                        <span className="text-xs text-slate-500 uppercase font-bold">Device ID</span>
                        <p className="font-mono text-blue-600">{deviceId}</p>
                    </div>
                    <button
                        onClick={fetchData}
                        className="p-2 bg-white rounded-none hover:bg-slate-50 border border-slate-300 transition"
                    >
                        <RefreshCcw className="w-5 h-5 text-slate-700" />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <SensorCard
                    title="PM 2.5"
                    value={sensorData?.pm25?.toFixed(1) || '--'}
                    unit="µg/m³"
                    type="pm25"
                    status={sensorData?.pm25 > 50 ? 'warning' : 'normal'}
                />
                <SensorCard
                    title="CO2 Level"
                    value={sensorData?.co2?.toFixed(0) || '--'}
                    unit="ppm"
                    type="co2"
                    status={sensorData?.co2 > 1000 ? 'warning' : 'normal'}
                />
                <SensorCard
                    title="CO Level"
                    value={sensorData?.co?.toFixed(1) || '--'}
                    unit="ppm"
                    type="co"
                    status={sensorData?.co > 10 ? 'critical' : 'normal'}
                />
                <SensorCard
                    title="VOC Index"
                    value={sensorData?.voc?.toFixed(0) || '--'}
                    unit="ppb"
                    type="voc"
                    status={sensorData?.voc > 200 ? 'warning' : 'normal'}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <PredictionPanel
                        prediction={prediction}
                        classification={classification}
                    />
                </div>
                <div className="space-y-6">
                    <FanControl
                        deviceId={deviceId}
                        status={fanStatus}
                        onUpdate={fetchData}
                    />
                    <BlockchainLog logs={logs} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
