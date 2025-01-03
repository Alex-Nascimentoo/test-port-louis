import express from 'express';
import { router } from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

export { app };
