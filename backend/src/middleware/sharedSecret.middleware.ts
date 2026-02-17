import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SharedSecretMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const secret = req.headers['x-api-shared-secret'];
        if (secret !== process.env.API_SHARED_SECRET) {
            throw new UnauthorizedException('Invalid API secret');
        }
        next();
    }
}