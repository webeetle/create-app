import { types } from "mobx-state-tree";
import Layout from "store/models/Layout";

// Root Model
export const RootModel = types.model({
  layout: Layout,
});

// Initial Snapshot
export const snapshot = {
  layout: {
    sidebar: {
      open: false,
      width: 240,
      widthCollapsed: 80,
      // menu,
    },
    confirm: {
      isOpen: false,
      header: null,
      body: null,
      onCancel: async () => {},
      onConfirm: async () => {},
    },
    alert: {
      isOpen: false,
      header: null,
      body: null,
      onConfirm: async () => {},
    },
    notifications: [],
  },
  utility: {},
};
