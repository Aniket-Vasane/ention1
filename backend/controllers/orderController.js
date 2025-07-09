const Order = require('../models/Order');
const sendEmail = require('../utils/mailer');
const generateInvoice = require('../utils/invoiceGenerator');
const path = require('path');

// ✅ Create a new order and send confirmation email with invoice
exports.createOrder = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ error: 'Product list cannot be empty.' });
    }

    const newOrder = await Order.create({
      user: req.user.id,
      products,
      totalAmount,
      status: 'Pending',
    });

    const userEmail = req?.user?.email;
    const userName = req?.user?.name;

    if (!userEmail || !userName) {
      return res.status(400).json({ error: "User info missing for sending email." });
    }

    const productListHtml = products
      .map(p => `<li>${p.name || 'Unnamed Product'} - ₹${p.price || 0} x ${p.quantity || 1}</li>`)
      .join('');

    const orderTimestamp = new Date(newOrder.createdAt).toLocaleString();

    const invoicePath = await generateInvoice(newOrder, req.user);

    await sendEmail({
      to: userEmail,
      subject: '🧾 ENTION Invoice & Order Confirmation',
      html: `
        <h2>Hi ${userName},</h2>
        <p>Thanks for your order <strong>#${newOrder._id}</strong>.</p>
        <p><strong>Ordered On:</strong> ${orderTimestamp}</p>
        <p><strong>Order Summary:</strong></p>
        <ul>${productListHtml}</ul>
        <p><strong>Total:</strong> ₹${totalAmount}</p>
        <br/>
        <p>Your invoice is attached as a PDF.</p>
        <p>We’ll notify you when your order ships.</p>
        <p>— Team ENTION</p>
      `,
      attachments: [
        {
          filename: `Invoice-${newOrder._id}.pdf`,
          path: path.resolve(invoicePath),
        },
      ],
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Order creation error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// ❌ Cancel order and send refund email with invoice
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.product');
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (order.status !== 'Pending') {
      return res.status(400).json({ error: 'Only pending orders can be cancelled' });
    }

    order.status = 'Cancelled';
    await order.save();

    const userEmail = req?.user?.email;
    const userName = req?.user?.name;

    if (!userEmail || !userName) {
      return res.status(400).json({ error: "User info missing for sending email." });
    }

    const productListHtml = order.products
      .map(p => {
        const product = p.product || {};
        const name = p.name || product.name || 'Unnamed Product';
        const price = p.price || product.price || 0;
        const qty = p.quantity || 1;
        return `<li>${name} - ₹${price} x ${qty}</li>`;
      })
      .join('');

    const invoicePath = await generateInvoice(order, req.user);

    await sendEmail({
      to: userEmail,
      subject: '🛑 ENTION Order Cancelled & Refund Info',
      html: `
        <h2>Hello ${userName},</h2>
        <p>Your order <strong>#${order._id}</strong> has been <span style="color:red;"><strong>cancelled</strong></span>.</p>
        <p><strong>Cancelled Items:</strong></p>
        <ul>${productListHtml}</ul>
        <p><strong>Refund Amount:</strong> ₹${order.totalAmount}</p>
        <br/>
        <p>Refund will be processed to your original payment method in 5–7 business days.</p>
        <p>Attached is the invoice for your reference.</p>
        <p>— Team ENTION</p>
      `,
      attachments: [
        {
          filename: `Invoice-${order._id}.pdf`,
          path: path.resolve(invoicePath),
        },
      ],
    });

    res.json({ message: 'Order cancelled and email sent.', order });
  } catch (err) {
    console.error('Cancel order error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.json(orders);
  } catch (err) {
    console.error('Get all orders error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get current user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
  } catch (err) {
    console.error('Get user orders error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'Status is required' });

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (err) {
    console.error('Update order status error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

