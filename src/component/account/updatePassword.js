import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import accountService from "../api/AccountService/AccountService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";

const validateSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, 'Mật khẩu tối thiểu 8 kí tự. có cả chữ và số')
        .max(50, 'Mật khẩu không được quá 50 kí tự')
        .required('Mật khẩu cũ không được để trống'),
    password: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, 'Mật khẩu tối thiểu 8 kí tự. có cả chữ và số')
        .max(50, 'Mật khẩu không được quá 50 kí tự')
        .required('Mật khẩu không được để trống'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận phải trùng khớp với mật khẩu mới')
        .max(50, 'Mật khẩu không được quá 50 kí tự')
        .required('Xác nhận mật khẩu không được để trống'),
});


const UpdatePassword = () => {
    const [id, setId] = useState(JSON.parse(localStorage.getItem("data")).id);
    const navigate = useNavigate();
    const [account, setAccount] = useState({});

    const ChangeInputAccountEdit = (e) => {
        const {name, value} = e.target;
        setAccount({...account, [name]: value});
    }

    useEffect(() => {
        findById();
    }, [id]);

    const findById = () => {
        accountService.findById(id)
            .then((acc) => {
                setAccount(acc.data);
            })
            .catch((error) => {
                toast.error('Lỗi không lấy đuợc dữ liệu');
            });
    };

    return (
        <div>
            <div id="wrapper">
                <main id="page_content">
                    <Formik
                        initialValues={{
                            oldPassword: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={validateSchema}
                        onSubmit={(values) => {
                            accountService.updatePassword(account).then((response) => {
                                toast.success('Sửa mật khẩu thành công');
                            }).catch((error) => {
                                console.log(error)
                                if (error.response.status === 403) {
                                    toast.error("Mật khẩu cũ không chính xác");
                                } else {
                                    toast.error('Cập nhật thất bại');
                                }
                            })
                        }}>
                        <Form>
                            <div className="hero" style={{backgroundImage: "url(../../images/banner/event.jpg)"}}></div>
                            <div className="under-hero container">
                                <div className="section">
                                    <div className="plan bg-light">
                                        <div className="plan__data">
                                            <div className="px-4 pt-2 pe-xl-0 pt-sm-0 mt-4 mb-3 my-sm-0 w-100">
                                                <div className="row">
                                                    <div className="col-4 avatar avatar--xl">
                                                        <div className="avatar__image">
                                                            <img src={account.img} id="previewImage"
                                                                 style={{width: "250px", height: "250px"}}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-8">
                                                        <div className="col-sm-12 cursor mb-3 ps-2"
                                                             style={{marginLeft: "36px"}}>

                                                        </div>
                                                        <div className="col-sm-12 inputEdit mb-3">
                                                            <div className="text-lable">
                                                                <label htmlFor="name"
                                                                       className="form-label fw-medium">Mật khẩu
                                                                    cũ</label>
                                                            </div>
                                                            <Field type="password" id="password" name={"oldPassword"}
                                                                   className="form-control"
                                                                   onInput={ChangeInputAccountEdit}
                                                                   placeholder={"Nhập mật khẩu cũ"}
                                                            />
                                                            <span style={{color: "red"}}><ErrorMessage
                                                                name={'oldPassword'}></ErrorMessage></span>
                                                        </div>
                                                        <div className="col-sm-12 inputEdit mb-3">
                                                            <div className="text-lable">
                                                                <label htmlFor="name"
                                                                       className="form-label fw-medium">Mật khẩu
                                                                    mới</label>
                                                            </div>
                                                            <Field type="password" id="password" name={"password"}
                                                                   className="form-control"
                                                                   onInput={ChangeInputAccountEdit}
                                                                   placeholder={"Nhập mật khẩu Mới"}
                                                            />
                                                            <span style={{color: "red"}}><ErrorMessage
                                                                name={'password'}></ErrorMessage></span>
                                                        </div>
                                                        <div className="col-sm-12 inputEdit mb-3">
                                                            <div className="text-lable">
                                                                <label htmlFor="l_name"
                                                                       className="form-label fw-medium">Nhập lại mật
                                                                    khẩu</label>
                                                            </div>
                                                            <Field type="password" id="confirmPassword"
                                                                   name={"confirmPassword"}
                                                                   className="form-control"
                                                                   placeholder={"Xác nhận mật khẩu mới"}
                                                            />
                                                            <span style={{color: "red"}}><ErrorMessage
                                                                name={'confirmPassword'}></ErrorMessage></span>
                                                        </div>
                                                        <div className="col-12"
                                                             style={{display: 'flex', justifyContent: 'center'}}>
                                                            <button type=" " className="btn btn-primary"
                                                                    style={{marginRight: "140px"}}>
                                                                Cập nhật mật khẩu
                                                            </button>
                                                            <Link to={"/"}>
                                                                <p className="btn btn-secondary">
                                                                    Trở lại trang chủ
                                                                </p>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </main>
            </div>
            <div id="backdrop"></div>
        </div>
    );
};

export default UpdatePassword;
