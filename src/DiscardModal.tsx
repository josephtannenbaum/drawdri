import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

const DiscardModal = ({
  isOpen,
  toggleDiscardModal,
  selectedDrill,
  onDiscardConfirm,
}: {
  isOpen: boolean;
  toggleDiscardModal: any;
  onDiscardConfirm: any;
  selectedDrill: string;
}) => (
  <Modal isOpen={isOpen} toggle={toggleDiscardModal}>
    <ModalBody>You want to delete {selectedDrill}?</ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={onDiscardConfirm}>
        OK
      </Button>{" "}
      <Button color="secondary" onClick={toggleDiscardModal}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
);

export default DiscardModal;
