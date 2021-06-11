import React from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

const joinConferenceValidationSchema = yup.object({
  conferenceId: yup.string().required(),
});

export const JoinConferenceForm = (props: any) => {
  const history = useHistory();

  return <></>;
};
