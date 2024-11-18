"use client";

import React, {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { HiXMark } from "react-icons/hi2"; // Assuming you're using react-icons

type ModalProps = {
  children: React.ReactNode;
};

type ModalContextType = {
  openModal: string;
  setOpenModal: React.Dispatch<React.SetStateAction<string>>;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

//useContext function

function useModalContext() {
  const context = useContext(ModalContext);

  if (!context) throw new Error("Error in reading Context");

  return context;
}

function Modal({ children }: ModalProps) {
  const [openModal, setOpenModal] = useState("");
  const closeModal = () => setOpenModal("");

  return (
    <ModalContext.Provider value={{ openModal, setOpenModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function OpenButton({
  children,
  modalName,
}: {
  children: React.ReactElement;
  modalName: string;
}) {
  const { setOpenModal } = useModalContext();

  return cloneElement(children, { onClick: () => setOpenModal(modalName) });
}

function ModalWindow({
  windowName,
  children,
}: {
  children: React.ReactElement;
  windowName: string;
}) {
  const { openModal, closeModal } = useModalContext();
  const refModalWindow = useRef<HTMLDivElement | null>(null);

  if (windowName !== openModal) return null;

  return createPortal(
    <div className="fixed top-0 z-50 flex h-dvh w-full items-center justify-center bg-white/5 text-white backdrop-blur-sm">
      <div
        ref={refModalWindow}
        className="h-[60%] w-[60%] rounded-md border border-slate-300/40 bg-black/20 px-5 py-3"
      >
        <div
          className="mb-2 flex w-full justify-end"
          onClick={() => closeModal()}
        >
          <HiXMark
            color="white"
            size={30}
            className="rounded-md border border-slate-500/40 px-1 py-2 transition-all duration-150 hover:border hover:bg-white/10"
          />
        </div>
        <div className="h-[90%] w-full overflow-auto">
          {cloneElement(children, { closeModal })}
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.OpenButton = OpenButton;
Modal.ModalWindow = ModalWindow;

export default Modal;
