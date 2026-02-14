import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
const BASE_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api/v1', '') : 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getSystemHealth = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/health`);
        return response.data;
    } catch (error) {
        console.error('Error fetching system health:', error);
        throw error;
    }
};

export const getSensorStatus = async (deviceId) => {
    try {
        const response = await api.get(`/sensor/status/${deviceId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching sensor status for ${deviceId}:`, error);
        throw error;
    }
};

export const getSensorHistory = async (deviceId, limit = 50) => {
    try {
        const response = await api.get(`/sensor/history/${deviceId}?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching sensor history for ${deviceId}:`, error);
        throw error;
    }
};

export const getControlStatus = async (deviceId) => {
    try {
        const response = await api.get(`/control/status/${deviceId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching control status for ${deviceId}:`, error);
        throw error;
    }
};

export const setManualOverride = async (deviceId, fanOn, fanIntensity) => {
    try {
        const response = await api.post('/control/override', {
            device_id: deviceId,
            fan_on: fanOn,
            fan_intensity: fanIntensity,
        });
        return response.data;
    } catch (error) {
        console.error(`Error setting manual override for ${deviceId}:`, error);
        throw error;
    }
};

export const clearManualOverride = async (deviceId) => {
    try {
        const response = await api.delete(`/control/override/${deviceId}`);
        return response.data;
    } catch (error) {
        console.error(`Error clearing manual override for ${deviceId}:`, error);
        throw error;
    }
};

export const getBlockchainLogs = async (limit = 20) => {
    try {
        const response = await api.get(`/dashboard/blockchain/logs?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching blockchain logs:', error);
        throw error;
    }
};

export const listDevices = async () => {
    try {
        const response = await api.get('/dashboard/devices');
        return response.data;
    } catch (error) {
        console.error('Error listing devices:', error);
        throw error;
    }
}

export default api;
