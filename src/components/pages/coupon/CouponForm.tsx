/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
  Space,
  Row,
  Col,
  Alert,
} from "antd";
import dayjs from "dayjs";
import { FormInstance } from "antd/lib/form";
import { useGetproductDataQuery } from "../../../redux/api/productApi/ProductApi";
import { useGetCategoryDataQuery } from "../../../redux/api/categoryApi/CategoryApi";

const { Option } = Select;

interface CouponFormProps {
  onSubmit: (values: any) => void;
  initialValues?: any;
  form?: FormInstance;
}

const CouponForm: React.FC<CouponFormProps> = ({ onSubmit, initialValues }) => {
  const { data: product } = useGetproductDataQuery({ isDelete: false });
  const { data: categories } = useGetCategoryDataQuery({ isDelete: false });
  const [form] = Form.useForm();
  const [discountType, setDiscountType] = useState<string>("percentage");
  const [showMaxDiscount, setShowMaxDiscount] = useState<boolean>(false);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        dateRange: initialValues.dateRange || [
          dayjs(initialValues.startDate),
          dayjs(initialValues.endDate),
        ],
      });
      setDiscountType(initialValues.discountType || "percentage");
      setShowMaxDiscount(initialValues.discountType === "percentage");
    }
  }, [initialValues, form]);

  const onFinish = (values: any) => {
    const formattedValues = {
      ...values,
      startDate: values.dateRange[0].toISOString(),
      endDate: values.dateRange[1].toISOString(),
    };
    onSubmit(formattedValues);
  };

  const handleDiscountTypeChange = (value: string) => {
    setDiscountType(value);
    setShowMaxDiscount(value === "percentage");
    // Reset max discount when switching types
    if (value !== "percentage") {
      form.setFieldsValue({ maxDiscountAmount: null });
    }
  };

  const disabledDate = (current: dayjs.Dayjs) => {
    // Can not select days before today
    return current && current < dayjs().startOf("day");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        discountType: "percentage",
        minOrderAmount: 0,
        isActive: true,
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="code"
            label="Coupon Code"
            rules={[
              { required: true, message: "Please input coupon code!" },
              {
                pattern: /^[A-Z0-9]+$/,
                message: "Only uppercase letters and numbers allowed",
              },
            ]}
          >
            <Input placeholder="e.g., SUMMER20" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Coupon Name"
            rules={[{ required: true, message: "Please input coupon name!" }]}
          >
            <Input placeholder="e.g., Summer Sale 2023" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="description" label="Description (Optional)">
        <Input.TextArea rows={3} placeholder="Coupon description" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="discountType"
            label="Discount Type"
            rules={[{ required: true }]}
          >
            <Select onChange={handleDiscountTypeChange}>
              <Option value="percentage">Percentage</Option>
              <Option value="fixed">Fixed Amount</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="discountValue"
            label={
              discountType === "percentage"
                ? "Discount Percentage"
                : "Discount Amount"
            }
            rules={[
              { required: true, message: "Please input discount value!" },
              {
                validator: (_, value) => {
                  if (discountType === "percentage" && value > 100) {
                    return Promise.reject(
                      "Percentage discount cannot exceed 100%"
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber
              min={0}
              max={discountType === "percentage" ? 100 : undefined}
              style={{ width: "100%" }}
              addonAfter={discountType === "percentage" ? "%" : "$"}
            />
          </Form.Item>
        </Col>
      </Row>

      {showMaxDiscount && (
        <Form.Item
          name="maxDiscountAmount"
          label="Maximum Discount Amount (Optional)"
          tooltip="Maximum amount that can be discounted (for percentage discounts)"
        >
          <InputNumber min={0} style={{ width: "100%" }} prefix="$" />
        </Form.Item>
      )}

      <Form.Item
        name="minOrderAmount"
        label="Minimum Order Amount"
        tooltip="Minimum cart total required to apply this coupon"
      >
        <InputNumber min={0} style={{ width: "100%" }} prefix="$" />
      </Form.Item>

      <Form.Item
        name="dateRange"
        label="Validity Period"
        rules={[{ required: true, message: "Please select date range!" }]}
      >
        <DatePicker.RangePicker
          style={{ width: "100%" }}
          disabledDate={disabledDate}
          showTime={false}
          format="YYYY-MM-DD"
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="usageLimit"
            label="Usage Limit (Optional)"
            tooltip="Maximum number of times this coupon can be used"
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="isActive" label="Status" valuePropName="checked">
            <Select>
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="categories"
            label="Applicable Categories"
            rules={[{ required: false }]}
          >
            <Select
              mode="multiple"
              loading={!categories}
              placeholder="Select a category"
              options={
                categories?.data?.result.map((item: any) => ({
                  label: `${item.name} (${item?.type?.toUpperCase()})`,
                  value: item._id,
                })) || []
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="products"
            label="Specific Products"
            rules={[{ required: false }]}
          >
            <Select
              mode="multiple"
              loading={!product}
              placeholder="Select products"
              options={
                product?.data?.result.map((item: any) => ({
                  label: `${item.productName}`,
                  value: item._id,
                })) || []
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Update Coupon" : "Create Coupon"}
          </Button>
          <Button htmlType="button" onClick={() => form.resetFields()}>
            Reset
          </Button>
        </Space>
      </Form.Item>

      {discountType === "percentage" &&
        !form.getFieldValue("maxDiscountAmount") && (
          <Alert
            message="Recommendation"
            description="Consider setting a maximum discount amount for percentage coupons to control your discount exposure."
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
    </Form>
  );
};

export default CouponForm;
