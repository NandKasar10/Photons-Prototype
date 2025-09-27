export const checkWifi = () => {
  const ip = window.location.hostname;
  return ip.startsWith('192.168') || ip.startsWith('10.') || ip === 'localhost';
};
