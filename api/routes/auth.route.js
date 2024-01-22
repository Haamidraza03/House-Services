import express from 'express';
import { usignup } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/usignup",usignup)

export default router;