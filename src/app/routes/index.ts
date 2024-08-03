import { invoicePdfRoutes } from "../modules/invoice-pdf/invoice-pdf.route";
import express from "express";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/invoice-pdf",
    route: invoicePdfRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
