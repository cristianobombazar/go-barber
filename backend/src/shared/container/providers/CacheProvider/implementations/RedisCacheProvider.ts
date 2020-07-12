import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Redis, { Redis as RedisClient } from 'ioredis';
import cache from '@config/cache';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cache.config.redis);
  }

  public async get(key: string): Promise<string | null> {
    const data = await this.client.get(key);
    return data;
  }

  invalidate(key: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }
}
