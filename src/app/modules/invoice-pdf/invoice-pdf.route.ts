import express from "express";
import { InvoicePdfController } from "./invoice-pdf.controler";

const router = express.Router();

router.post("/", InvoicePdfController.generateInvoicePdf);

export const invoicePdfRoutes = router;
