import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
//reducer
//actions
import { notificationActions } from "actions";

export default function SimpleSnackbar() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const notification = useSelector((state) => state.notification.notification);

  useEffect(() => {
    if (notification) setOpen(true);
  }, [notification]);

  const handleClose = (e, reason) => {
    if (reason === "clickaway") return;
    dispatch(notificationActions.resetNotification());
    setOpen(false);
  };
  if (!notification) return null;
  const { message, duration, type } = notification;
  return (
    <div className="snackbar">
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
