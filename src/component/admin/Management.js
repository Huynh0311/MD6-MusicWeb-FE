import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './Management.css';
import _ from 'lodash';
import Tooltip from "@mui/material/Tooltip";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const userColumns = [
    {id: 'name', label: 'Tên', minWidth: 150,maxHeight:50, align: 'center',},
    {id: 'phone', label: 'Điện thoại', minWidth: 250, align: 'center',},
    {id: 'email', label: 'Email', minWidth: 250, align: 'center',},
    {id: 'auth', label: 'Kích hoạt', minWidth: 170, align: 'center',},
];

const singerColumns = [
    {id: 'id', label: 'STT', minWidth: 100, align: 'center',},
    {id: 'nameSinger', label: 'Ca sĩ ', minWidth: 200, align: 'center',},
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function GetUserList() {
    const [userRows, setUserRows] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/apiAccount/all")
            .then((res) => res.json())
            .then((data) => {
                setUserRows(data);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, []);
    return userRows; // Return the fetched data
}

function GetSingerList() {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/admin/singerquantity")
            .then((res) => res.json())
            .then((data) => {
                setRows(data);
                console.log(data)
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, []);
    return rows;
}

function GetUserQuantity() {
    const [userQuantity, setUserQuantity] = useState(0);

    useEffect(() => {
        fetch("http://localhost:8080/admin/userquantity")
            .then((res) => res.json())
            .then((resp) => {
                setUserQuantity(resp);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, 0);
    return userQuantity;
}

function GetSongQuantity() {
    const [songQuantity, setSongQuantity] = useState(0);

    useEffect(() => {
        fetch("http://localhost:8080/admin/songquantity")
            .then((res) => res.json())
            .then((resp) => {
                setSongQuantity(resp);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, 0);
    return songQuantity;
}


export default function DataTable() {
    const [pageUser, setPageUser] = useState(0);
    const [rowsPerPageUser, setRowsPerPageUser] = useState(10);
    const [pageSinger, setPageSinger] = useState(0);
    const [rowsPerPageSinger, setRowsPerPageSinger] = useState(10);
    const data = GetUserList(); // Fetch data using CreateData function
    const dataUser = GetUserQuantity();
    const dataSong = GetSongQuantity();
    const dataSinger = GetSingerList();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePageUser = (event, newPage) => {
        setPageUser(newPage);
    };

    const handleChangeRowsPerPageUser = (event) => {
        setRowsPerPageUser(+event.target.value);
        setPageUser(0);
    };

    const handleChangePageSinger = (event, newPage) => {
        setPageUser(newPage);
    };

    const handleChangeRowsPerPageSinger = (event) => {
        setRowsPerPageSinger(+event.target.value);
        setPageSinger(0);
    };


    return (
        <>
            <div id="wrapper">
                <main id="page_content">
                    <div className="hero" style={{backgroundImage: 'url(../images/banner/analytics.jpg)'}}></div>
                    <div className="under-hero container">
                        <div className="section">
                            <div className="mb-5 fs-6"><h3>Chào <span className="text-primary">Admin</span>, mừng bạn
                                tới trang quản lý
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
                                            <p>Voluptatem ut, facilis ipsum, nostrum quia officia dolor mollitia
                                                temporibus
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
                                                        {<p className="fw-medium ps-2">{dataUser}</p>}</div>
                                                </div>
                                                <div style={{height: 160 + 'px'}}>
                                                    <canvas id="total_user"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 mt-4 mt-sm-0">
                                            <div className="card h-100">
                                                <div className="card-body"><h5>Tổng số bài hát</h5>
                                                    <div className="d-flex align-items-center text-dark"><i
                                                        className="ri-music-fill fs-5"></i>
                                                        <p className="fw-medium ps-2">{dataSong}</p></div>
                                                </div>
                                                <div style={{height: 160 + 'px'}}>
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
                                                <div style={{height: 160 + 'px'}}>
                                                    <canvas id="purchases"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card h-100">
                                        <div className="card-header"><h5 className="mb-0">Danh sách người dùng</h5>
                                        </div>
                                        <div className="card-body">

                                         <span className="border">
                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{minHeight: 440}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {userColumns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data
                                    .slice(pageUser * rowsPerPageUser, pageUser * rowsPerPageUser + rowsPerPageUser)
                                    .map((row) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {userColumns.map((column) => (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'auth' ? (row[column.id] ?
                                                        <a className="fa-sharp fa-solid fa-circle-check fa-2xl"
                                                           style={{color: '#12f34a'}}>
                                                        </a> :
                                                        <Button className="auth-button"
                                                           style={{color: '#da1010'}} onClick={handleClickOpen}>
                                                            <i className="fa-solid fa-circle-xmark fa-2xl"></i>
                                                        </Button>) : row[column.id]}
                                                    <Dialog
                                                        open={open}
                                                        TransitionComponent={Transition}
                                                        keepMounted
                                                        onClose={handleClose}
                                                        aria-describedby="alert-dialog-slide-description"
                                                    >
                                                        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText id="alert-dialog-slide-description">
                                                                Let Google help apps determine location. This means sending anonymous
                                                                location data to Google, even when no apps are running.
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleClose}>Disagree</Button>
                                                            <Button onClick={handleClose}>Agree</Button>
                                                        </DialogActions>
                                                    </Dialog>
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
                        rowsPerPage={rowsPerPageUser}
                        page={pageUser}
                        onPageChange={handleChangePageUser}
                        onRowsPerPageChange={handleChangeRowsPerPageUser}
                    />
                </Paper>
            </span>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card h-100">
                                        <div className="card-header"><h5 className="mb-0">Danh sách ca sĩ</h5></div>
                                        <div className="card-body">
                                            <span className="border">
                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{minHeight: 440,maxWidth: 350}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {singerColumns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataSinger
                                    .slice(pageSinger * rowsPerPageSinger, pageSinger * rowsPerPageSinger + rowsPerPageSinger)
                                    .map((row) => (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {singerColumns.map((column) => (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'auth' ? (row[column.id] ?
                                                        <a className="fa-sharp fa-solid fa-circle-check fa-2xl"
                                                           style={{color: '#12f34a'}}>
                                                        </a> :
                                                        <a className="fa-solid fa-circle-xmark fa-2xl"
                                                           style={{color: '#da1010'}}>
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
                        count={dataSinger.length}
                        rowsPerPage={rowsPerPageSinger}
                        page={pageSinger}
                        onPageChange={handleChangePageSinger}
                        onRowsPerPageChange={handleChangeRowsPerPageSinger}
                    />
                </Paper>
            </span>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
