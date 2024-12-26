import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error.name === 'PrismaClientKnownRequestError') {
    const prismaError = error as any;
    switch (prismaError.code) {
      case 'P2002':
        res.status(409).json({
          error: 'A record with this unique field already exists.'
        });
        return;
      case 'P2025':
        res.status(404).json({
          error: 'Record not found.'
        });
        return;
      default:
        res.status(400).json({
          error: 'Database operation failed.'
        });
        return;
    }
  }

  console.error(error);
  res.status(500).json({
    error: 'Internal server error.'
  });
  
  return;
};
