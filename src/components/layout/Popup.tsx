import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white max-w-lg mx-auto p-6 rounded-lg shadow-lg outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      {children}
    </Modal>
  );
};

export default Popup;
