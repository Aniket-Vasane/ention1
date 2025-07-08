const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateInvoice = (order, user) => {
  const doc = new PDFDocument();
  const invoiceDir = path.join(__dirname, '../invoices');
  if (!fs.existsSync(invoiceDir)) fs.mkdirSync(invoiceDir);

  const invoicePath = path.join(invoiceDir, `invoice-${order._id}.pdf`);
  doc.pipe(fs.createWriteStream(invoicePath));

  doc.fontSize(20).text('🧾 ENTION INVOICE', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Invoice #: ${order._id}`);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
  doc.text(`Customer: ${user.name}`);
  doc.text(`Email: ${user.email}`);
  doc.moveDown();

  doc.text('Order Summary:');
  order.products.forEach((item, idx) => {
    doc.text(
      `${idx + 1}. ${item.name} - ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}`
    );
  });

  doc.moveDown();
  doc.text(`Total: ₹${order.totalAmount}`);
  doc.end();

  return invoicePath;
};

module.exports = generateInvoice;

/*✅ Bonus (Optional Enhancements):
Add your company GST, contact info at the bottom.

Include a footer like:

This is a computer-generated invoice. No signature required.

*/