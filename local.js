const localtunnel = require('localtunnel');
const {exec} = require('child_process');

(async () => {
  const tunnel = await localtunnel({ port: 3000 });

  
  const t = tunnel.url.toString()
  exec(`echo tunnel ="'${t}'" > tun.py`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`Tunnel: ${t}`);
})

  tunnel.on('close', () => {
    console.log("closed tunnel")
  });
})();