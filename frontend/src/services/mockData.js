export const MOCK_SENSOR_DATA = {
    pm25: 45.2,
    co2: 850,
    co: 12.5,
    voc: 120,
    timestamp: new Date().toISOString(),
};

export const MOCK_LOGS = [
    {
        event_type: 'decision',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        device_id: 'ESP32_001',
        data: { fan_on: true, reasoning: 'PM2.5 exceeded threshold' },
        hash: '0x123...abc',
    },
    {
        event_type: 'fault',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        device_id: 'ESP32_001',
        data: { fault_type: 'sensor_stuck', details: 'CO2 sensor stuck at 850ppm' },
        hash: '0x456...def',
    },
];
