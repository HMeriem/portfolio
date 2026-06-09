import { Logger } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { LoggerMiddleware } from './logger.middleware';

describe('LoggerMiddleware', () => {
  let middleware: LoggerMiddleware;
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    middleware = new LoggerMiddleware();
    logSpy = jest
      .spyOn(Logger.prototype, 'log')
      .mockImplementation(() => undefined);
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  function makeRes(statusCode = 200) {
    let finishCallback: () => void = () => undefined;
    const res = {
      statusCode,
      on: jest.fn((event: string, cb: () => void) => {
        if (event === 'finish') finishCallback = cb;
      }),
      trigger: () => finishCallback(),
    };
    return res as unknown as Response & { trigger: () => void };
  }

  it('calls next()', () => {
    const req = { method: 'GET', originalUrl: '/api/health' } as Request;
    const res = makeRes();
    const next = jest.fn() as NextFunction;
    middleware.use(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('registers a finish listener on the response', () => {
    const req = { method: 'GET', originalUrl: '/api/health' } as Request;
    const res = makeRes();
    middleware.use(req, res, jest.fn());
    expect(res.on).toHaveBeenCalledWith('finish', expect.any(Function));
  });

  it('logs method, url, status and duration on finish', () => {
    const req = { method: 'POST', originalUrl: '/api/contact' } as Request;
    const res = makeRes(201);
    middleware.use(req, res, jest.fn());
    res.trigger();
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringMatching(/POST \/api\/contact 201 \d+ms/),
    );
  });
});
