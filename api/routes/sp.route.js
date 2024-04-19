import express from 'express';
import {updateSp,deleteSp,searchProviders, getProviderById, addFeedback, getFeedbacksForSp} from '../controllers/sp.controller.js';
import { verifyToken } from '../utils/verifySp.js';
import Sp from '../models/sp.model.js';

const router = express.Router();


// router.get('/',  async (req, res) => {
//     res.send('Welcome');
// });
router.get('/getsps',  async (req, res) => {
    try {
       const serviceProviders = await Sp.find();
       console.log(serviceProviders);
       res.json(serviceProviders);
    } catch (err) {
       res.status(500).json({ message: err.message });
    }
   });
router.post("/update/:id", verifyToken, updateSp);
router.delete("/delete/:id", verifyToken, deleteSp);
router.get("/searchProviders", searchProviders);
router.get("/:providerId", getProviderById);
router.post("/:serviceProviderId/feedbacks", addFeedback);
router.get("/:serviceProviderId/feedbacks", getFeedbacksForSp);

export default router;