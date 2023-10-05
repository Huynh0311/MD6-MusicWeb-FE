import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Field, Form, Formik} from "formik";

const RegisterComponent = ({setShowNavbar}) => {
    const navigate = useNavigate();
    useEffect(() => {
        setShowNavbar(false);
        return () => {
            setShowNavbar(true);
        };
    }, [setShowNavbar]);
    return (
        <div>
            <Formik initialValues={{
                email: '',
                name: '',
                password: '',
                phone: '',
                img: "",
                role: {
                    id : 1}
            }} onSubmit={(values) => {
                console.log(values)
                axios.post('http://localhost:8080/api/auth/register', values).then(() => {
                    navigate('/login')
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
                                                               name={'email'}/></div>
                                                    <div className="mb-3"><label htmlFor="c_password"
                                                                                 className="form-label fw-medium">Name
                                                    </label> <Field type="text" id="name"
                                                                    name={'name'}
                                                                    className="form-control"/></div>
                                                    <div className="mb-2"><label htmlFor="password"
                                                                                 className="form-label fw-medium">Password</label>
                                                        <Field type="password" id="password" name="password"
                                                               className="form-control"/>
                                                    </div>
                                                    <div className="mb-3"><label htmlFor="phone"
                                                                                 className="form-label fw-medium">Phone
                                                    </label> <Field type="text" id="phone" name={'phone'}
                                                                    className="form-control"/>
                                                    </div>
                                                    <div className="mb-5">
                                                        <button id="btn-form" className="btn btn-primary w-100">Save</button>
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

    );
};

export default RegisterComponent;