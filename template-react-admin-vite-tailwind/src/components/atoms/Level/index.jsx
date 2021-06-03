import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Level = (props) => {
  const { reverse = false, spacing = "md" } = props;
  return (
    <div
      onClick={() =>
        typeof props.onClick === "function" ? props.onClick() : null
      }
      className={classnames(
        "flex-col flex md:flex-row",
        {
          _p_level: props.layout !== "button",
          _p_level_button: props.layout === "button",
          "space-x-reverse flex-row-reverse": reverse,
          "md:space-x-3 space-x-0 space-y-3 md:space-y-0": spacing === "sm",
          "md:space-x-5 space-x-0 space-y-5 md:space-y-0": spacing === "md",
          "md:space-x-8 space-x-0 space-y-8 md:space-y-0": spacing === "lg",
          "md:space-x-10 space-x-0 space-y-10 md:space-y-0": spacing === "xl",
          "hover:bg-gray-50 cursor-pointer": props.layout === "button",
        },
        `${props.className ?? ""}`
      )}
    >
      {props.children}
    </div>
  );
};
Level.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  spacingX: PropTypes.string,
  spacingY: PropTypes.string,
  jAlign: PropTypes.string,
  iAlign: PropTypes.string,
  layout: PropTypes.string,
  onClick: PropTypes.func,
};

export default Level;
