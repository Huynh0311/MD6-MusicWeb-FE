import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import _ from 'lodash';
import accountService from "../api/AccountService/AccountService";
import {storage} from "../../firebase/Firebase";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {editAccount} from "../../redux/actions";

const validateSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Tên phải có ít nhất 5 ký tự')
        .max(50, 'Tên không được quá 50 kí tự')
        .required('Tên không được để trống'),
    email: Yup.string()
        .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Email không phù hợp')
        .max(50, 'Email không được quá 50 kí tự')
        .required('Email Không được để trống'),
    phone: Yup.string()
        .matches(/^\d{10}$/, 'Số điện thoại 10 kí tự và không chứa chữ')
        .required('Số điện thoại Không được để trống'),
});


const UpdateAccount = () => {
    const accountLogin = useSelector(state => state.account);
    const dispatch = useDispatch();
    const [account, setAccount] = useState({});

    const uploadImg = (even) => {
        if (!even.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
            toast.error('Thêm ảnh thất bại!');
        } else {
            if (even.target.files[0] == null) return;
            const imageRef = ref(storage, `images/${even.target.files[0].name + v4()}`);
            uploadBytes(imageRef, even.target.files[0]).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setAccount({...account, img: url});
                    previewSelectedImage(even.target.files[0]);
                    toast.success('Upload ảnh thành công');
                });
            });
        }
    }

    const previewSelectedImage = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewImageElement = document.getElementById("previewImage");
                if (previewImageElement) {
                    previewImageElement.src = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        findById();
    }, []);

    const findById = () => {
        accountService.findById(accountLogin.id)
            .then((acc) => {
                setAccount(acc.data);
            })
            .catch((error) => {
                toast.error('Lỗi không có dữ liệu');
            });
    };

    const ChangeInputAccountEdit = (e) => {
        const {name, value} = e.target;
        setAccount({...account, [name]: value});
    }

    return (
        <div>

            <div id="wrapper">
                <main id="page_content">
                    {!_.isEmpty(account) &&
                        <Formik
                            initialValues={{
                                name: account.name,
                                email: account.email,
                                phone: account.phone,
                            }}
                            validationSchema={validateSchema}
                            onSubmit={(values) => {
                                const data = {...values, img: account.img}
                                accountService.updateAccount(accountLogin.id, data).then((response) => {
                                    console.log(response)
                                    const dataLogin = {
                                        ...accountLogin,
                                        name:response.data.name,
                                        img:response.data.img,
                                        phone:response.data.phone
                                    }
                                    dispatch(editAccount(dataLogin));
                                    toast.success('Cập nhật thành công');
                                }).catch((error) => {
                                    toast.error('Cập nhật thất bại');
                                })
                            }}>
                            <Form>
                                <div className="hero" style={{backgroundImage: "url(../../images/banner/event.jpg)"}}></div>
                                <div className="under-hero container">
                                    <div className="section">
                                        <div className="plan bg-light">
                                            <div className="plan__data">
                                                <div className="px-4 pt-2 pe-xl-0 pt-sm-0 mt-4 mb-3 my-sm-0 w-100">
                                                    <div className="align-items-center mb-4">
                                                        <div className="row">
                                                            <div className="col-4 avatar avatar--xl">
                                                                <div className="avatar__image">
                                                                    <img src={account.img} id="previewImage"
                                                                         style={{width: "300px", height: "300px"}}/>
                                                                </div>
                                                            </div>
                                                            <div className="col-8">
                                                                <div className="col-sm-12 cursor mb-3 ps-2" style={{marginLeft: "36px"}}>
                                                                    <label htmlFor="image" style={{color: "red", fontSize:"15px", marginRight: "15px"}}
                                                                           className="form-label fw-medium">
                                                                        Chọn ảnh
                                                                    </label>
                                                                    <input type="file"
                                                                           className="btn btn-outline-primary"
                                                                           onChange={uploadImg}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-12 inputEdit mb-3">
                                                                    <div className="text-lable">
                                                                        <label htmlFor="l_name"
                                                                               className="form-label fw-medium">Email</label>
                                                                    </div>
                                                                    <Field type="email" id="l_name" name={"email"}
                                                                           className="form-control"
                                                                           onInput={ChangeInputAccountEdit}
                                                                           value={account.email} readOnly />
                                                                    <span style={{color: "red"}}><ErrorMessage
                                                                        name={'email'}></ErrorMessage></span>
                                                                </div>
                                                                <div className="col-sm-12 inputEdit mb-3">
                                                                    <div className="text-lable">
                                                                    <label htmlFor="name"
                                                                           className="form-label fw-medium">Tên</label>
                                                                    </div>
                                                                    <Field type="text" id="name" name={"name"}
                                                                           className="form-control"
                                                                           onInput={ChangeInputAccountEdit}
                                                                           value={account.name}/>
                                                                    <span style={{color: "red"}}><ErrorMessage
                                                                        name={'name'}></ErrorMessage></span>
                                                                </div>
                                                                <div className="col-sm-12 inputEdit mb-3">
                                                                    <div className="text-lable">
                                                                    <label htmlFor="d_name"
                                                                           className="form-label fw-medium">Số điện thoại</label>
                                                                    </div>
                                                                    <Field type={"text"} id="d_name" name={"phone"}
                                                                           className="form-control"
                                                                           onInput={ChangeInputAccountEdit}
                                                                           value={account.phone}/>
                                                                    <span style={{color: "red"}}><ErrorMessage
                                                                        name={'phone'}></ErrorMessage></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row g-4">
                                                        <div className="col-4"></div>
                                                        <div className="col-8"
                                                             style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                                            <button type="submit" className="btn btn-primary">
                                                                Cập nhật thông tin
                                                            </button>
                                                            <Link to={"/"}>
                                                                <p className="btn btn-secondary">
                                                                    Trở về trang chủ
                                                                </p>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    }
                </main>
            </div>
            <div id="backdrop"></div>
        </div>
    );
};

export default UpdateAccount;