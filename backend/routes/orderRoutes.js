const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  cancelOrder,
  updateOrderStatus // ✅ added below
} = require('../controllers/orderController');

const { protect, isAdmin } = require('../middlewares/authMiddleware'); // ✅ FIXED path

// ✅ Create a new order
router.post('/', protect, createOrder);

// ✅ Get all orders (admin only)
router.get('/', protect, isAdmin, getAllOrders);

// ✅ Get logged-in user's orders
router.get('/myorders', protect, getUserOrders);

// ✅ Update order status (admin)
router.put('/:id', protect, isAdmin, updateOrderStatus); // ⬅️ make sure this exists in controller!

// ✅ Cancel order (user)
router.delete('/:id/cancel', protect, cancelOrder);

module.exports = router;
