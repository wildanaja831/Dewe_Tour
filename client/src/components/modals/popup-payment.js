import { useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react";

const PopUpListTransaction = ({ show, setShow }) => {
  const navigate = useNavigate();

  return (
    <Modal show={show} onHide={setShow}>
      <div className="p-3 text-center">
        <p>Your payment will be confirmed within 1 x 24 hours</p>
        <p>
          To see orders click
          <span
            className="font-semibold mx-1 cursor-pointer"
            onClick={() => navigate("/my-trip")}
          >
            Here
          </span>
          Thank you
        </p>
      </div>
    </Modal>
  );
};

export default PopUpListTransaction;
