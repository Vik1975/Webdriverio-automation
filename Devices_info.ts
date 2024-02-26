const { execSync } = require('child_process');
function getDeviceInfo() {
  const serialNumber = execSync('adb shell getprop ro.serialno').toString().trim();
  const deviceModel = execSync('adb shell getprop ro.product.model').toString().trim().split(/\s+/)[1] || '';
  const androidVersion = execSync('adb shell getprop ro.build.version.release').toString().trim();
  const deviceImei = execSync('adb shell "service call iphonesubinfo 1 | cut -c 52-66 | tr -d \'.[:space:]\'"').toString().trim();
  const fingerprintOutput = execSync('adb shell getprop | grep ro.build.fingerprint').toString().trim();
  const fingerprintValue = fingerprintOutput.match(/(?:\/[^\/]+){3}\/([^:]+):/);
  const deviceBuild = fingerprintValue[1]
  const deviceInfo = {
    serialNumber,
    deviceModel,
    androidVersion,
    deviceImei,
    deviceBuild,
  };
  return deviceInfo;
}
const deviceInfo = getDeviceInfo();
console.log(`Serial Number : ${deviceInfo.serialNumber}`);
console.log(`Device Model : ${deviceInfo.deviceModel}`);
console.log(`Android Version : ${deviceInfo.androidVersion}`);
console.log(`Device Imei : ${deviceInfo.deviceImei}`);
console.log(`Device Build : ${deviceInfo.deviceBuild}`)