import React from "react";
import AppContext from "../../context/context";

import socket, { Types } from "../../socket/socket";

import { validationMessage } from "../../validationSchemes/validationSchemes";
import { useFormik } from 'formik';

import { Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

import s from "./s.module.scss";

const PostingForm = () => {
  const { roomId, userName, onAddMessage } = React.useContext(AppContext);

  const onSendMessage = (message) => {
    if (message !== "") {
      socket.emit(Types.NEW_MESSAGE, {
        userName,
        roomId,
        text: message,
      });
      onAddMessage({ userName, text: message });
    }
  };

  const formik = useFormik({
    initialValues: {
      typingMessage: "",
    },
    validationSchema: validationMessage,
    onSubmit: (val, { resetForm }) => {
      onSendMessage(val.typingMessage);
      resetForm({ typingMessage: "" });
    },
  });

  return (
    <form className={s.form}>
      <TextField
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSendMessage();
          }
        }}
        variant="outlined"
        name="typingMessage"
        label="Write your message..."
        value={formik.values.typingMessage}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.typingMessage && Boolean(formik.errors.typingMessage)}
        helperText={formik.touched.typingMessage && formik.errors.typingMessage}
        rows="3"
        fullWidth
        multiline
      ></TextField>
      <Button
        onClick={formik.handleSubmit}
        disabled={!formik.isValid}
        variant="contained"
        startIcon={<SendIcon />}
        sx={{
          minWidth: "115px",
        }}
      >
        Send
      </Button>
    </form>
  );
};

export default PostingForm;