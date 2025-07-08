const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder
} = require('../controllers/orderController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// ✅ Create a new order
router.post('/', protect, createOrder); // POST /api/orders/

// ✅ Get all orders (admin only)
router.get('/', protect, isAdmin, getAllOrders); // GET /api/orders/

// ✅ Get logged-in user's orders
router.get('/myorders', protect, getUserOrders); // GET /api/orders/myorders

// ✅ Update order status (admin)
router.put('/:id', protect, isAdmin, updateOrderStatus); // PUT /api/orders/:id

// ✅ Cancel order (user)
router.delete('/:id/cancel', protect, cancelOrder); // DELETE /api/orders/:id/cancel

module.exports = router;
