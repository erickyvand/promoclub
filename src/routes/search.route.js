import express from 'express';
import SearchController from '../controllers/search.controller';
import { allowAssessRoute } from '../middlewares/user.middleware';

const router = express.Router();

router.get('/', allowAssessRoute, SearchController.searchContent);

export default router;
