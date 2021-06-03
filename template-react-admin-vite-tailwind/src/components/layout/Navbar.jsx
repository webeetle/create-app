import React from "react";
import PropTypes from "prop-types";
import { LogoutIcon, MenuIcon } from "@heroicons/react/solid";
import { Dropdown, Button, Avatar } from "components/atoms";
import { observer } from "mobx-react-lite";
import { useStore } from "store";

const Navbar = observer(() => {
  const { layout, keycloak } = useStore();

  const logout = () => {};

  return (
    <div className="relative z-10 flex flex-shrink-0 h-16 bg-white shadow">
      <Button
        layout="text"
        onClick={() => {
          layout.toggleSidebar();
        }}
        style={{ borderRadius: 0 }}
        className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
      >
        <MenuIcon className="w-5 h-5" />
      </Button>
      <div className="flex items-center justify-between flex-1 px-4">
        <div className="items-center text-xl font-bold">
          {layout.currentPage}
        </div>
        <div className="flex md:items-center">
          <Dropdown
            dropClass={"w-56 mt-2 right-0"}
            btnClass={"text-center w-auto"}
            trigger={
              <Avatar
                layout="text"
                circle
                notification
                colorNotification="green"
                text={"R"}
              />
            }
            dropItems={
              <>
                <Button
                  layout="text"
                  color="primary"
                  onClick={() => logout()}
                  className="justify-start px-3 py-2 space-x-3"
                >
                  <LogoutIcon className="w-5 h-5" />
                  <span>Sign Out</span>
                </Button>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
});

Navbar.propTypes = {
  className: PropTypes.string,
};

Navbar.defaultProps = {};

export default Navbar;
