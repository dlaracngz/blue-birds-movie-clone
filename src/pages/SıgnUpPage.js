import { useState, useEffect } from "react";
import { useAuth } from "../context/UserAuthContext";
import { Link } from "react-router-dom";

function SıgnUpPage() {
  const { error, signUp, currentUser } = useAuth();
  const [err, setErr] = useState("");
  const [backError, setBackError] = useState("");
  const [user, setUser] = useState({
    FullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (error) {
      setInterval(() => {
        setBackError("");
      }, 10000);
      setBackError(error);
    }
  }, [error, currentUser]);

  const userHandler = (e) => {
    const { name, value } = e.target;
    setUser((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, FullName } = user;
    if (
      email == "" ||
      password == "" ||
      confirmPassword == "" ||
      FullName == ""
    ) {
      setInterval(() => {
        setErr("");
      }, 10000);
      return setErr("please fill all the field");
    } else if (password != confirmPassword) {
      setInterval(() => {
        setErr("");
      }, 10000);
      return setErr("Password does not match");
    } else if (!password.length >= 6 || !confirmPassword.length >= 6) {
      setInterval(() => {
        setErr("");
      }, 10000);
      return setErr("Password must be greater than 6 length");
    } else {
      signUp(email, password, FullName);
      {
        currentUser &&
          setUser({
            FullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
      }
    }
  };
  return (
    <>
      <div className="h-screen relative flex flex-col justify-center items-center bg-[#10141e]">
        <div className="text-black absolute top-0 font-bold w-48 bg-white">
          {err
            ? err && <p className="error">{error}</p>
            : backError && <p className="error">{backError}</p>}
        </div>
        <form
          onSubmit={submitHandler}
          className="p-16 bg-white rounded-lg"
          id="signUp"
        >
          <h2 className="form-h2">Registration Form</h2>
          <div className="select-none">
            <input
              className="signUp-input"
              type="text"
              placeholder="UserName"
              name="FullName"
              value={user.FullName}
              onChange={userHandler}
            />
          </div>
          <div className="select-none">
            <input
              className="signUp-input"
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={userHandler}
            />
          </div>
          <div className="select-none">
            <input
              className="signUp-input"
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={userHandler}
            />
          </div>
          <div className="select-none">
            <input
              className="signUp-input"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={userHandler}
            />
          </div>
          <div className="select-none">
            <input
              type="submit"
              id="submit"
              value="Sıgn up"
              className="submit"
            />
          </div>
          <p className="select-none text-center">
            Already have an account?
            <Link to={"/logIn"}>{"login"}</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default SıgnUpPage;
