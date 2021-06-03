import { createContext, useContext } from "react";

export const createStore = (root, snapshot, objToInject) => {
  return root.create(snapshot, objToInject);
  // onSnapshot(store, snapshot => console.log("Snapshot: ", snapshot));
};

const RootStoreContext = createContext(null);

export const Provider = RootStoreContext.Provider;

export const useStore = () => {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
};
