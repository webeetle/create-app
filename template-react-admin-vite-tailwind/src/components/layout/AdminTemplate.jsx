import React from "react";
import { observer } from "mobx-react-lite";
import Navbar from "components/layout/Navbar";
import Sidebar from "components/layout/Sidebar";
import { useStore } from "store";
import Notification from "components/layout/Notification";
import ConfirmModal from "components/layout/Modals/ConfirmModal";
import AlertModal from "components/layout/Modals/AlertModal";

const AdminTemplate = observer(({ ...props }) => {
  const { layout } = useStore();
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />

      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Navbar />
        <main className="relative flex-1 overflow-y-auto focus:outline-none min-w-min">
          <div className="px-6 mx-auto">
            <div className="py-4 md:py-12">{props.children}</div>
          </div>
        </main>
      </div>

      {layout.confirm.isOpen && (
        <ConfirmModal
          isOpen={layout.confirm.isOpen}
          header={layout.confirm.header}
          body={layout.confirm.body}
          onCancel={async () => {
            await layout.confirm.onCancel();
            layout.closeConfirm();
          }}
          onConfirm={async () => {
            await layout.confirm.onConfirm();
            layout.closeConfirm();
          }}
        />
      )}

      {layout.alert.isOpen && (
        <AlertModal
          isOpen={layout.alert.isOpen}
          header={layout.alert.header}
          body={layout.alert.body}
          onConfirm={async () => {
            await layout.alert.onConfirm();
            layout.closeAlert();
          }}
        />
      )}

      <div className="fixed inset-0 z-50 flex flex-col items-end justify-end px-4 pt-6 pointer-events-none">
        {[...layout.notifications].map((notification) => (
          <Notification
            key={notification.key}
            layout={notification.layout}
            show={notification.show}
          >
            {notification.children}
          </Notification>
        ))}
      </div>
    </div>
  );
});

export default AdminTemplate;
