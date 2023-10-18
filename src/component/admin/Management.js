import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './Management.css';

const columns = [

    {   id: 'name',
        label: 'Tên',
        minWidth: 150,
        align: 'center',
    },
    {   id: 'phone',
        label: 'Điện thoại',
        minWidth: 250,
        align: 'center',
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 250,
        align: 'center',
    },
    {
        id: 'auth',
        label: 'Kích hoạt',
        minWidth: 170,
        align: 'center',
    },
];



function CreateData() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/apiAccount/all")
            .then((res) => res.json())
            .then((data) => {
                setRows(data);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, []);
    console.log(rows);
    return rows; // Return the fetched data
}

export default function DataTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const data = CreateData(); // Fetch data using CreateData function

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div id="wrapper">
            <main id="page_content">
                <div className="hero" style={{ backgroundImage: 'url(../images/banner/analytics.jpg)' }}></div>
                <div className="under-hero container">
                    <div className="section">
                        <div className="mb-5 fs-6"><h3>Chào <span className="text-primary">Admin</span>, mừng bạn tới trang quản lý
                            </h3>
                            <p>Quản lý danh sách người dùng và bài hát.</p></div>
                        <div className="row g-4">
                            <div className="col-xl-5">
                                <div className="card bg-primary text-white">
                                    <div className="card-body fs-6">
                                        <div className="d-flex align-items-center mb-2"><h4
                                            className="text-white mb-0">Total
                                            Earnings</h4>
                                            <button type="button" className="btn btn-icon text-white ms-auto"><i
                                                className="ri-settings-fill"></i></button>
                                        </div>
                                        <p>Voluptatem ut, facilis ipsum, nostrum quia officia dolor mollitia temporibus
                                            hic
                                            aspernatur laborum.</p><span
                                        className="display-4 d-block mb-3">$126,457</span>
                                        <button type="button" className="btn btn-warning rounded-pill">Get Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-7">
                                <div className="row h-100">
                                    <div className="col-sm-4">
                                        <div className="card h-100">
                                            <div className="card-body"><h5>Tổng người dùng</h5>
                                                <div className="d-flex align-items-center text-dark"><i
                                                    className="ri-user-3-fill fs-5"></i>
                                                    <p className="fw-medium ps-2">10,245</p></div>
                                            </div>
                                            <div style={{height:160 + 'px'}}>
                                                <canvas id="total_user"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mt-4 mt-sm-0">
                                        <div className="card h-100">
                                            <div className="card-body"><h5>Tổng số bài hát</h5>
                                                <div className="d-flex align-items-center text-dark"><i
                                                    className="ri-music-fill fs-5"></i>
                                                    <p className="fw-medium ps-2">58,415</p></div>
                                            </div>
                                            <div style={{height:160 + 'px'}}>
                                                <canvas id="total_songs"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mt-4 mt-sm-0">
                                        <div className="card h-100 bg-warning">
                                            <div className="card-body"><h5 className="text-black">Purchases</h5>
                                                <div className="d-flex align-items-center text-black"><i
                                                    className="ri-currency-fill fs-5"></i>
                                                    <p className="fw-medium ps-2">11,012,547</p></div>
                                            </div>
                                            <div style={{height:160 + 'px'}}>
                                                <canvas id="purchases"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card h-100">
                                    <div className="card-header"><h5 className="mb-0">Danh sách người dùng</h5></div>
                                    <div className="card-body">

                                         <span className="border">
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ minHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'auth' ? (row[column.id] ?
                                                        <a className="fa-sharp fa-solid fa-circle-check fa-2xl" style={{ color: '#12f34a'}} >
                                                        </a> :
                                                        <a className="fa-solid fa-circle-xmark fa-2xl" style={{ color: '#da1010' }} >
                                                        </a>) : row[column.id]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </span>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card h-100">
                                    <div className="card-header"><h5 className="mb-0">Referrals</h5></div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item border-0 px-0 py-3"><p
                                                className="fs-4 mb-1 fw-semi-bold">
                                                3421</p>
                                                <p className="mb-2 fw-medium">Visits from Facebook</p>
                                                <div className="progress" style={{height:.25 + 'rem'}}>
                                                    <div className="progress-bar bg-primary" role="progressbar"
                                                         style={{width:80 + '%'}}
                                                         aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </li>
                                            <li className="list-group-item border-0 px-0 py-3"><p
                                                className="fs-4 mb-1 fw-semi-bold">
                                                2401</p>
                                                <p className="mb-2 fw-medium">Visits from Instagram</p>
                                                <div className="progress" style={{height:.25 + 'rem'}}>
                                                    <div className="progress-bar bg-danger" role="progressbar"
                                                         style={{width:67 + '%'}}
                                                         aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </li>
                                            <li className="list-group-item border-0 px-0 py-3"><p
                                                className="fs-4 mb-1 fw-semi-bold">
                                                975</p>
                                                <p className="mb-2 fw-medium">Visits from Twitter</p>
                                                <div className="progress" style={{height:.25 + 'rem'}}>
                                                    <div className="progress-bar bg-info" role="progressbar"
                                                         style={{width:31 + '%'}}
                                                         aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </li>
                                            <li className="list-group-item border-0 px-0 py-3"><p
                                                className="fs-4 mb-1 fw-semi-bold">
                                                1672</p>
                                                <p className="mb-2 fw-medium">Visits from Affiliates</p>
                                                <div className="progress" style={{height:.25 + 'rem'}}>
                                                    <div className="progress-bar bg-success" role="progressbar"
                                                         style={{width:52 + '%'}}
                                                         aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
