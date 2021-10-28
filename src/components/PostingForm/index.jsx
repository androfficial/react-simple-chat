import React from 'react';
import AppContext from '../../context/context';

import socket, { Types } from '../../socket/socket';

import { validationMessage } from '../../validationSchemes/validationSchemes';
import { useFormik } from 'formik';

import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import s from './s.module.scss';

const PostingForm = () => {
  const { roomId, userName, onAddMessage } = React.useContext(AppContext);

  const onSendMessage = (message) => {
    if (message.length > 0) {
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
      typingMessage: '',
    },
    validationSchema: validationMessage,
    onSubmit: ({ typingMessage }, { resetForm }) => {
      onSendMessage(typingMessage.trim());
      resetForm({ typingMessage: '' });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={s.form}>
      <TextField
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            formik.handleSubmit();
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
        multiline></TextField>
      <Button
        disabled={!formik.isValid}
        variant="contained"
        startIcon={<SendIcon />}
        type="submit"
        sx={{
          minWidth: '115px',
        }}>
        Send
      </Button>
    </form>
  );
};

export default PostingForm;