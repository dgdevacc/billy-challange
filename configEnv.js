const fs = require('fs');

(() => { // Run when init
  const configFile = JSON.parse(fs.readFileSync('./env.json', 'utf8'));
  const envConfigs = configFile[process.env.NODE_ENV] || configFile.development;

  Object.keys(envConfigs).forEach((key) => {
    process.env[key] = envConfigs[key];
  });
})();
