import request from 'supertest';
import app from '@root/app';
import { config } from '../src/config';

describe('template', () => {
  describe('/api-docs', () => {
    it('should show the api docs', async () => {
      config.env = 'development';
      const appInstance = await app();

      const res = await request(appInstance).get('/api-docs');
      expect(res.status).toBeLessThanOrEqual(304);
    });
  });
});
