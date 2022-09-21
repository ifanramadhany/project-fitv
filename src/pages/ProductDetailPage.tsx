import React from 'react';
import "../scss/_productDetailPage.scss"
import {Badge, Button, IconButton, Paper} from "@mui/material";
import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";
import colors from "../scss/_variables.module.scss";
import {cart_icon} from "../assets";
import Carousel from 'react-material-ui-carousel';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStore} from "../store";

const ProductDetailPage = () => {
    const {darkMode} = useSelector((state: RootStore) => state.globalState);
    const navigate = useNavigate();
    const toHomePage = () => {
        navigate("/")
    }

    const ShareIcon = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path fill="currentColor"
                  d={"M18 22q-1.25 0-2.125-.875T15 " +
                      "19q0-.175.025-.363q.025-.187.075-.337l-7.05-4.1q-.425.375-.95.587Q6.575 15 6 " +
                      "15q-1.25 0-2.125-.875T3 12q0-1.25.875-2.125T6 9q.575 0 " +
                      "1.1.212q.525.213.95.588l7.05-4.1q-.05-.15-.075-.337Q15 5.175 15 " +
                      "5q0-1.25.875-2.125T18 2q1.25 0 2.125.875T21 5q0 1.25-.875 2.125T18 " +
                      "8q-.575 0-1.1-.213q-.525-.212-.95-.587L8.9 11.3q.05.15.075.337Q9 11.825 9 " +
                      "12t-.025.362q-.025.188-.075.338l7.05 4.1q.425-.375.95-.588Q17.425 16 18 " +
                      "16q1.25 0 2.125.875T21 19q0 1.25-.875 2.125T18 22Z"}></path>
        </SvgIcon>
    );

    const CartIcon = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <g fill="none">
                <path fill="currentColor" d="M18 15H7L5.5 6H21l-3 9z"></path>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 3h2l.5 3m0 0L7 15h11l3-9H5.5z"></path>
                <circle cx="8" cy="20" r="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth="2"></circle>
                <circle cx="17" cy="20" r="1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth="2"></circle>
            </g>
        </SvgIcon>
    );

    const ButtonVariant = () => {
        return (
            <Button className="variant-button flex justify-center items-center">
                <span style={{color: darkMode? colors.blueBaseColorLighten : colors.blueBaseColorDarken}}>VARIAN 100 ML</span>
            </Button>
        )
    }

    return (
        <div style={{backgroundColor: darkMode? colors.blackBaseColor : colors.baseBackgroundColor}} className="container-product-detail-page">
            <div className="product-detail-wrapper flex justify-center items-center">
                <span style={{color: darkMode? colors.baseBackgroundColor : colors.blueBaseColorDarken}}>Detail Produk</span>
            </div>
            <div className="content-wrapper overflow-x-hidden overflow-y-auto">
                <div className="image-carousel-wrapper flex justify-center items-center">
                    <Carousel animation={"slide"} autoPlay={false} indicatorContainerProps={{className: "indicator-image-carousel"}}
                              className="image-carousel">
                        <Paper className="flex justify-center items-center">
                            <img src="https://id-live-01.slatic.net/p/be5f06039301eecce288d1d4829d9e49.jpg"
                                 alt="product"/>
                        </Paper>
                        <Paper className="flex justify-center items-center">
                            <img src="https://cf.shopee.co.id/file/e575cceb61c5feb11f0c08a0ec298be2" alt="product"/>
                        </Paper>
                        <Paper className="flex justify-center items-center">
                            <img
                                src={"https://lzd-img-global.slatic.net/g/p/e48d9ac00c69f48bf9aac4a1f48f51f6.jpg" +
                                    "_720x720q80.jpg_.webp"}
                                alt="product"/>
                        </Paper>
                    </Carousel>
                </div>
                <div className="price-per-pcs-wrapper">
                    <span style={{color: darkMode? colors.blueBaseColorLighten : colors.blueBaseColorDarken}} className="price">Rp. 16.200 </span>
                    <span style={{color: darkMode? colors.baseBackgroundColor : colors.blackBaseColor}} className="per-pcs">/Botol</span>
                </div>
                <div className="product-title-wrapper">
                    <span style={{color: darkMode? colors.baseBackgroundColor : colors.blackBaseColor}}>DETTOL ANTISEPTIC LIQUID 45ML DETTOL ANTISEPTIC LIQUID 45M</span>
                </div>
                <div className="selecting-variant-wrapper flex items-start overflow-x-auto overflow-y-hidden">
                    <ButtonVariant />
                    <ButtonVariant />
                    <ButtonVariant />
                    <ButtonVariant />
                    <ButtonVariant />
                    <ButtonVariant />
                </div>
                <div style={{color: darkMode? colors.baseBackgroundColor : colors.blackBaseColor}} className="details-product-wrapper">
                    <div className="field-content-wrapper flex">
                        <div className="field flex justify-between items-start">
                            <span>Kategori</span>
                            <span>:</span>
                        </div>
                        <div className="content flex justify-between items-center">
                            <span>-</span>
                        </div>
                    </div>
                    <div className="field-content-wrapper flex">
                        <div className="field flex justify-between items-start">
                            <span>Dosis</span>
                            <span>:</span>
                        </div>
                        <div className="content flex justify-between items-center">
                            <span>-</span>
                        </div>
                    </div>
                    <div className="field-content-wrapper flex">
                        <div className="field flex justify-between items-start">
                            <span>Indikasi</span>
                            <span>:</span>
                        </div>
                        <div className="content flex justify-between items-center">
                            <span>Hand sanitizer atau cairan pembersih tangan yang digunakan untuk membunuh kuman secara cepat tanpa dibilas dengan air.</span>
                        </div>
                    </div>
                    <div className="field-content-wrapper flex">
                        <div className="field flex justify-between items-start">
                            <span>Efek Samping</span>
                            <span>:</span>
                        </div>
                        <div className="content flex justify-between items-center">
                            <span>Efek samping yang umum: iritasi, ruam, penglihatan kabur, mata berair, mual, muntah. Efek samping lain: dapat terjadi pada beberapa pasien, beri tahu dokter atau apoteker Anda sesegera mungkin jika Anda merasa tidak enak badan setelah minum obat</span>
                        </div>
                    </div>
                    <div className="field-content-wrapper flex">
                        <div className="field flex justify-between items-start">
                            <span>Nomor Izin Edar</span>
                            <span>:</span>
                        </div>
                        <div className="content flex justify-between items-center">
                            <span>PKD 202650602560</span>
                        </div>
                    </div>
                    <div className="field-content-wrapper flex">
                        <div className="field flex justify-between items-start">
                            <span>Di Produksi oleh</span>
                            <span>:</span>
                        </div>
                        <div className="content flex justify-between items-center">
                            <span>Reckitt Benckiser Indonesia</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="share-badge-add-cart-wrapper flex justify-between items-center">
                <IconButton className="share-icon-wrapper shadow-md flex justify-center items-center">
                    <ShareIcon sx={{color: colors.blueBaseColorDarken, fontSize: "1em"}}/>
                </IconButton>
                <IconButton className="badge-icon-wrapper shadow-md flex justify-center items-center">
                    <Badge badgeContent={1} color="error">
                        <CartIcon sx={{color: colors.blueBaseColorDarken, fontSize: "1em"}}/>
                    </Badge>
                </IconButton>
                <Button onClick={toHomePage} className="add-cart-button flex justify-center items-center">
                    <img className="cart-icon" src={cart_icon} alt="cart icon"/>
                    <span>Tambah ke keranjang</span>
                </Button>
            </div>
        </div>
    );
};

export default ProductDetailPage;
