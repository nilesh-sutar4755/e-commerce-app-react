import { FormEvent, useContext, useState } from "react";
import useRedirectUrl from "../../hooks/useRedirectUrl";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const SignIn = () => {
  const redirectTo = useRedirectUrl();
  const navigateTo = useNavigate();

  const { setAuthenticated } = useContext(AuthContext);

  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const validateFields = () => {
    let isFormValid = true;
    setError((prevError) => ({
      ...prevError,
      email: "",
      password: "",
    }));
    if (!formField.email.includes("@")) {
      setError((prevError) => ({
        ...prevError,
        email: "Invalid email input, should contain @ ",
      }));
      isFormValid = false;
    }
    if (formField.password.length < 7) {
      setError((prevError) => ({
        ...prevError,
        password: "Password should of minimum 7 chars long",
      }));
      isFormValid = false;
    }
    return isFormValid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      setAuthenticated(true);
      navigateTo(`${redirectTo || "/"}`);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-sm-12">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="my-3">
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              value={formField.email}
              onChange={(e) =>
                setFormField({ ...formField, email: e.target.value })
              }
            />
            {error.email && (
              <p className="alert alert-danger p-2 my-2">{error.email}</p>
            )}
          </div>
          <div className="my-3">
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <input
              id="password"
              type="text"
              className="form-control"
              value={formField.password}
              onChange={(e) =>
                setFormField({ ...formField, password: e.target.value })
              }
            />
            {error.password && (
              <p className="alert alert-danger p-2 my-2">{error.password}</p>
            )}
          </div>
          <div className="my-3">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
