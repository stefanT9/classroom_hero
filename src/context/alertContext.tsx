import React, { createContext, useContext, useState } from "react";
import { IconButton, Collapse } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import { v4 } from "uuid";
interface IAlertContext {
  openAlert: (message: string, severity: AlertSeverity) => any;
}
interface IAlert {
  open: boolean;
  message: string;
  severity: AlertSeverity;
  id: string;
}
type AlertSeverity = "error" | "warning" | "info" | "success";

export const AlertContext = createContext<IAlertContext>({
  openAlert: (message: string, severity: AlertSeverity) => {},
});

export const AlertStore = (props: any) => {
  const [alerts, setAlerts] = useState<Array<IAlert>>([]);
  const openAlert = (message: string, severity: AlertSeverity) => {
    const id = v4();
    setAlerts((prev) => [...prev, { message, severity, open: true, id }]);
    setTimeout(() => {
      setAlerts((prev) =>
        prev.map((val) =>
          val.id === id ? { ...val, open: false } : { ...val }
        )
      );
      setTimeout(() => {
        setAlerts((prev) => prev.filter((val) => val.id !== id));
      }, 1000);
    }, 2000);
  };
  const closeAlert = (idx: number) => {
    setAlerts((prev) => prev.filter((_, idx2) => idx !== idx2));
  };
  return (
    <AlertContext.Provider value={{ openAlert }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          position: "absolute",
          top: "0.5rem",
          left: "0",
          right: "0",
          zIndex: 9999,
        }}
      >
        {alerts.map((alert, idx) => (
          <Collapse in={alert.open}>
            <Alert
              severity={alert.severity}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => closeAlert(idx)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {alert.message}
            </Alert>
          </Collapse>
        ))}
      </div>
      {props.children}
    </AlertContext.Provider>
  );
};
