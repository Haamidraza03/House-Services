import express from 'express';
import { google, ulogin, usignup,logout } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/usignup",usignup);
router.post("/ulogin",ulogin);
router.post("/google",google);
router.get('/logout',logout);

export default router;