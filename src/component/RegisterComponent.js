import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from 'react-toastify';

const RegisterComponent = ({setShowNavbar}) => {
    const [errorMessage, setErrorMessage] = useState('');
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
            errorMessage = 'Mật khẩu phải có ít nhất 8 kí tự chữ và 1 kí tự số';
        } else if (!/^(?=.*\d).{8,}$/.test(value)) {
            errorMessage = 'Mật khẩu phải có ít nhất 8 kí tự chữ và 1 kí tự số';
        }
        return errorMessage;
    };
    const validateEmail = (value) => {
        let errorMessage = '';
        if (!value) {
            errorMessage = 'Email là bắt buộc';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errorMessage = 'Email không hợp lệ';
        }
        return errorMessage;
    };
    const validateName = (value) => {
        let errorMessage = '';
        if (!value) {
            errorMessage = 'Tên không được để trống';
        } else if (!/^(?=.*[a-zA-Z])[a-zA-Z0-9\s]*$/.test(value)) {
            errorMessage = 'Tên không được chứa kí tự đặc biệt và phải chứa ít nhất 1 chữ';
        }
        return errorMessage;
    };

    const validatePhone = (value) => {
        let errorMessage = '';
        if (!value) {
            errorMessage = 'Số điện thoại là bắt buộc';
        } else if (!/^0\d{9}$/.test(value)) {
            errorMessage = 'Số điện thoại không hợp lệ';
        }
        return errorMessage;
    };


    // const validateConfirmPassword = (value, { values }) => {
    //     let errorMessage = '';
    //     if (value !== values.password) {
    //         errorMessage = 'Mật khẩu xác nhận không khớp';
    //     }
    //     return errorMessage;
    // };
    return (
        <div>
            <Formik initialValues={{
                email: '',
                name: '',
                password: '',
                confirmPassword: '',
                phone: '',
                img: "https://img.lovepik.com/original_origin_pic/17/11/27/0f0628268c4abd9497d6b44f781c2d76.png_wh860.png",
                role: {
                    id: 1
                }
            }} onSubmit={(values) => {
                if (values.password !== values.confirmPassword) {
                    toast.error('Mật khẩu xác nhận không đúng', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    return;
                }
                axios.post('http://localhost:8080/api/auth/register', values, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    navigate('/login');
                    toast.success('🦄 Wow so easy!', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }).catch(error => {
                    toast.error('Ôi,hỏng!', {
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
                                            <div className="card-body p-sm-5"><h4>Register with <span
                                                className="text-primary">Listen</span></h4>
                                                <p className="fs-6">It's time to join with Listen and gain full awesome
                                                    music
                                                    experience.</p>
                                                <div className="mb-3"><label htmlFor="email"
                                                                             className="form-label fw-medium">Email</label>
                                                    <Field type="text" id="email" className="form-control"
                                                           name={'email'} validate={validateEmail}/>
                                                    <span style={{color: "red"}}><ErrorMessage name="email"
                                                                                               component="div"
                                                                                               className="error-message"/>  </span>
                                                </div>
                                                <div className="mb-3"><label htmlFor="c_password"
                                                                             className="form-label fw-medium">Name
                                                </label> <Field type="text" id="name"
                                                                name={'name'}
                                                                className="form-control" validate={validateName}/></div>
                                                <span style={{color: "red"}}><ErrorMessage name="name"
                                                                                           component="div"
                                                                                           className="error-message"/>  </span>
                                                <div className="mb-2">
                                                    <label htmlFor="password" className="form-label fw-medium">
                                                        Password
                                                    </label>
                                                    <Field type="password" id="password" name="password"
                                                           className="form-control" validate={validatePassword}/>
                                                    <span style={{color: 'red'}}><ErrorMessage name="password"
                                                                                               component="div"
                                                                                               className="error-message"/></span>
                                                </div>
                                                <div className="mb-2"><label htmlFor="password"
                                                                             className="form-label fw-medium">Confirm
                                                    Password</label>
                                                    <Field type="password" id="confirmPassword" name="confirmPassword"
                                                           className="form-control"/>
                                                </div>
                                                <span style={{color: "red"}}><ErrorMessage name="confirmPassword"
                                                                                           component="div"
                                                                                           className="error-message"></ErrorMessage> </span>
                                                <div className="mb-3"><label htmlFor="phone"
                                                                             className="form-label fw-medium">Phone
                                                </label> <Field type="text" id="phone" name={'phone'}
                                                                className="form-control" validate={validatePhone}/>
                                                    <span style={{color: "red"}}><ErrorMessage name="phone"
                                                                                               component="div"
                                                                                               className="error-message"/> </span>
                                                </div>
                                                <div className="mb-5">
                                                    <button id="btn-form" className="btn btn-primary w-100">Save
                                                    </button>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="auth__or mx-auto fw-medium"></div>
                                                </div>
                                                <p>Do you have an Account?<br/><Link to={'/login'}
                                                                                     className="fw-medium external">Login</Link>
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

    )
        ;
};

export default RegisterComponent;