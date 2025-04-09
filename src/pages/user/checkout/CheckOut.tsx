/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import MaxWidth from "../../../wrapper/MaxWidth";
import {
  Image,
  Input,
  Card,
  Button,
  Radio,
  Space,
  Divider,
  Typography,
  Row,
  Col,
  Spin,
  message,
} from "antd";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { ArrowLeft, ArrowRight, Delete, Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  useCartDeleteMutation,
  useCartPostMutation,
  useCartRemoveMutation,
  useGetSinglecartDataQuery,
} from "../../../redux/api/cartApi/CartApi";
import Swal from "sweetalert2";
import truncateText from "../../../utils/truncateText";
import { useApplyCouponMutation } from "../../../redux/api/paymentApi/PaymentApi";
import OrderPlacement from "../../../components/common/OrderPlacement";

const { Title, Text } = Typography;

const CheckOut = () => {
    const [paymentType, setPaymentType] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [transactionId, setTransactionId] = useState<string | null>(null);
  

  const { data: userCartData, isLoading } = useGetSinglecartDataQuery(null);
  const cartProducts = userCartData?.data?.products || [];
  const [cartPost, { isLoading: posting }] = useCartPostMutation();
  const [cartRemove, { isLoading: removing }] = useCartRemoveMutation();
  const [cartDelete] = useCartDeleteMutation();
  const [applyCoupon] = useApplyCouponMutation();
  const swiperRefs = useRef([]);
  const [discountType, setDiscountType] = useState<"coupon" | "giftcard">(
    "coupon"
  );
  const [deliveryLocation, setDeliveryLocation] = useState<
    "inside" | "outside"
  >("inside");
  const [code, setCode] = useState("");
  const [shippingFee, setShippingFee] = useState(0.0);

  const [total, setTotal] = useState(0.0);
  const [subTotal, setSubTotal] = useState(0.0);

  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);


  useEffect(() => {
    setPaymentMethod(null);
    setTransactionId(null);
  }, [paymentType]);

  // Calculate totals
  useEffect(() => {
    // Calculate subtotal from cart data
    const calculatedSubTotal = userCartData?.data?.cartTotalCost || 0;
    setSubTotal(calculatedSubTotal);

    // Calculate shipping fee based on location
    const calculatedShippingFee = deliveryLocation === "inside" ? 50 : 100;
    setShippingFee(calculatedShippingFee);

    // Calculate total with discount
    const calculatedTotal =
      calculatedSubTotal + calculatedShippingFee - discountAmount;
    setTotal(calculatedTotal > 0 ? calculatedTotal : 0); // Ensure total doesn't go negative
  }, [userCartData, deliveryLocation, discountAmount]);

  // Handle coupon application
  const handleApply = async () => {
    if (!code.trim()) {
      message.warning("Please enter a code");
      return;
    }

    try {
      if (discountType === "coupon") {
        const response = await applyCoupon({
          code,
          cartTotal: subTotal, // Use current subtotal
        }).unwrap();

        if (response.success) {
          setDiscountAmount(response.data.discountAmount);
          setAppliedCoupon(response.data.coupon);
          Swal.fire({
            title: `Coupon ${response.data.code} applied successfully!`,
            text: `Discount: ${response.data.discountAmount}`,
            icon: "success",
          })
        }
      } else {
        // Gift card logic would go here
        Swal.fire({
          title: `Gift card ${code} applied!`,
          text: `Amount: ${response.data.appliedAmount}`,
          icon: "success",
        })
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.data?.message || "Failed to apply discount",
        icon: "error",
      })
    }
  };

  // Remove coupon
  const handleRemoveCoupon = () => {
    setDiscountAmount(0);
    setAppliedCoupon(null);
    setCode("");
    message.success("Coupon removed successfully");
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await cartDelete({ id: productId }).unwrap();
      message.success("Product removed from cart");
    } catch (error) {
      console.error("Failed to remove product", error);
      Swal.fire("Warning!", `${error?.data?.message}`, "warning");
    }
  };

  const handleAddToCart = async (status: any, product) => {
    try {
      if (status === "addToCart") {
        await cartPost({
          product: product?._id,
          quantity: 1,
          price: product?.productOfferPrice || product?.productSellingPrice,
        }).unwrap();
        message.success("Added to cart");
      } else if (status === "removeToCart") {
        await cartRemove({
          product: product?._id,
        }).unwrap();
        message.success("Removed from cart");
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
      Swal.fire("Warning!", `${error?.data?.message}`, "warning");
    }
  };

  if (isLoading) {
    return (
      <MaxWidth>
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      </MaxWidth>
    );
  }



  return (
    <MaxWidth>
      <div className="p-6">
        <Title level={2} className="mb-6">
          Checkout
        </Title>

        <Row gutter={24}>
          {/* Order Summary */}
          <Col xs={24} lg={10}>
            <Card
              title="Order Summary"
              bordered={false}
              headStyle={{ border: "none" }}
              className="mb-6"
            >
              {cartProducts.length === 0 ? (
                <div className="text-center py-8">
                  <Text type="secondary">Your cart is empty</Text>
                </div>
              ) : (
                <Space direction="vertical" size="middle" className="w-full">
                  {cartProducts.map((cartItem, inx) => {
                    const product = cartItem.product;
                    if (!swiperRefs.current[inx]) {
                      swiperRefs.current[inx] = null;
                    }
                    return (
                      <Card
                        key={inx}
                        hoverable
                        className="relative"
                        bodyStyle={{ padding: 12 }}
                      >
                        <div className="flex">
                          {/* Image Section */}
                          <div className="flex flex-col items-center mr-4">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                              <Swiper
                                modules={[Navigation, Pagination]}
                                onSwiper={(swiper) =>
                                  (swiperRefs.current[inx] = swiper)
                                }
                                spaceBetween={10}
                                slidesPerView={1}
                                loop
                              >
                                {product?.productFeatureImage && (
                                  <SwiperSlide>
                                    <Image
                                      src={product.productFeatureImage}
                                      alt="Feature Image"
                                      className="w-full h-full object-cover"
                                      preview={false}
                                    />
                                  </SwiperSlide>
                                )}
                                {product?.productImages?.map((img, index) => (
                                  <SwiperSlide key={index}>
                                    <Image
                                      src={img}
                                      alt={`Slide ${index + 1}`}
                                      className="w-full h-full object-cover"
                                      preview={false}
                                    />
                                  </SwiperSlide>
                                ))}
                              </Swiper>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="mt-2 flex justify-center items-center gap-2">
                              <Button
                                size="small"
                                icon={<ArrowLeft size={14} />}
                                onClick={() =>
                                  swiperRefs.current[inx]?.slidePrev()
                                }
                              />
                              <Button
                                size="small"
                                icon={<ArrowRight size={14} />}
                                onClick={() =>
                                  swiperRefs.current[inx]?.slideNext()
                                }
                              />
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="flex-grow">
                            <Text strong className="block mb-1">
                              {truncateText(product?.productName, 30)}
                            </Text>
                            <Text
                              type="secondary"
                              className="block mb-2 text-xs"
                            >
                              {product?.skuCode}
                            </Text>

                            <Text strong className="block mb-2">
                              ${cartItem?.totalPrice}
                            </Text>

                            <Space>
                              <Button
                                size="small"
                                icon={<Minus size={15} />}
                                onClick={() =>
                                  handleAddToCart("removeToCart", product)
                                }
                                loading={removing}
                              />
                              <Text>{cartItem?.quantity || 0}</Text>
                              <Button
                                size="small"
                                icon={<Plus size={15} />}
                                onClick={() =>
                                  handleAddToCart("addToCart", product)
                                }
                                loading={posting}
                              />
                            </Space>
                          </div>
                        </div>

                        <Button
                          danger
                          type="text"
                          icon={<Delete size={18} />}
                          onClick={() => handleDeleteProduct(product._id)}
                          className="absolute top-2 right-2"
                        />
                      </Card>
                    );
                  })}
                </Space>
              )}
            </Card>
          </Col>

          {/* Right Column */}
          <Col xs={24} lg={14}>
            <Row gutter={[24, 24]}>
              {/* Discount Section */}
              <Col span={24}>
                <Card title="Discount Options" bordered={false}>
                  <div className="w-full">
                    <Radio.Group
                      value={discountType}
                      onChange={(e) => {
                        setDiscountType(e.target.value);
                        setCode(""); // টাইপ পরিবর্তন করলে কোড রিসেট করুন
                      }}
                      className="w-full mb-4"
                    >
                      <Space direction="vertical" className="w-full">
                        <Radio value="coupon">Apply Coupon</Radio>
                        <Radio value="giftcard">Apply Gift Card</Radio>
                      </Space>
                    </Radio.Group>

                    <div className="flex mt-3">
                      <Input
                        placeholder={
                          discountType === "coupon"
                            ? "Enter Coupon Code"
                            : "Enter Gift Card Code"
                        }
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full mb-2"
                      />

                      <Button
                        type="primary"
                        onClick={handleApply}
                        className="w-40"
                      >
                        Apply{" "}
                        {discountType === "coupon" ? "Coupon" : "Gift Card"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>

              {/* Delivery Section */}
              <Col span={24}>
                <Card title="Delivery Options" bordered={false}>
                  <Radio.Group
                    value={deliveryLocation}
                    onChange={(e) => {
                      setDeliveryLocation(e.target.value);
                    }}
                    className="w-full"
                  >
                    <Space direction="vertical" className="w-full">
                      <Radio value="inside">Inside Dhaka</Radio>
                      <Radio value="outside">Outside Dhaka</Radio>
                    </Space>
                  </Radio.Group>
                </Card>
              </Col>

              {/* Payment Section */}
              <Col span={24}>
                <Card title="Payment Details" bordered={false}>
                  <Space direction="vertical" className="w-full">
                    <div className="flex justify-between">
                      <Text>Subtotal</Text>
                      <Text>${subTotal.toFixed(2)}</Text>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between">
                        <Text>
                          Discount ({appliedCoupon.code}:{" "}
                          {appliedCoupon.discountType === "percentage"
                            ? `${discountAmount}%`
                            : `$${discountAmount}`}
                          )
                        </Text>
                        <Text>-${discountAmount.toFixed(2)}</Text>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <Text>Shipping</Text>
                      <Text>${shippingFee.toFixed(2)}</Text>
                    </div>

                    <Divider className="my-2" />

                    <div className="flex justify-between font-semibold text-lg">
                      <Text strong>Total</Text>
                      <Text strong>${total.toFixed(2)}</Text>
                    </div>

                    {appliedCoupon && (
                      <p
                        type="link"
                        onClick={handleRemoveCoupon}
                        className="p-0 text-red-500 cursor-pointer"
                      >
                        Remove Coupon
                      </p>
                    )}
                  </Space>
                </Card>
              </Col>

              {/* order placement */}
              <Col span={24}>
                <OrderPlacement
                  paymentType={paymentType}
                  paymentMethod={paymentMethod}
                  transactionId={transactionId}
                  setPaymentType={setPaymentType}
                  setPaymentMethod={setPaymentMethod}
                  setTransactionId={setTransactionId}
                  deliveryLocation={deliveryLocation}
                  shippingFee={shippingFee}
                  cartProducts={cartProducts}
                  subTotal={subTotal}
                  total={total}
                  appliedCoupon={appliedCoupon}
                  discountAmount={discountAmount}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </MaxWidth>
  );
};

export default CheckOut;
