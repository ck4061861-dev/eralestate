import { Router } from 'express';
import { getAgents, createAgent, updateAgent, deleteAgent } from '../Controller/agent.controller.js';

const router = Router();

router.get('/', getAgents);
router.post('/', createAgent);
router.put('/:id', updateAgent);
router.delete('/:id', deleteAgent);

export default router;
