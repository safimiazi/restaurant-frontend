/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  changeStatus,
  closeModal,
} from "../../redux/features/auth/loginRegistrationSlice";
import {
  useCustomerRegistrationMutation,
  useUserLoginMutation,
} from "../../redux/api/authApi/AuthApi";
import Swal from "sweetalert2";
import { setUser } from "../../redux/features/auth/authSlice";

const PhoneAuthForm = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.loginRegistration);
  const [customerRegistration, { isLoading: regisLoading }] =
    useCustomerRegistrationMutation();
  const [userLogin, { isLoading: loginLoading }] = useUserLoginMutation();
  const handleSubmit = async (values: any) => {
    try {
      if (status === "login") {
        const result: any = await userLogin({
          phone: values?.phone,
        }).unwrap();

     
        dispatch(setUser({token: result?.data.token, user: {
            userId: result?.data?.user?._id,
            phone: result?.data?.user?.phone,
            role: result?.data?.user?.role,
        }}));
        Swal.fire({
          title: "Good job!",
          text: `${result?.message}`,
          icon: "success",
        });
        dispatch(closeModal());
        return;
      }
      const result: any = await customerRegistration({
        phone: values?.phone,
      }).unwrap();

      Swal.fire({
        title: "Good job!",
        text: `${result?.message}`,
        icon: "success",
      });
      dispatch(closeModal());
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error?.data?.message,
        icon: "error",
      });
    }
  };

  // Bangladeshi Phone Number Validation
  const validatePhoneNumber = (_: any, value: string) => {
    const phoneRegex = /^(\+8801[3-9]\d{8}|01[3-9]\d{8})$/; // BD phone number format
    if (!value) {
      return Promise.reject("Please enter your phone number!");
    }
    if (!phoneRegex.test(value)) {
      return Promise.reject("Enter a valid Bangladeshi phone number!");
    }
    return Promise.resolve();
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ validator: validatePhoneNumber }]}
      >
        <Input placeholder="Enter your phone number" />
      </Form.Item>

      <Button
        loading={status === "login" ? loginLoading : regisLoading}
        type="primary"
        htmlType="submit"
        block
      >
        {status === "login" ? "Login" : "Register"}
      </Button>

      <div style={{ textAlign: "center", marginTop: 10 }}>
        {status === "login" ? (
          <p>
            Don't have an account?{" "}
            <Button
              type="link"
              onClick={() => dispatch(changeStatus("registration"))}
            >
              Register
            </Button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Button type="link" onClick={() => dispatch(changeStatus("login"))}>
              Login
            </Button>
          </p>
        )}
      </div>
    </Form>
  );
};

export default PhoneAuthForm;
