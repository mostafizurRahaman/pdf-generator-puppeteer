import catchAsync from "../../utils/catchAsync";
import { InvoicePdfServices } from "./invoice-pdf.services";

const generateInvoicePdf = catchAsync(async (req, res) => {
  const { name, data = "" } = req.body;
  console.log(data);

  // * Setup File Name here **
  const date = `${new Date().getDate()}_${new Date().getMonth()}_${new Date().getFullYear()}`;
  const fileName = name ? `${name}__${date}` : `invoice_${date}`;

  const pdf = await InvoicePdfServices.generateInvoicePdfServices(name, data);
  console.log(pdf);
  try {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${encodeURIComponent(fileName)}.pdf`,
    );
    return res.send(pdf);
  } catch (error) {
    console.error("PDF generation failed:", error);
    return res.status(500).send("PDF generation failed");
  }
});

export const InvoicePdfController = {
  generateInvoicePdf,
};
