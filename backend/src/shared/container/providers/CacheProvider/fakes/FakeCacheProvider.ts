import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async get<T>(key: string): Promise<T | null> {
    const data = this.cache[key];
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(value =>
      value.startsWith(`${prefix}:`)
    );
    keys.forEach(key => {
      this.invalidate(key);
    });
  }

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }
}
