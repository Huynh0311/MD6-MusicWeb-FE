import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";

const LoginComponent = ({setShowNavbar}) => {
    const navigate = useNavigate();
    useEffect(() => {
        setShowNavbar(false);
        return () => {
            setShowNavbar(true);
        };
    }, [setShowNavbar]);
    const validatePassword = (value) => {
        let errorMessage = '';
        if (!value) {
            errorMessage = 'Chưa nhập mật khẩu';
        }
        return errorMessage;
    };
    const validateEmail = (value) => {
        let errorMessage = '';
        if (!value) {
            errorMessage = 'Chưa nhập email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errorMessage = 'Email không đúng định dạng';
        }
        return errorMessage;
    };
    return (
        <div>
            <Formik initialValues={{
                email: '',
                password: '',
            }} onSubmit={(values) => {
                console.log(values)
                axios.post('http://localhost:8080/api/auth/login', values, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer <token>',
                    }
                }).then(res => {
                    console.log(res.data)
                    const data = JSON.stringify(res.data);
                    localStorage.setItem("data", data);
                    navigate("/")
                    window.location.reload()
                }).catch(error => {
                    console.log(1)
                    toast.error('Đăng nhập thất bại', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
            }}>
                <Form>
                    <div id="wrapper">
                        <div className="auth py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-5 col-lg-7 col-md-9 col-sm-11 mx-auto">
                                        <div className="card">
                                           <span style={{display:"flex"}}><Link to={'/'} style={{display:"flex", margin: "30px 0 0 30px"}}>
                                              <i className="ri-home-4-line"></i>
                                               <p>Back to home</p>
                                           </Link></span>
                                            <div className="card-body p-sm-5"><h4>Login to <span
                                                className="text-primary">Listen</span></h4>
                                                <p className="fs-6">Welcome back! login with your data that you entered
                                                    during
                                                    registration</p>
                                                <div className="mb-3"><label htmlFor="email"
                                                                             className="form-label fw-medium">Email</label>
                                                    <Field type="text" id="email" name={'email'}
                                                           className="form-control" validate={validateEmail}/> <span
                                                        style={{color: "red"}}><ErrorMessage name="email"
                                                                                             component="div"
                                                                                             className="error-message"/>  </span>
                                                </div>
                                                <div className="mb-2"><label htmlFor="password"
                                                                             className="form-label fw-medium">Password</label>
                                                    <Field type="password" id="password" className="form-control"
                                                           name={'password'} validate={validatePassword}/> <span
                                                        style={{color: "red"}}><ErrorMessage name="password"
                                                                                             component="div"
                                                                                             className="error-message"/>  </span>
                                                </div>
                                                <div className="mb-5">
                                                    <button type="submit" className="btn btn-primary w-100">Save
                                                    </button>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="auth__or mx-auto fw-medium"></div>
                                                </div>
                                                <div className="mb-5"><a href="javascript:void(0);"
                                                                         className="btn btn-default w-100">
                                                    <div className="btn__wrap"><i className="ri-google-fill"></i><span
                                                        className="ms-2">Login with Google</span>
                                                    </div>
                                                </a></div>
                                                <p>Not registered yet?<br/><Link to={'/register'}
                                                                                 className="fw-medium external">Register</Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default LoginComponent;