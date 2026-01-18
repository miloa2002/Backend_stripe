import express from "express";
import { createPayment, succesPayment, cancelPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-checkout-session", createPayment);
router.get("/success", succesPayment);
router.get("/cancel", cancelPayment);

export default router;