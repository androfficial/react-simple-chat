import * as Yup from "yup";

export const validationJoining = Yup.object({
  roomId: Yup
    .number()
    .typeError("RoomID must contain only numbers.")
    .required("RoomID is required."),
  userName: Yup
    .string()
    .min(2, "Name must contain 2 or more characters.")
    .max(12, "Name must not contain 12 or more characters.")
    .required("Name is required."),
});

export const validationMessage = Yup.object({
  typingMessage: Yup
    .string()
    .max(30, "The message must be no more than 30 characters.")
});