/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { closeModal } from "../../redux/features/auth/loginRegistrationSlice";
import NormalUserAuthForm from "./NormalUserAuthForm";

const AuthModal = () => {
  const dispatch = useDispatch();
  const { isModalOpen, status } = useSelector(
    (state: RootState) => state.loginRegistration
  );
  return (
    <Modal
      title={status === "login" ? "Login" : "Registration"}
      open={isModalOpen}
      onCancel={() => dispatch(closeModal())}
      footer={null}
    >
      <NormalUserAuthForm/>
    </Modal>
  );
};

export default AuthModal;
