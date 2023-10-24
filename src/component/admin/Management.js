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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { viVN } from '@mui/material/locale';

const userColumns = [
    {id: 'name', label: 'Tên', minWidth: 300, maxWidth:300, maxHeight:50, align: 'center',},
    {id: 'phone', label: 'Điện thoại', minWidth: 150, maxWidth:150, maxHeight:50,  align: 'center',},
    {id: 'email', label: 'Email', minWidth: 250, maxWidth:250, maxHeight:50, align: 'center',},
    {id: 'auth', label: 'Kích hoạt', minWidth: 100, maxHeight:50, align: 'center',},
];

const singerColumns = [
    {id: 'id', label: 'STT', minWidth: 100, align: 'center',},
    {id: 'nameSinger', label: 'Ca sĩ ', minWidth: 200, align: 'center',},
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const theme = createTheme(
    {
        palette: {
            primary: { main: '#1976d2' },
        },
    },
    viVN,
);

const ActiveUser = (iduser) => {
    fetch("http://localhost:8080/admin/auth/" + iduser, {
        method: "PUT"
    }).then((res) => {
        window.location.reload();
    }).catch((err) => {
        console.log(err.message)
    })
}


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

function GetSingerTop() {
    const [singerTop, setSingerTop] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/admin/singertop")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((data) => {
                setSingerTop(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, "");
    return singerTop;
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
    const dataSingerTop = GetSingerTop();

    const [selectedUserId, setSelectedUserId] = useState(null);

    const [open, setOpen] = useState(false);
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
                                                className="text-white mb-0">Xu hướng âm nhạc</h4>
                                                <button type="button" className="btn btn-icon text-white ms-auto"><i
                                                    className="ri-settings-fill"></i></button>
                                            </div>
                                            <p>Tìm hiểu, phân tích về xu hướng âm nhạc mới nhất.
                                                Cập nhật những bài hát hit trên thế giới.</p><span
                                            className="display-4 d-block mb-1" style={{color:'#146bf7'}}>.</span>
                                            <a href="https://www.billboard.com/charts/" target="_blank" rel="noopener noreferrer">
                                                <button className="custom-btn btn-9">Read More</button>
                                            </a>
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
                                                <div className="card-body"><h5 className="text-black">Ca sĩ nổi bật</h5>

                                                    <div className="d-flex align-items-center text-black">
                                                        <i className="ri-currency-fill fs-5"></i>
                                                        <p className="fw-medium ps-2">{dataSingerTop}</p></div>
                                                </div>
                                                <div style={{height: 130 + 'px', textAlign:'center'}}>
                                                    <i className="fa-light fa-user-crown fa-7x" style={{color: '#0c5fed'}}></i>
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
                                             <ThemeProvider theme={theme}>
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
                                                <TableCell key={column.id} align={column.align} >
                                                    {
                                                        column.id === 'auth' ? (row[column.id] ?
                                                        <a className="fa-sharp fa-solid fa-circle-check fa-2xl"
                                                           style={{color: '#12f34a'}}>
                                                        </a> :
                                                        <Button className="auth-button"
                                                                style={{color: '#da1010'}} onClick={() => {
                                                            setSelectedUserId(row.id);
                                                            handleClickOpen();
                                                        }}>
                                                            <i className="fa-solid fa-circle-xmark fa-2xl"></i>
                                                        </Button>) : row[column.id]
                                                    }
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))

                                }
                            </TableBody>

                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                                BackdropProps ={{ style: { backgroundColor: 'transparent' }, }}>

                                                        <DialogTitle>{"Bạn có muốn kích hoạt cho tài khoản này?"}</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText id="alert-dialog-slide-description">
                                                                Chủ sở hữu tài khoản sẽ được xác thực. Tên ca sĩ sẽ được
                                                                cho thêm vào danh sách.
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleClose}>Hủy</Button>
                                                            <Button onClick={() => {
                                                                if (selectedUserId) {
                                                                    ActiveUser(selectedUserId);
                                                            }
                                                            }}>Xác nhận</Button>
                                                        </DialogActions>
                                                    </Dialog>
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
                                                 </ThemeProvider>
            </span>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card h-100">
                                        <div className="card-header"><h5 className="mb-0">Danh sách ca sĩ</h5></div>
                                        <div className="card-body">
                                            <span className="border">
                                                 <ThemeProvider theme={theme}>
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
                                                     </ThemeProvider>
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
