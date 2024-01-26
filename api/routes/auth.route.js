import express from 'express';
import { google, ulogin, usignup } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/usignup",usignup)
router.post("/ulogin",ulogin)
router.post("/google",google)

export default router;