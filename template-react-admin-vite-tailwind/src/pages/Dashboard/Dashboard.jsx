import { Button, Level } from "components/atoms";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useStore } from "store";
import classes from "./home.module.css";

const Home = observer((props) => {
  const { layout } = useStore();
  useEffect(() => {
    layout.setCurrentPage("Dashboard");
  }, []);

  return (
    <>
      <div className={classes.main}>
        <div className="w-full text-center">
          <h1 className={classes.title}>Ready to Code!</h1>
          <h2 className={classes.subtitle}>
            React Admin Panel crafted by{" "}
            <strong className="text-green-600">Webeetle</strong>
          </h2>
        </div>
      </div>
      <Level className="justify-center mt-20">
        <Button color="green" onClick={() => layout.successNotification()}>
          Test Notification
        </Button>
        <Button
          color="gray"
          onClick={() =>
            layout.openAlert({
              onConfirm: () => layout.successNotification(),
              header: <strong>Alert</strong>,
              body: <p>Lorem ipsum dolor est esiqua...</p>,
            })
          }
        >
          Test Alert
        </Button>
        <Button
          color="blue"
          onClick={() =>
            layout.openConfirm({
              onConfirm: () => layout.successNotification(),
              onCancel: () => layout.errorNotification(),
              header: <strong>Confirm</strong>,
              body: <p>Lorem ipsum dolor est esiqua...</p>,
            })
          }
        >
          Test Confirm
        </Button>
      </Level>
    </>
  );
});

export default Home;
