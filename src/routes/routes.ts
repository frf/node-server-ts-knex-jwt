import express from 'express';
import SkillsController from '../controllers/SkillsController';
import ConnectionsController from '../controllers/ConnectionsController';
import authMiddleware from '../middlewares/auth';

const routes = express.Router();

const skillsController = new SkillsController();
const conenctionsController = new ConnectionsController();

routes.get('/skills', skillsController.index);
routes.post('/skills', skillsController.create);

routes.get('/connections', conenctionsController.index);
routes.post('/connections', conenctionsController.create);

routes.get('/testes', authMiddleware, (req, res) => {
    return res.send('OK');
});

export default routes;
