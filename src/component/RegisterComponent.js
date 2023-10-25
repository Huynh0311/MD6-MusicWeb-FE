import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from 'react-toastify';
import * as Yup from "yup";


const validateSchema = Yup.object().shape({
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận phải trùng khớp với mật khẩu')
        .required('Xác nhận mật khẩu không được để trống'),
});
const RegisterComponent = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const validatePassword = (value) => {
        let errorMessage = '';
        if (!value) {
            errorMessage = 'Mật khẩu phải có ít nhất 8 kí tự chữ và ít nhất 1 kí tự số';
        } else if (!/^(?=.*\d)[\w\d]{8,}$/.test(value)) {
            errorMessage = 'Mật khẩu phải có ít nhất 8 kí tự chữ và ít nhất 1 kí tự số';
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
        } else if (!/^[^\s].*[^\s]$/.test(value)) {
            errorMessage = 'Không được có dấu cách ở đầu và cuối';
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
            }}
                    validationSchema={validateSchema}
                    onSubmit={(values) => {
                        console.log(values)
                        axios.post('http://localhost:8080/api/auth/register', values, {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }).then(() => {
                            navigate('/login');
                            toast.success('Đăng kí thành công');
                        }).catch(error => {
                            console.log(error)
                            if(error.response.status === 409){
                                toast.error(error.response.data);
                            }else {
                                toast.error("Đăng kí thất bại");
                            }
                        })
                    }}>
                <Form>
                    <div id="wrapper">
                        <div className="auth py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-5 col-lg-7 col-md-9 col-sm-11 modal-login">
                                        <div className="card">
                                            <div className="card-body p-sm-5"><h4>Đăng kí <span
                                                className="text-primary"></span></h4>
                                                <p className="fs-6">Đã đến lúc tham gia Nghe và có được trải nghiệm âm nhạc tuyệt vời.</p>
                                                <div className="mb-3"><label htmlFor="email"
                                                                             className="form-label fw-medium">Email</label>
                                                    <Field type="text" id="email" className="form-control"
                                                           name={'email'} validate={validateEmail}/>
                                                    <span style={{color: "red"}}><ErrorMessage name="email"
                                                                                               component="div"
                                                                                               className="error-message"/>  </span>
                                                </div>
                                                <div className="mb-3"><label htmlFor="c_password"
                                                                             className="form-label fw-medium">Tên người dùng
                                                </label> <Field type="text" id="name"
                                                                name={'name'}
                                                                className="form-control" validate={validateName}/></div>
                                                <span style={{color: "red"}}><ErrorMessage name="name"
                                                                                           component="div"
                                                                                           className="error-message"/>  </span>
                                                <div className="mb-2">
                                                    <label htmlFor="password" className="form-label fw-medium">
                                                        Mật khẩu
                                                    </label>
                                                    <Field type="password" id="password" name="password"
                                                           className="form-control" validate={validatePassword}/>
                                                    <span style={{color: 'red'}}><ErrorMessage name="password"
                                                                                               component="div"
                                                                                               className="error-message"/></span>
                                                </div>
                                                <div className="mb-2"><label htmlFor="password"
                                                                             className="form-label fw-medium">Xác nhận mật khẩu
                                                    </label>
                                                    <Field type="password" id="confirmPassword" name="confirmPassword"
                                                           className="form-control"/>
                                                </div>
                                                <span style={{color: "red"}}><ErrorMessage name="confirmPassword"
                                                                                           component="div"
                                                                                           className="error-message"></ErrorMessage> </span>
                                                <div className="mb-3"><label htmlFor="phone"
                                                                             className="form-label fw-medium">Số điện thoại                                                </label> <Field type="text" id="phone" name={'phone'}
                                                                className="form-control" validate={validatePhone}/>
                                                    <span style={{color: "red"}}><ErrorMessage name="phone"
                                                                                               component="div"
                                                                                               className="error-message"/> </span>
                                                </div>
                                                <div className="mb-5">
                                                    <button id="btn-form" className="btn btn-primary w-100">Đăng kí
                                                    </button>
                                                </div>
                                                <p>Bạn đã có tài khoản?<br/><Link to={'/login'}
                                                                                     className="fw-medium external">Đăng nhập</Link>
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