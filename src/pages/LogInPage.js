import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";

function LogInPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState("");
  const [backError, setBackError] = useState("");
  const { UserLogin } = useAuth();

  const navigate = useNavigate();

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
    const { email, password } = user;
    if (email == "" || password == "") {
      setInterval(() => {
        setError("");
      }, 5000);
      return setError("Fill all the field");
    }
    try {
      await UserLogin(email, password);
      navigate("/genres");
    } catch (error) {
      if (error.code == "auth/user-not-found") {
        setInterval(() => {
          setError("");
        }, 5000);
        return setError("User not found");
      } else if (error.code == "auth/wrong-password") {
        setInterval(() => {
          setError("");
        }, 5000);
        return setError("Wrong password");
      } else {
        setInterval(() => {
          setError("");
        }, 5000);
        return setError(`${error.message}`);
      }
    }
  };
  return (
    <>
      <div className="h-screen flex justify-center items-center bg-[#10141e]">
        {err
          ? err && <p className="error">{err}</p>
          : backError && <p className="error">{backError}</p>}
        <form
          className="p-16 bg-white rounded-lg"
          onSubmit={submitHandler}
          id="logIn"
        >
          <h2 className="form-h2">Login Form</h2>
          <div className="select-none">
            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={userHandler}
            />
          </div>
          <div className="select-none">
            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={userHandler}
            />
          </div>
          <div>
            <input type="submit" value="Login" className="submit" id="submit" />
          </div>
          <p className="text-center">
            Don't have an account? <Link to={"/signUp"}>{"signup"}</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default LogInPage;
