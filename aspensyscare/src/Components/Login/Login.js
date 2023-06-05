import styled from '@emotion/styled';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../Api/Api';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const LoginCont = styled('div')`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10003;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
`;
const BlurImg = styled('div')`
  width: 100%;
  height: 100%;
  position: absolute;
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;
const signupInitialvalue = {
    phone: "",
    email: "",
    password: "",
};
const loginInitialvalue = {
    phone: "",
    password: "",
};
const Login = ({ handelLogin }) => {
    // --------------------------work for password input visiable or hidden and open login /sign up-----------------------------------
    const [showPassword, setShowPassword] = React.useState(false);
    const [showSignup, setShowSignup] = React.useState(true);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const openSignup = (txt) => {
        setShowSignup(txt);
        handleClickShowPassword();
    };
    // --------------------------getting all user inputs for signup_user -----------------------------------
    const [signup, setSignUp] = useState(signupInitialvalue);
    const handleInputs = (values) => {
        setSignUp({ ...signup, [values.target.name]: values.target.value });
    };


    // --------------------------getting all user inputs for login_user -----------------------------------
    const [login, setLogin] = useState(loginInitialvalue);
    const handleloginInputs = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };
    // ---------------------------work for login user------------------------------------
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handelLoginuser = async (values) => {
        try {
            await dispatch(fetchUsers(values));
            handelLogin(false);
        } catch (error) {
            console.log(error.message);
        }
    };



    const LoginSchema = Yup.object().shape({
        phone: Yup.string()
            .min(1, "Not a Phone Number!")
            .max(10, "Too Long!")
            .required("Required"),
        password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
            .required("Required")
    });

    return (
        <LoginCont>
            <div class="max-w-7xl bg-[#F5F5F5] mx-auto relative p-8">
                <div class="absolute right-4 top-2 bg-red-500 w-8 h-8 rounded-full text-center text-xl text-white font-bold cursor-pointer" onClick={() => handelLogin(false)}>X</div>
                <img src="https://apsensyscare.com/aspensyscare.png" class="w-[80%] md:w-[40%] mb-10 mx-auto" alt="" />
                <div class="max-w-[90%] md:max-w-4xl mx-auto flex  justify-center flex-col">
                    <h2 class="font-semibold text-3xl mb-5">Sign in</h2>
                    <label for="email" class="text-xl mb-1">Enter Email or Mobile Number</label>
                    <input class="p-5 text-xl" type="text" />
                    <p class="py-8 max-w-xl text-xl">By continuing, you agree to Apsensys Care <a class="text-blue-800" href="">Terms of Use</a> and <a class="text-blue-800" href="">Privacy Policy</a></p>
                    <button class="border-2 border-[#0112FE] px-[50px] py-5 bg-[#0112FE] text-white mx-auto font-bold text-xl hover:bg-white hover:text-[#0112FE]">Continue</button>
                    <hr class="border-b my-10" />
                    <p class="text-xl">New to Apsensys Care?</p>
                    <a href="" class="my-10 border-[1px] p-5 text-center text-xl">Create your Apsensys Care account</a>
                </div>
            </div>
        </LoginCont>
    )
}

export default Login