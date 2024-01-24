import express from 'express';
import { ulogin, usignup } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/usignup",usignup)
router.post("/ulogin",ulogin)

export default router;