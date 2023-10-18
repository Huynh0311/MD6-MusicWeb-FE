import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import {signInWithPopup} from 'firebase/auth';
import {auth, provider} from "../firebase/Firebase";
import {useDispatch} from "react-redux";
import {saveAccount} from "../redux/actions";

const LoginComponent = () => {
    const [value,setValue] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((data) =>{
            localStorage.setItem("token",data.user.accessToken)
            setValue(data.user.email)
            const values = {
                email : data.user.email,
                name : data.user.displayName,
                password : '',
                img: "https://nhadepso.com/wp-content/uploads/2023/03/cap-nhat-50-hinh-anh-dai-dien-facebook-mac-dinh-dep-doc-la_1.jpg",
                role: {
                    id: 1
                }
            };
            axios.post('http://localhost:8080/api/auth/check',values).then(re => {
                const data = JSON.stringify(re.data);
                localStorage.setItem("data",data)
                dispatch(saveAccount(re.data));
                navigate('/')
                window.location.reload()
                console.log(data)
            }).catch(er=>{
               axios.post('http://localhost:8080/api/auth/register', er.response.data)
                    .then(response => {
                        const data = JSON.stringify(response.data);
                        localStorage.setItem("data",data)
                        dispatch(saveAccount(response.data));
                        navigate('/');
                        window.location.reload()
                    })
                    .catch(error => {
                        toast.error('Đăng nhập thất bại');
                    })
            })
        })
    };
    useEffect(() => {
       setValue(localStorage.getItem('email'))
    }, []);

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
                axios.post('http://localhost:8080/api/auth/login', values, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer <token>',
                    }
                }).then(res => {
                    const data = JSON.stringify(res.data);
                    localStorage.setItem("data", data);
                    navigate("/")
                    window.location.reload()
                }).catch(error => {
                    toast.error('Đăng nhập thất bại!');
                })
            }}>
                <Form>
                    <div id="wrapper">
                        <div className="auth py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-5 col-lg-7 col-md-9 col-sm-11 modal-login">
                                        <div className="card">
                                           <span style={{display:"flex"}}><Link to={'/'} style={{display:"flex", margin: "30px 0 0 30px"}}>
                                              <i className="ri-home-4-line"></i>
                                               <p>Trang chủ</p>
                                           </Link></span>
                                            <div className="card-body p-sm-5 mgt-2"><h4>Đăng nhập<span
                                                className="text-primary"></span></h4>
                                                <p className="fs-6"></p>
                                                <div className="mb-3"><label htmlFor="email"
                                                                             className="form-label fw-medium">Email</label>
                                                    <Field type="text" id="email" name={'email'}
                                                           className="form-control" validate={validateEmail}/> <span
                                                        style={{color: "red"}}><ErrorMessage name="email"
                                                                                             component="div"
                                                                                             className="error-message"/>  </span>
                                                </div>
                                                <div className="mb-2"><label htmlFor="password"
                                                                             className="form-label fw-medium">Mật khẩu</label>
                                                    <Field type="password" id="password" className="form-control"
                                                           name={'password'} validate={validatePassword}/> <span
                                                        style={{color: "red"}}><ErrorMessage name="email"
                                                                                             component="div"
                                                                                             className="error-message"/>  </span>
                                                </div>
                                                <div className="mb-5">
                                                    <button type="submit" className="btn btn-primary w-100">Đăng nhập
                                                    </button>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="auth__or mx-auto fw-medium"></div>
                                                </div>
                                                <div className="mb-5"><button onClick={signInWithGoogle}
                                                                         className="btn btn-default w-100">
                                                    <div className="btn__wrap"><i className="ri-google-fill"></i><span
                                                        className="ms-2">Đăng nhập bằng tài khoản Google</span>
                                                    </div>
                                                </button></div>
                                                <p>Bạn chưa có tài khoản?<br/><Link to={'/register'}
                                                                                 className="fw-medium external">Đăng kí</Link>
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