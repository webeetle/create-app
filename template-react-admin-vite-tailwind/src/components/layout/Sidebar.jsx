import React from "react";
import PropTypes from "prop-types";
import { Button } from "components/atoms";
import { observer } from "mobx-react-lite";
import { useStore } from "store";
import { sidebarMenu } from "utils/sidebar";
import { useHistory, useLocation } from "react-router";

const Sidebar = observer(() => {
  const { layout } = useStore();
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <div className="text-white md:w-auto bg-gradient-to-b from-indigo-700 to-indigo-500 md:flex md:flex-shrink-0">
        <div
          className="flex flex-col"
          style={{
            width:
              window.innerWidth < 400 && !layout.sidebar.open
                ? 0
                : layout.sidebar.open
                ? layout.sidebar.width
                : layout.sidebar.widthCollapsed,
          }}
        >
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center justify-center flex-shrink-0 px-4">
              <h1 className="justify-center text-3xl font-bold">
                {!layout.sidebar.open ? "A" : "Admin Panel"}
              </h1>
            </div>
            <div className="flex flex-col flex-1 mt-5">
              <nav className="flex-1 px-2 space-y-1">
                {sidebarMenu(location).map((x) => (
                  <Button
                    key={x.key}
                    onClick={() => {
                      history.push(`${x.props.path}`);
                    }}
                    layout="text"
                    color="white"
                    className={`w-full px-4 py-2 space-x-3 rounded-lg hover:bg-indigo-800 ${
                      x.cls
                    } ${!layout.sidebar.open && "justify-center"}`}
                  >
                    <span>{x.icon}</span>{" "}
                    {layout.sidebar.open && <span>{x.label}</span>}
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

Sidebar.propTypes = {
  className: PropTypes.string,
};

Sidebar.defaultProps = {};

export default Sidebar;
