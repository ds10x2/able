const canvasKey = {
  default: ['canvas'],
  canvas: (projectName: string) => [...canvasKey.default, 'canvas', projectName],
  blocks: (type: string) => [...canvasKey.default, 'blocks', type],
  search: (keyword: string) => [...canvasKey.default, 'search', keyword],
};

export default canvasKey;
