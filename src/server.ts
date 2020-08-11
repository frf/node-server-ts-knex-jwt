import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
import routesAuth from './routes/auth';
import authMiddleware from './middlewares/auth';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', routesAuth);
app.use('/api', authMiddleware, routes);

app.listen(3333);