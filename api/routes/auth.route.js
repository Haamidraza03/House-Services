import express from 'express';
import { usignin, usignup } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/usignup",usignup)
router.post("/usignin",usignin)

export default router;