const deployKey = {
  default: ['deploy'],
  info: () => [...deployKey.default, 'info'],
  regist: (projectName: string, trainResult: string, checkpoint: string, uri: string, description: string) => [
    ...deployKey.default,
    'regist',
    projectName,
    trainResult,
    checkpoint,
    uri,
    description,
  ],
  list: (page: number, pageSize: number) => [...deployKey.default, 'list', page, pageSize],
  stop: (uri: string) => [...deployKey.default, 'stop', uri],
};

export default deployKey;
