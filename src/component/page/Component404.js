import React from 'react';

const Component404 = () => {
    return (
        <div>
            <div id="wrapper" className="vh-100">
                <div className="d-flex align-items-center justify-content-center h-100">
                    <div className="container text-center fs-5">
                        <div className="row">
                            <div className="col-xl-7 col-lg-9 col-lg-10 mx-auto"><h1 className="display-1 fw-bold">4<span
                                className="text-primary">0</span>4</h1>
                                <p>Xin lỗi! Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Thay đổi tên hoặc tạm thời không có sẵn</p><a href="/"
                                                                  className="btn btn-lg btn-primary rounded-pill external mt-5"
                                                                  style={{minWidth: "200px"}}>Go To Homepage</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Component404;