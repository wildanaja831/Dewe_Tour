import { Button, Modal } from "flowbite-react";

const DeletePopUp = (props) => {
  const handleDelete = () => {
    props.setConfirmDelete(true);
    props.setOpenModal(undefined);
  };

  return (
    <Modal
      show={props.openModal === "pop-up"}
      size="md"
      popup
      onClose={() => props.setOpenModal(undefined)}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this country?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={handleDelete}>
              Yes
            </Button>
            <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeletePopUp;
