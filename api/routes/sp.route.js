import express from 'express';
import {test2, updateSp,deleteSp} from '../controllers/sp.controller.js';
import { verifyToken } from '../utils/verifySp.js';

const router = express.Router();

router.get('/',test2);
router.post("/update/:id", verifyToken, updateSp);
router.delete("/delete/:id", verifyToken, deleteSp);

export default router;