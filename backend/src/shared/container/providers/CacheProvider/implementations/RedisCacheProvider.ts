import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Redis, { Redis as RedisClient } from 'ioredis';
import cache from '@config/cache';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cache.config.redis);
  }

  public async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (data) {
      return JSON.parse(data) as T;
    }
    return null;
  }

  public async invalidate(key: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }
}
