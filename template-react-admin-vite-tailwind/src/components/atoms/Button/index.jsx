import classnames from "classnames";
import React from "react";
import PropTypes from "prop-types";

const Button = ({
  size = "md",
  color = "indigo",
  layout = false,
  shadow = false,
  light = true,
  dark = false,
  rounded = false,
  ...props
}) => {
  const decorateButton = () => {
    switch (layout) {
      case "text": {
        return {
          [`hover:text-red-500`]: color === "red",
          [`hover:text-yellow-500`]: color === "yellow",
          [`hover:text-green-500`]: color === "green",
          [`hover:text-blue-500`]: color === "blue",
          [`hover:text-indigo-500`]: color === "indigo",
          [`hover:text-purple-500`]: color === "purple",
          [`hover:text-pink-500`]: color === "pink",
          [`hover:text-gray-500`]: color === "gray",

          "text-sm font-medium": size === "md",
          "text-xs font-medium": size === "sm" || size === "xs",
          "text-base font-medium": size === "lg" || size === "xl",
          _p_button_text: true,
        };
      }
      case "bordered": {
        return {
          [`border-red-500 text-red-700 hover:bg-red-100 active:bg-red-200`]:
            color === "red",
          [`border-yellow-500 text-yellow-700 hover:bg-yellow-100 active:bg-yellow-200`]:
            color === "yellow",
          [`border-green-500 text-green-700 hover:bg-green-100 active:bg-green-200`]:
            color === "green",
          [`border-blue-500 text-blue-700 hover:bg-blue-100 active:bg-blue-200`]:
            color === "blue",
          [`border-indigo-500 text-indigo-700 hover:bg-indigo-100 active:bg-indigo-200`]:
            color === "indigo",
          [`border-purple-500 text-purple-700 hover:bg-purple-100 active:bg-purple-200`]:
            color === "purple",
          [`border-pink-500 text-pink-700 hover:bg-pink-100 active:bg-pink-200`]:
            color === "pink",
          [`border-gray-500 text-gray-700 hover:bg-gray-100 active:bg-gray-200`]:
            color === "gray",

          "border-solid border": true,
          "shadow-md hover:shadow-md": shadow,
          "rounded-lg": rounded,

          "text-sm font-medium px-4 py-2": size === "md",
          "text-xs font-medium px-3 py-2": size === "sm",
          "text-xs font-medium px-2.5 py-1.5": size === "xs",
          "text-base font-medium px-4 py-2": size === "lg",
          "text-base font-medium px-6 py-3": size === "xl",
          _p_button_bordered: true,
        };
      }
      case "contained": {
        return {
          [`bg-red-500 hover:bg-red-600`]: color === "red",
          [`bg-yellow-500 hover:bg-yellow-600`]: color === "yellow",
          [`bg-green-500 hover:bg-green-600`]: color === "green",
          [`bg-blue-500 hover:bg-blue-600`]: color === "blue",
          [`bg-indigo-500 hover:bg-indigo-600`]: color === "indigo",
          [`bg-purple-500 hover:bg-purple-600`]: color === "purple",
          [`bg-pink-500 hover:bg-pink-600`]: color === "pink",
          [`bg-gray-500 hover:bg-gray-600`]: color === "gray",

          "text-white": light && !dark,
          "text-black": dark,

          "shadow-lg hover:shadow-md": shadow,
          "rounded-lg": rounded,

          "text-sm font-medium px-4 py-2": !size || size === "md",
          "text-xs font-medium px-3 py-2": size === "sm",
          "text-xs font-medium px-2.5 py-1.5": size === "xs",
          "text-base font-medium px-4 py-2": size === "lg",
          "text-base font-medium px-6 py-3": size === "xl",
          _p_button_contained: true,
          "border border-transparent": true,
        };
      }
      default:
        return {
          [`bg-red-500 hover:bg-red-600`]: color === "red",
          [`bg-yellow-500 hover:bg-yellow-600`]: color === "yellow",
          [`bg-green-500 hover:bg-green-600`]: color === "green",
          [`bg-blue-500 hover:bg-blue-600`]: color === "blue",
          [`bg-indigo-500 hover:bg-indigo-600`]: color === "indigo",
          [`bg-purple-500 hover:bg-purple-600`]: color === "purple",
          [`bg-pink-500 hover:bg-pink-600`]: color === "pink",
          [`bg-gray-500 hover:bg-gray-600`]: color === "gray",

          "text-white": light && !dark,
          "text-black": dark,

          "shadow-lg hover:shadow-md": shadow,
          "rounded-lg": rounded,

          "text-sm font-medium px-4 py-2": !size || size === "md",
          "text-xs font-medium px-3 py-2": size === "sm",
          "text-xs font-medium px-2.5 py-1.5": size === "xs",
          "text-base font-medium px-4 py-2": size === "lg",
          "text-base font-medium px-6 py-3": size === "xl",
          _p_button_contained: true,
          "border border-transparent": true,
        };
    }
  };

  return (
    <button
      onClick={() =>
        typeof props.onClick === "function" ? props.onClick() : null
      }
      style={{ ...props.style }}
      className={classnames(
        decorateButton(),
        "_p_button inline-flex items-center outline-none focus:outline-none transition duration-150 ease-in-out",
        `${props.className ?? ""}`
      )}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  color: PropTypes.string,
  layout: PropTypes.oneOf(["text", "bordered", "contained"]),
  className: PropTypes.string,
  rounded: PropTypes.bool,
  light: PropTypes.bool,
  dark: PropTypes.bool,
  shadow: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.any,
  style: PropTypes.any,
};

export default Button;
