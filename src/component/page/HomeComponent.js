import React, {useEffect, useState} from 'react';
import SongList from "../player/SongList";
import TopSong from "../player/TopSong";
import accountService from "../api/AccountService/AccountService";
import TopPlaylist from "../playlist/TopPlaylist";
import {Link} from "react-router-dom";


const HomeComponent = () => {
    const [listAuthAccount, setListAuthAccount] = useState([]);

    useEffect(() => {
        accountService.getAllAccountByAuth().then(res => {
            setListAuthAccount(res.data);
        })
    }, [])

    return (
        <div>
            <div id="wrapper">
                <main id="page_content">
                    <div className="hero" style={{backgroundImage: "url(../../images/banner/home.jpg"}}></div>
                    <div className="under-hero container">
                        <div className="section">
                            <div className="section__head">
                                <div className="flex-grow-1"><span
                                    className="section__subtitle"></span>
                                    <h3 className="mb-0">Mới <span className="text-primary">phát hành</span></h3>
                                </div>
                                <Link to={"/song/newSongList"}>
                                <p  className="btn btn-link">Xem toàn bộ</p>
                                </Link>
                            </div>
                            <div className="swiper-carousel swiper-carousel-button"
                                 style={{display: 'flex', flexWrap: 'nowrap'}}>
                                <SongList/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="section col-xl-6">
                                <div className="section__head">
                                    <div className="flex-grow-1"><h3 className="mb-0">Sự kiện <span
                                        className="text-primary">sắp diễn ra</span></h3>
                                    </div>
                                </div>
                                <div className="swiper-carousel">
                                    <div className="swiper" data-swiper-slides="2" data-swiper-autoplay="true">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div className="cover cover--round"><a href="event-details.html"
                                                                                       className="cover__image"><img
                                                    src="https://static.wixstatic.com/media/c1b317_793a917279554fe693ccd9c06c294cb8~mv2.webp"
                                                    alt="Event cover"/></a>
                                                    <div className="cover__foot mt-3 px-2"><p
                                                        className="cover__subtitle d-flex mb-2"><i
                                                        className="ri-map-pin-fill fs-6"></i> <span
                                                        className="ms-1 fw-semi-bold">26 Chương Dương,TP.HCM</span>
                                                    </p><a href="event-details.html" className="cover__title fs-6 mb-3">Clear
                                                        Watera Festival</a>
                                                        <div
                                                            className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-group">
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-3.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-4.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-5.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ps-1">24+</div>
                                                            </div>
                                                            <a href="https://ongvove.com/news/5-su-kien-am-nhac-sap-dien-ra-tai-tphcm-2023"
                                                               className="btn btn-sm btn-light-primary">Tham gia
                                                                ngay</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="cover cover--round"><a href="event-details.html"
                                                                                       className="cover__image"><img
                                                    src="https://ongvove.com/uploads/0000/42/2023/08/08/8wonder.jpg"
                                                    alt="Event cover"/></a>
                                                    <div className="cover__foot mt-3 px-2"><p
                                                        className="cover__subtitle d-flex mb-2"><i
                                                        className="ri-map-pin-fill fs-6"></i> <span
                                                        className="ms-1 fw-semi-bold">ViWonders Nha Trang</span>
                                                    </p>
                                                        <a href="https://ongvove.com/news/5-su-kien-am-nhac-sap-dien-ra-tai-tphcm-2023"
                                                           className="cover__title fs-6 mb-3">
                                                            Music Festival 8Wonder
                                                        </a>
                                                        <div
                                                            className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-group">
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb.jpg"
                                                                            alt=""/></div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-2.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-3.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ps-1">100+</div>
                                                            </div>
                                                            <a href="event-details.html"
                                                               className="btn btn-sm btn-light-primary">Tham gia
                                                                ngay</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide">
                                                <div className="cover cover--round"><a href="event-details.html"
                                                                                       className="cover__image"><img
                                                    src="https://ongvove.com/uploads/0000/42/2023/08/08/ntpmm.jpg"
                                                    alt="Event cover"/></a>
                                                    <div className="cover__foot mt-3 px-2"><p
                                                        className="cover__subtitle d-flex mb-2"><i
                                                        className="ri-map-pin-fill fs-6"></i> <span
                                                        className="ms-1 fw-semi-bold">Công viên Yên Sở, Hoàng Mai, Hà Nội</span>
                                                    </p><a
                                                        href="https://ongvove.com/news/5-su-kien-am-nhac-sap-dien-ra-tai-tphcm-2023"
                                                        className="cover__title fs-6 mb-3">Những thành phố mơ màng</a>
                                                        <div
                                                            className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-group">
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb.jpg"
                                                                            alt=""/></div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-2.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="avatar">
                                                                        <div className="avatar__image"><img
                                                                            src="images/users/thumb-3.jpg" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ps-1">40+</div>
                                                            </div>
                                                            <a href="https://ongvove.com/news/5-su-kien-am-nhac-sap-dien-ra-tai-tphcm-2023"
                                                               className="btn btn-sm btn-light-primary">Tham gia
                                                                ngay</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-pagination"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-1"></div>
                            <div className="section col-xl-5">
                                <div className="mat-tabs">
                                    <ul className="nav nav-tabs" id="songs_list" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <div className="flex-grow-1"><h3 className="mb-0">TOP 5</h3>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content mt-4" id="songs_list_content">
                                    <div className="tab-pane fade show active" id="trending_pane" role="tabpanel"
                                         aria-labelledby="trending" tabIndex="0">
                                        <TopSong/>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="section">
                            <div className="section__head">
                                <div className="flex-grow-1"><span
                                    className="section__subtitle">Những nghệ sỹ mới</span>
                                    <h3 className="mb-0">Nổi <span className="text-primary">bật</span></h3>
                                </div>
                                {/*<a href="artists.html" className="btn btn-link">View All</a>*/}
                            </div>
                            <div className="swiper-carousel swiper-carousel-button">
                                <div className="swiper" data-swiper-slides="6" data-swiper-autoplay="true">
                                    <div className="swiper-wrapper">
                                        {listAuthAccount && listAuthAccount.map((account) => (
                                            <div className="swiper-slide" key={account.id}>
                                                <div className="avatar avatar--xxl d-block text-center">
                                                    <div className="avatar__image">
                                                        <div>
                                                            <img src={account.img} alt=""/>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="avatar__title mt-3">{account.name}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="swiper-pagination"></div>
                                </div>
                            </div>
                        </div>
                        <TopPlaylist/>
                    </div>
                </main>
            </div>
            <div id="backdrop"></div>
        </div>
    );
};

export default HomeComponent;
