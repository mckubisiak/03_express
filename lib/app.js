import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import goalsController from './controllers/goals.js';

const app = express();

app.use(express.json());

app.use('/api/v1/goals', goalsController);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
