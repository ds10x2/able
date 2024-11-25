const commonKey = {
  default: ['common'],
  devices: () => [...commonKey.default, 'device'],
};

export default commonKey;
