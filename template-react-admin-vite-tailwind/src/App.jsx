import React from "react";
import { observer } from "mobx-react-lite";
import AdminTemplate from "components/layout/AdminTemplate";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { mainRoutes } from "routing/router";

const App = observer(() => {
  return (
    <BrowserRouter>
      <AdminTemplate>
        <Switch>
          {mainRoutes.map((page) => (
            <Route key={page.key} {...page.props}>
              {page.component}
            </Route>
          ))}
        </Switch>
      </AdminTemplate>
    </BrowserRouter>
  );
});

export default App;
