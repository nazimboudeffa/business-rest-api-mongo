import express from 'express';
import middlewares from '../middlewares/index.js';
import { createIdea, getIdeas } from '../controllers/ideas.js';

const router = express.Router();

router.get('/list', middlewares.authenticate, getIdeas)
router.post('/create-idea', middlewares.authenticate, createIdea)

export {router as ideasRoutes}