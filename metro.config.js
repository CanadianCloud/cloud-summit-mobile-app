const { getDefaultConfig } = require("expo/metro-config");

// این خط مسیر ریشه پروژه را به درستی برای مترو مشخص می‌کند
const config = getDefaultConfig(__dirname);

module.exports = config;
