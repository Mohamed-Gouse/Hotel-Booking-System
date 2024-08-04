import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "./services/Auth";
import InputField from "./components/InputField";
import CheckboxField from "./components/CheckboxField";
import "./assets/signIn.css";
import { useFormik } from "formik";

function SignIn() {
  const [signIn, setSignIn] = useState(true);
  const [errors, setErrors] = useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const initialValues = {
    full_name: "",
    username: "",
    email: "",
    role: "user",
    password: "",
    password2: "",
  };

  const onSubmit = async (values) => {
    console.log(values);
    if (signIn) {
      const response = await dispatch(signin(values));
      console.log("ROLE", response.user.role);
      if (response.user.role === "hotel") {
        navigation("/admin/dashboard");
      } else if (response.user.role === "admin") {
        navigation("/super/dashboard");
      } else if (response.user.role === "user") {
        navigation("/");
      } else {
        setErrors(response)
      }
    } else {
      const response = await signup(values);
      if (response.status) {
        setSignIn(!signIn);
        formik.resetForm;
      } else {
        console.log("errors", response);
        setErrors(response);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <React.Fragment>
      <div className="row align-items-center mx-auto p-3 background">
        <div className="col-md-5">
          <div className="card p-5 shadow-sm">
            <h4 className="text-center">{signIn ? "Sign In" : "Sign Up"}</h4>
            <hr />
            {errors && errors.detail && (
              <div className="alert alert-danger">
                <small className="small">{errors.detail}</small>
              </div>
            )}
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group my-1">
                <label>Username</label>
                <InputField
                  type={"text"}
                  name={"username"}
                  value={formik.values.username}
                  setValue={formik.handleChange}
                />
                {errors && errors.username && (
                  <small className="text-danger small">{errors.username}</small>
                )}
              </div>

              {!signIn && (
                <div className="form-row my-1">
                  <div className="col-md-6">
                    <label>Full Name</label>
                    <InputField
                      type={"text"}
                      name={"full_name"}
                      value={formik.values.full_name}
                      setValue={formik.handleChange}
                    />
                    {errors && errors.full_name && (
                      <small className="text-danger small">
                        {errors.full_name}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label>Email ID</label>
                    <InputField
                      type={"text"}
                      name={"email"}
                      value={formik.values.email}
                      setValue={formik.handleChange}
                    />
                    {errors && errors.email && (
                      <small className="text-danger small">
                        {errors.email}
                      </small>
                    )}
                  </div>
                </div>
              )}

              <div className="form-group my-1">
                <label>Password</label>
                <InputField
                  type={"password"}
                  name={"password"}
                  value={formik.values.password}
                  setValue={formik.handleChange}
                />
                {errors && errors.password && (
                  <small className="text-danger small">{errors.password}</small>
                )}
              </div>

              {!signIn && (
                <div className="form-group my-1">
                  <label>Confirm Password</label>
                  <InputField
                    type={"password"}
                    name={"password2"}
                    value={formik.values.password2}
                    setValue={formik.handleChange}
                  />
                  {errors && errors.password2 && (
                    <small className="text-danger small">
                      {errors.password2}
                    </small>
                  )}
                </div>
              )}

              {!signIn && (
                <div className="form-group my-1">
                  <CheckboxField
                    name={"role"}
                    value={formik.values.role}
                    setValue={formik.handleChange}
                  />
                  <label className="mx-1">Property owner</label>
                </div>
              )}
              <button
                type="submit"
                className="btn btn-color font-weight-bold btn-block mt-3 mb-2"
              >
                {signIn ? "Login" : "Signup"}
              </button>
            </form>
            <p
              className="text-right small"
              style={{ cursor: "pointer" }}
              onClick={() => setSignIn(!signIn)}
            >
              {signIn ? "Create new account!" : "Already have an account?"}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SignIn;
