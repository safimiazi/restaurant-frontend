/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Card, Input, Button, Space, message, Select, Divider } from "antd";
import {
  useInitiateSSLCommerzMutation,
  usePlaceOrderMutation,
} from "../../redux/api/orderApi/OrderApi";
import Swal from "sweetalert2";

// cartTypes.ts
export interface CartItem {
  product: {
    _id: string;
    productName: string;
    productSellingPrice: number;
    // other product fields
  };
  quantity: number;
  totalPrice: number;
}

// couponTypes.ts
export interface CouponType {
  id: string;
  code: string;
  name: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
}

interface OrderPlacementProps {
  // Payment related props
  paymentType: string | null;
  paymentMethod: string | null;
  transactionId: string | null;
  setPaymentType: (type: string | null) => void;
  setPaymentMethod: (method: string | null) => void;
  setTransactionId: (id: string | null) => void;

  // Delivery related props
  deliveryLocation: "inside" | "outside";
  shippingFee: number;

  // Cart related props
  cartProducts: CartItem[];
  subTotal: number;
  total: number;

  // Coupon related props
  appliedCoupon: CouponType | null;
  discountAmount: number;
}

const OrderPlacement: React.FC<OrderPlacementProps> = ({
  paymentType,
  paymentMethod,
  transactionId,
  setPaymentType,
  setPaymentMethod,
  setTransactionId,
  deliveryLocation,
  shippingFee,
  cartProducts,
  subTotal,
  total,
  appliedCoupon,
  discountAmount,
}) => {
  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();
  const [initiateSSLCommerz, { isLoading: isProcessingSSL }] =
    useInitiateSSLCommerzMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.phone || !formData.address) {
      message.error("Please fill all required customer information");
      return;
    }

    if (paymentType === "manual" && (!paymentMethod || !transactionId)) {
      message.error("Please select payment method and enter transaction ID");
      return;
    }

    const orderData = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      },
      payment: {
        type: paymentType,
        method: paymentMethod,
        transactionId: paymentType === "manual" ? transactionId : undefined,
      },
      delivery: {
        location: deliveryLocation,
        fee: shippingFee,
      },
      coupon: appliedCoupon
        ? {
            code: appliedCoupon.code,
            discount: discountAmount,
          }
        : null,
      items: cartProducts.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.totalPrice,
      })),
      subtotal: subTotal,
      total: total,
      status: "pending",
    };

    try {
      if (paymentType === "SSLCommerz") {
        const response = await initiateSSLCommerz(orderData).unwrap();
        console.log(response);
        if (response?.data.payment_url) {
          window.location.href = response.data.payment_url;
        } else {
          Swal.fire(
            "Failed to initialize payment gateway",
            "Please try again later",
            "error"
          );
        }
      } else {
        const response = await placeOrder(orderData).unwrap();
        if (response.success) {
          Swal.fire(
            `${response.message}`,
            `Order ID: ${response.data._id}`,
            "success"
          );
        }
      }
    } catch (error: any) {
      Swal.fire(
        error.message
          ? `${error.message} `
          : "Failed to initialize payment gateway",
        "Please try again later",
        "error"
      );
    }
  };

  return (
    <>
      <Card title="Customer Information" >
        <Space direction="vertical" className="w-full" size="middle">
          <Input
            className="w-full"
            placeholder="Full Name*"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Input
            className="w-full"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            className="w-full"
            placeholder="Phone Number*"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <Input.TextArea
            className="w-full"
            placeholder="Shipping Address*"
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />

          <Divider orientation="left">Payment Method</Divider>

          <Select
            className="w-full"
            value={paymentType}
            onChange={setPaymentType}
            placeholder="Select Payment Type"
            options={[
              { value: "manual", label: "Manual Payment" },
              { value: "cashOnDelivery", label: "Cash On Delivery" },
              { value: "SSLCommerz", label: "SSL Commerz" },
            ]}
          />

          {paymentType === "manual" && (
            <>
              <Select
                className="w-full"
                value={paymentMethod}
                onChange={setPaymentMethod}
                placeholder="Select Payment Method"
                options={[
                  { value: "bkash", label: "Bkash" },
                  { value: "nagad", label: "Nagad" },
                  { value: "upay", label: "Upay" },
                  { value: "rocket", label: "Rocket" },
                ]}
              />
              <Input
                value={transactionId || ""}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Transaction ID"
              />
            </>
          )}
        </Space>
      </Card>

      <Button
        type="primary"
        size="large"
        block
        className="h-12 bg-orange-500 hover:bg-orange-600 mt-4"
        onClick={handlePlaceOrder}
        loading={isPlacingOrder || isProcessingSSL}
      >
        {paymentType === "SSLCommerz" ? "Proceed to Payment" : "Place Order"}
      </Button>
    </>
  );
};

export default OrderPlacement;
