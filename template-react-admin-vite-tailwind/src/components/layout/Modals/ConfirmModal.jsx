import React from "react";
import PropTypes from "prop-types";
import { Level, Button } from "components/atoms";
import { Dialog } from "@headlessui/react";

export default function ConfirmModal({
  body,
  header,
  isOpen,
  onCancel = () => {},
  onConfirm = () => {},
}) {
  ConfirmModal.propTypes = {
    body: PropTypes.any,
    header: PropTypes.any,
    isOpen: PropTypes.bool,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.any,
  };

  return (
    <>
      {isOpen && (
        <Dialog
          onClose={() => onCancel()}
          open={isOpen}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
          static
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-80" />
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
            <Dialog.Title>{header}</Dialog.Title>
            <Dialog.Description>{body}</Dialog.Description>
            <Level className="justify-end">
              <Button
                layout="text"
                color="red"
                className="w-full sm:w-auto"
                onClick={() => {
                  onCancel();
                }}
              >
                Cancel
              </Button>
              <Button
                className="w-full sm:w-auto"
                onClick={() => {
                  onConfirm();
                }}
              >
                Ok
              </Button>
            </Level>
          </div>
        </Dialog>
      )}
    </>
  );
}
