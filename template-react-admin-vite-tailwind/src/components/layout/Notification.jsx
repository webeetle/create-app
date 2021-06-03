import React from "react";
import PropTypes from "prop-types";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { Panel, Level } from "components/atoms";
import { Transition } from "@headlessui/react";

const Notification = ({ show = false, layout = "paper", ...props }) => {
  return (
    <Transition
      show={show}
      enter="transition-all ease-in-out duration-300 transform"
      enterFrom="translate-x-full opacity-0"
      enterTo="translate-x-0 opacity-100"
      leave="transition-all ease-in-out duration-300 transform"
      leaveFrom="translate-x-0 opacity-100"
      leaveTo="translate-x-full opacity-0"
    >
      <div className="z-50 mb-3 mr-3">
        <Panel padding={1} className="shadow-md" layout={layout}>
          <Level className="items-center">
            <div className="flex-shrink-0">
              {layout === "success" ? (
                <CheckCircleIcon className="w-5 h-5" />
              ) : null}
              {layout === "error" ? <XCircleIcon className="w-5 h-5" /> : null}
              {layout === "warning" ? (
                <ExclamationCircleIcon className="w-5 h-5" />
              ) : null}
              {layout === "paper" ? (
                <InformationCircleIcon className="text-blue-400" />
              ) : null}
            </div>
            <div className={`${layout === "paper" ? "text-blue-400" : ""}`}>
              {props.children}
            </div>
          </Level>
        </Panel>
      </div>
    </Transition>
  );
};
Notification.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
  layout: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any,
};

Notification.defaultProps = {};

export default Notification;
