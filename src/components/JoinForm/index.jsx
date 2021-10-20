import React from "react";

import { chatAPI } from "../../api/api";

import { setLoading } from "../../state/reducers/chat";

import { validationJoining } from "../../validationSchemes/validationSchemes";
import { useFormik } from "formik";

import { TextField, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoadingButton from '@mui/lab/LoadingButton';

import s from "./s.module.scss";

const JoinForm = ({ dispatch, isLoading, onLogin }) => {
  
  const onEnter = async (obj) => {
    dispatch(setLoading(true));
    await chatAPI.createRoom(obj);
    onLogin(obj);
  };

  const formik = useFormik({
    initialValues: {
      roomId: "",
      userName: "",
    },
    validationSchema: validationJoining,
    onSubmit: (values) => onEnter(values),
  });

  return (
    <div className={s.body}>
      <div className={s.top}>
        <div className={s.content_shell}>
          <img src="images/chat.gif" alt="Gif greeting" />
          <Typography
            variant="h4"
            component="h1"
            className={s.title}
            sx={{
              fontSize: "1.8rem",
              textTransform: "capitalize",
              marginLeft: "15px",
            }}
          >
            Join and chat
          </Typography>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className={s.form_login}>
        <div className={s.room_shell}>
          <TextField
            InputProps={{
              endAdornment: <MeetingRoomIcon color="primary" position="end"></MeetingRoomIcon>,
            }}
            varian="outlined"
            name="roomId"
            label="RoomID"
            value={formik.values.roomId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.roomId && Boolean(formik.errors.roomId)}
            helperText={formik.touched.roomId && formik.errors.roomId} 
            required={true}
            fullWidth
          />
        </div>
        <div className={s.name_shell}>
          <TextField
            InputProps={{
              endAdornment: <AccountCircleIcon color="primary" position="end"></AccountCircleIcon>,
            }}
            varian="outlined"
            name="userName"
            label="Name"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            required={true}
            fullWidth
          />
        </div>
        <div className={s.come_in_shell}>
          <LoadingButton
            disabled={isLoading || !(formik.isValid && formik.dirty)}
            loading={isLoading}
            variant="contained"
            type="submit"
            endIcon={<LoginIcon/ >}
            fullWidth
          >
            ENTER THE ROOM
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default JoinForm;