import express from 'express';
import { google, ulogin, usignup,logout,spsignup,splogin } from '../controllers/auth.controller.js';


const router = express.Router();

router.post("/usignup",usignup);
router.post("/spsignup",spsignup);
router.post("/ulogin",ulogin);
router.post("/splogin",splogin);
router.post("/google",google);
router.get('/logout',logout);

export default router;