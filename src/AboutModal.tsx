import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

const AboutModal = ({
  isOpen,
  toggle,
  onConfirm,
}: {
  isOpen: boolean;
  toggle: any;
  onConfirm: any;
}) => (
  <Modal isOpen={isOpen} toggle={toggle}>
    <ModalBody>
      <p>Press start to drill images at random</p>
      <p>Picture sets save to localstorage</p>
      <p>
        - <a href="https://tannenbau.me">Joe T</a>
      </p>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={onConfirm}>
        Close
      </Button>
    </ModalFooter>
  </Modal>
);

export default AboutModal;
