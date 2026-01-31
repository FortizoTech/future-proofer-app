const https = require('https');

const supabaseUrl = 'dmbgekmtygenbzcentct.supabase.co';

console.log(`Checking connectivity to Supabase (${supabaseUrl})...`);

const req = https.request({
    hostname: supabaseUrl,
    port: 443,
    path: '/auth/v1/health',
    method: 'GET',
    timeout: 5000
}, (res) => {
    console.log(`Status: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (e) => {
    console.error('Connection failed:', e.message);
    if (e.code === 'ETIMEDOUT') {
        console.error('Timed out (5s)');
    }
});

req.on('timeout', () => {
    console.error('Request timed out!');
    req.destroy();
});

req.end();
