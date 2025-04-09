/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Button, Card, Input, message, Radio, Space } from 'antd';
import { useApplyCouponMutation, useApplyGiftCardMutation } from '../../../redux/api/paymentApi/PaymentApi';


const DiscountSection = ({ cartTotal, setDiscountApplied }  :any) => {
  const [couponCode, setCouponCode] = useState('');
  const [giftCardCode, setGiftCardCode] = useState('');
  const [discountType, setDiscountType] = useState('coupon');
  const [applyCoupon] = useApplyCouponMutation();
  const [applyGiftCard] = useApplyGiftCardMutation();

  const handleApplyDiscount = async () => {
    try {
      let response;
      if (discountType === 'coupon') {
        response = await applyCoupon({ code: couponCode, cartTotal }).unwrap();
        message.success(`Coupon applied! Discount: ${response.discountAmount}`);
      } else {
        response = await applyGiftCard({ code: giftCardCode, cartTotal }).unwrap();
        message.success(`Gift card applied! Amount: ${response.appliedAmount}`);
      }
      setDiscountApplied(response);
    } catch (error : any) {
      message.error(error.data?.message || 'Failed to apply discount');
    }
  };

  return (
    <Card title="Discount Options" bordered={false}>
      <Radio.Group 
        value={discountType} 
        onChange={(e) => setDiscountType(e.target.value)}
        className="w-full mb-4"
      >
        <Space direction="vertical" className="w-full">
          <Radio value="coupon">Apply Coupon</Radio>
          {discountType === 'coupon' && (
            <Space.Compact className="w-full">
              <Input
                placeholder="Enter Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button type="primary" onClick={handleApplyDiscount}>
                Apply
              </Button>
            </Space.Compact>
          )}

          <Radio value="giftcard">Apply Gift Card</Radio>
          {discountType === 'giftcard' && (
            <Space.Compact className="w-full">
              <Input
                placeholder="Enter Gift Card Code"
                value={giftCardCode}
                onChange={(e) => setGiftCardCode(e.target.value)}
              />
              <Button type="primary" onClick={handleApplyDiscount}>
                Apply
              </Button>
            </Space.Compact>
          )}
        </Space>
      </Radio.Group>
    </Card>
  );
};

export default DiscountSection;