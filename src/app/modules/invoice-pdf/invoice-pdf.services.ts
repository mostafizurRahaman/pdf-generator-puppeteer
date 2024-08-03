import NodeCache from "node-cache";
import crypto, { BinaryLike } from "crypto";
import InvoiceHtmlTemplate from "../../templates/invoice-template-html";

import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { generatePdfFromHTML } from "../../utils/generatePdfFromHTML";


const cache = new NodeCache({
  stdTTL: 3600,
});
// ! Generate Pdf for invoice **
const generateInvoicePdfServices = async (
  name: string,
  data: Record<string, unknown> | BinaryLike,
) => {
  //  ** Create an Unique data Hash **
  const dataHash = await crypto
    .createHash("md5")
    .update(JSON.stringify(data) as BinaryLike)
    .digest("hex");

  // ** Get HTML Template **
  const html = InvoiceHtmlTemplate(data as Record<string, unknown>);

  // ** Set Is Cache Available **
  let pdf;
  const cachedPdf = cache.get(dataHash || "");

  if (cachedPdf) {
    pdf = cachedPdf;
  } else {
    try {
      pdf = await generatePdfFromHTML(html);
      cache.set(dataHash || "", pdf);
    } catch (err) {
      console.log(err);
      throw new AppError(httpStatus.BAD_REQUEST, "PDF Generation Failed !!!");
    }
  }

  return pdf;
};

export const InvoicePdfServices = {
  generateInvoicePdfServices,
};
