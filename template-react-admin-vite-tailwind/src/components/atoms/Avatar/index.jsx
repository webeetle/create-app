import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Avatar = (props) => {
  const {
    layout = "image",
    bgColor = "gray",
    src = "",
    text = "",
    size = "md",
    circle = false,
    rounded = false,
    notification = false,
    colorNotification = "green",
    sizeNotification = "md",
    positonNotification = "top-right",
  } = props;
  const decorateImg = () => {
    return {
      [`w-6 h-6`]: size === "sm",
      [`w-10 h-10`]: size === "md",
      [`w-14 h-14`]: size === "lg",
      [`w-20 h-20`]: size === "xl",
      [`bg-red-400`]: bgColor === "red" && layout === "text",
      [`bg-yellow-400`]: bgColor === "yellow" && layout === "text",
      [`bg-green-400`]: bgColor === "green" && layout === "text",
      [`bg-blue-400`]: bgColor === "blue" && layout === "text",
      [`bg-indigo-400`]: bgColor === "indigo" && layout === "text",
      [`bg-purple-400`]: bgColor === "purple" && layout === "text",
      [`bg-pink-400`]: bgColor === "pink" && layout === "text",
      [`bg-gray-400`]: bgColor === "gray" && layout === "text",
      "rounded-lg": rounded,
      "rounded-full": circle,
    };
  };
  const decorateNotification = () => {
    return {
      [`bg-red-300`]: colorNotification === "red",
      [`bg-yellow-300`]: colorNotification === "yellow",
      [`bg-green-300`]: colorNotification === "green",
      [`bg-blue-300`]: colorNotification === "blue",
      [`bg-indigo-300`]: colorNotification === "indigo",
      [`bg-purple-300`]: colorNotification === "purple",
      [`bg-pink-300`]: colorNotification === "pink",
      [`bg-gray-300`]: colorNotification === "gray",
      [`w-2 h-2`]: sizeNotification === "sm",
      [`w-2.5 h-2.5`]: sizeNotification === "md",
      [`w-3 h-3`]: sizeNotification === "lg",
      [`w-4 h-4`]: sizeNotification === "xl",
      "top-0 right-0": positonNotification === "top-right",
      "bottom-0 right-0": positonNotification === "bottom-right",
      "bottom-0 left-0": positonNotification === "bottom-left",
      "top-0 left-0": positonNotification === "top-left",
    };
  };
  return (
    <div className="relative w- _p_avatar">
      {layout === "image" && (
        <img
          className={classnames(
            decorateImg(),
            "_p_avatar_img",
            `${props.className ?? ""}`
          )}
          src={src}
          alt=""
        />
      )}
      {layout === "text" && (
        <span
          className={classnames(
            decorateImg(),
            "_p_avatar_text inline-flex items-center justify-center",
            `${props.className ?? ""}`
          )}
        >
          <span className="text-sm font-medium leading-none text-white">
            {text}
          </span>
        </span>
      )}
      {notification && (
        <span
          className={classnames(
            decorateNotification(),
            "_p_avatar_notification absolute block ring-2 rounded-full ring-white",
            `${props.classNameNotification ?? ""}`
          )}
        ></span>
      )}
    </div>
  );
};
Avatar.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  classNameNotification: PropTypes.string,
  notification: PropTypes.bool,
  layout: PropTypes.oneOf(["image", "text"]),
  colorNotification: PropTypes.string,
  positonNotification: PropTypes.oneOf([
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left",
  ]),
  sizeNotification: PropTypes.string,
  onClick: PropTypes.func,
};

export default Avatar;
