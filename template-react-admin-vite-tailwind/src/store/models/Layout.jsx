import { types } from "mobx-state-tree";
import React from "react";

const Layout = types
  .model({
    sidebar: types.maybe(types.frozen({})),
    confirm: types.maybe(types.frozen({})),
    alert: types.maybe(types.frozen({})),
    notifications: types.array(types.frozen({})),
    currentPage: types.maybe(types.string),
  })
  .actions((self) => ({
    setCurrentPage(name) {
      self.currentPage = name;
    },
    openConfirm(props = {}) {
      self.confirm = { ...self.confirm, ...props, isOpen: true };
    },
    closeConfirm() {
      self.confirm = {
        isOpen: false,
        header: null,
        body: null,
        onCancel: async () => {},
        onConfirm: async () => {},
      };
    },
    openAlert(props = {}) {
      self.alert = { ...self.alert, ...props, isOpen: true };
    },
    closeAlert() {
      self.alert = {
        isOpen: false,
        header: null,
        body: null,
        onConfirm: async () => {},
      };
    },
    toggleSidebar() {
      const sidebar = { ...self.sidebar };
      sidebar.open = !sidebar.open;
      self.sidebar = sidebar;
    },
    setNotifications(notifications) {
      self.notifications = notifications;
    },
    addNotification(obj = {}) {
      self.notifications.push({ ...obj, show: false });
      setTimeout(() => {
        const notifications = [...self.notifications];
        const index = notifications.findIndex((it) => it.key === obj.key);
        const not = { ...notifications[index] };
        not.show = true;
        notifications[index] = not;
        self.setNotifications([...notifications]);
      }, 10);
      setTimeout(() => {
        const notifications = [...self.notifications];
        const index = notifications.findIndex((it) => it.key === obj.key);
        const not = { ...notifications[index] };
        not.show = false;
        notifications[index] = not;
        self.setNotifications([...notifications]);
      }, 3000);
      setTimeout(() => {
        const notifications = [...self.notifications];
        const index = notifications.findIndex((it) => it.key === obj.key);
        const not = { ...self.notifications[index] };
        self.removeNotification(not);
      }, 3500);
    },
    successNotification(mex = "Success, operation done") {
      self.addNotification({
        key: "k" + Math.floor(Math.random() * 100000),
        layout: "success",
        children: <div>{mex}</div>,
      });
    },
    errorNotification(mex = "Ops, something went wrong!") {
      self.addNotification({
        key: "k" + Math.floor(Math.random() * 100000),
        layout: "error",
        children: <div>{mex}</div>,
      });
    },
    removeNotification(obj) {
      self.notifications = self.notifications.filter(
        (not) => not.key !== obj.key
      );
    },
  }));

export default Layout;
