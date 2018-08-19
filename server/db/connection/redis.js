import ioredis from 'ioredis'

let redis = new ioredis();
global.RedisClient = redis;