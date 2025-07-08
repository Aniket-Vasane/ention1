import React, { useState, useEffect } from "react";
import { Navbar, Footer } from "components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "react-use";
import { toast } from "react-toastify";
import { fetchProducts } from "utils/dbFunctions";
import makePayment from "utils/razorpay";
import { Loader } from "components/Utils";

const steps = [
  { id: 1, name: "Shipping" },
  { id: 2, name: "Payment" },
  { id: 3, name: "Review" },
];

const CheckoutPage = () => {
  const { data: sessionData, status: authStatus } = useSession();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [cart, setCart] = useLocalStorage("cart", []);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState({ status: "pending" });
  
  // Shipping Information
  const [shippingInfo, setShippingInfo] = useState({
    fullName: sessionData?.user?.name || "",
    email: sessionData?.user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Payment Information
  const [paymentMethod, setPaymentMethod] = useState("prepaid");

  useEffect(() => {
    let temp =
      products?.length > 0
        ? products?.reduce(
            (a, b) =>
              a +
              b.pricing.sellingPrice *
                cart.find((p) => p.slug == b?.slug)?.quantity,
            0
          )
        : 0;
    setTotal(temp);
  }, [products, cart]);

  useEffect(() => {
    if (loading && cart.length > 0) {
      fetchProducts(cart?.map((p) => p.slug) || []).then((res) => {
        if (res.success) {
          setProducts(() => res.products);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [loading, cart.length]);

  // Auth check
  if (authStatus === "loading") {
    return (
      <main className="h-screen w-screen center">
        <Loader />
      </main>
    );
  }

  if (authStatus === "unauthenticated") {
    router.push("/login?redirect=/checkout");
    return (
      <main className="h-screen w-screen center">
        <h1 className="text-5xl text-white">Unauthenticated</h1>
      </main>
    );
  }

  // Empty cart check
  if (!loading && (!cart.length || !products.length)) {
    router.push("/cart");
    return (
      <main className="h-screen w-screen center">
        <h1 className="text-5xl text-white">Your cart is empty</h1>
      </main>
    );
  }

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    // Validate shipping info
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.phone || !shippingInfo.address) {
      toast.error("Please fill all required fields");
      return;
    }
    setActiveStep(2);
  };

  const handlePaymentSubmit = () => {
    setActiveStep(3);
  };

  const handleCheckout = async () => {
    toast.dismiss();
    const toastId = toast.loading("Processing your order...", {
      theme: "colored",
      type: "info",
    });

    try {
      const options = {
        user: {
          name: shippingInfo.fullName,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
        },
        address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}`,
        coupon: coupon?.status === "applied" ? coupon : null,
        products: products.map((product) => ({
          slug: product.slug,
          quantity: cart.find((p) => p.slug === product?.slug).quantity,
        })),
      };

      const payment = await makePayment(paymentMethod, options, toastId);

      if (payment.success) {
        toast.update(toastId, {
          render: "Order placed successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        // Clear cart
        setCart([]);
        router.push("/orders");
      } else {
        throw new Error(payment.msg || "Payment failed");
      }
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Failed to place order",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <form onSubmit={handleShippingSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  value={shippingInfo.fullName}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                  }
                  className="w-full p-2 rounded bg-transparent border border-[#007E9E] focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  value={shippingInfo.email}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, email: e.target.value })
                  }
                  className="w-full p-2 rounded bg-transparent border border-[#007E9E] focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone *</label>
                <input
                  type="tel"
                  value={shippingInfo.phone}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, phone: e.target.value })
                  }
                  className="w-full p-2 rounded bg-transparent border border-[#007E9E] focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address *</label>
                <input
                  type="text"
                  value={shippingInfo.address}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, address: e.target.value })
                  }
                  className="w-full p-2 rounded bg-transparent border border-[#007E9E] focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <input
                  type="text"
                  value={shippingInfo.city}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, city: e.target.value })
                  }
                  className="w-full p-2 rounded bg-transparent border border-[#007E9E] focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State *</label>
                <input
                  type="text"
                  value={shippingInfo.state}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, state: e.target.value })
                  }
                  className="w-full p-2 rounded bg-transparent border border-[#007E9E] focus:border-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pincode *</label>
                <input
                  type="text"
                  value={shippingInfo.pincode}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, pincode: e.target.value })
                  }
                  className="w-full p-2 rounded bg-transparent border border-[#007E9E] focus:border-blue-500 outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-[#007E9E] text-white rounded hover:bg-[#006E8E] transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Select Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="prepaid"
                    checked={paymentMethod === "prepaid"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio text-[#007E9E]"
                  />
                  <span>Online Payment (Credit/Debit Card, UPI, Net Banking)</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio text-[#007E9E]"
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setActiveStep(1)}
                className="px-6 py-2 border border-[#007E9E] text-white rounded hover:bg-[#007E9E]/10 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handlePaymentSubmit}
                className="px-6 py-2 bg-[#007E9E] text-white rounded hover:bg-[#006E8E] transition-colors"
              >
                Continue to Review
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Order Summary</h3>
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.slug}
                    className="flex justify-between items-center border-b border-[#007E9E] pb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-300">
                          Quantity: {cart.find((p) => p.slug === product.slug)?.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      ₹{product.pricing.sellingPrice * cart.find((p) => p.slug === product.slug)?.quantity}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#007E9E] pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                {coupon.status === "applied" && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount</span>
                    <span>-₹{coupon.discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium text-lg mt-2">
                  <span>Total</span>
                  <span>₹{total - (coupon.status === "applied" ? coupon.discount : 0)}</span>
                </div>
              </div>
            </div>
            <div className="border border-[#007E9E] rounded-md p-4">
              <h4 className="font-medium mb-2">Shipping Address</h4>
              <p>{shippingInfo.fullName}</p>
              <p>{shippingInfo.address}</p>
              <p>{shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}</p>
              <p>Phone: {shippingInfo.phone}</p>
            </div>
            <div className="border border-[#007E9E] rounded-md p-4">
              <h4 className="font-medium mb-2">Payment Method</h4>
              <p>{paymentMethod === "prepaid" ? "Online Payment" : "Cash on Delivery"}</p>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setActiveStep(2)}
                className="px-6 py-2 border border-[#007E9E] text-white rounded hover:bg-[#007E9E]/10 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleCheckout}
                className="px-6 py-2 bg-[#007E9E] text-white rounded hover:bg-[#006E8E] transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 text-white">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center items-center space-x-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  step.id < steps.length ? "w-full" : ""
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    step.id <= activeStep
                      ? "border-[#007E9E] text-white"
                      : "border-gray-600 text-gray-600"
                  }`}
                >
                  {step.id}
                </div>
                <div
                  className={`flex-1 h-1 mx-4 ${
                    step.id < steps.length
                      ? step.id < activeStep
                        ? "bg-[#007E9E]"
                        : "bg-gray-600"
                      : "hidden"
                  }`}
                />
                <span
                  className={
                    step.id <= activeStep ? "text-white" : "text-gray-600"
                  }
                >
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          {renderStep()}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CheckoutPage; 