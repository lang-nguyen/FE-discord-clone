import axios from 'axios';

async function testPut() {
    try {
        const response = await axios.put('http://localhost:5218/api/v1/server/5fefa96e-d2e1-4aa9-a1f6-bdc1e5c3aa10', {
            serverName: 'Updated Discord Clone Server',
            serverDescription: 'Welcome to the deeply updated seeded server!',
            serverIconId: null
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log("Success:", response.data);
    } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);
    }
}
testPut();
