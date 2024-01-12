import storage from 'vstores';

export default storage.create<{
  token: string;
  [key: string]: any;
}>({
  formatKey: (key) => `${APP_STORAGE_PREFIX}-${key}`,
});
