import React from "react";
import Home from "pages/Dashboard/Dashboard";
import Http404 from "pages/Http404";
import { Redirect } from "react-router";

const mainRoutes = [
  {
    key: "Home",
    component: <Home />,
    props: { path: "/", exact: true },
  },
  {
    key: "Http404",
    component: <Http404 />,
    props: { path: "*" },
  },
];

const adminRoutes = [
  {
    key: "AdminTaskTypesDashboard",
    component: (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    ),
    props: { path: "/admin", exact: true },
  },
];

export { mainRoutes, adminRoutes };
