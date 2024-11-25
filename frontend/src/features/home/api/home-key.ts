const homeKey = {
  default: ['home'],
  list: () => [...homeKey.default, 'list'],
  project: (title: string) => [...homeKey.default, 'project', title],
  history: (title: string, page: number, pageSize: number) => [...homeKey.default, 'history', title, page, pageSize],
};

export default homeKey;
