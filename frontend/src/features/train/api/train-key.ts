const trainKey = {
  default: ['train'],
  graph: (projectName: string, resultName: string) => [...trainKey.default, 'graph', projectName, resultName],
  list: (projectName: string, resultName: string, index: number, size: number) => [
    ...trainKey.default,
    'list',
    projectName,
    resultName,
    index,
    size,
  ],
  search: (projectName: string, resultName: string, keyword: string, index: number, size: number) => [
    ...trainKey.default,
    'search',
    projectName,
    resultName,
    keyword,
    index,
    size,
  ],
  checkpoint: (projectName: string, resultName: string) => [...trainKey.default, 'checkpoint', projectName, resultName],
  model: (projectName: string, resultName: string) => [...trainKey.default, 'model', projectName, resultName],
  featureMap: (projectName: string, resultName: string, epochName: string, deviceIndex: number) => [
    ...trainKey.default,
    'featureMap',
    projectName,
    resultName,
    epochName,
    deviceIndex,
  ],
  heatMap: (projectName: string, resultName: string, epochName: string) => [
    ...trainKey.default,
    'heatMap',
    projectName,
    resultName,
    epochName,
  ],
  select: (projectName: string, resultName: string, epochName: string, blockIds: string) => [
    ...trainKey.default,
    'select',
    projectName,
    resultName,
    epochName,
    blockIds,
  ],
};

export default trainKey;
