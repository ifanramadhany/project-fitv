import React, {useEffect} from 'react';
import "../scss/_productDetailPage.scss"
import {Badge, Button, IconButton, Paper} from "@mui/material";
import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";
import colors from "../scss/_variables.module.scss";
import {cart_icon} from "../assets";
import Carousel from 'react-material-ui-carousel';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStore} from "../store";
import {numberWithCommas} from "../helpers/utils";
import {useCookies} from "react-cookie";

const ProductDetailPage = () => {
    const [cookies, setCookie] = useCookies(['dark_mode'])
    const darkMode = (
        cookies.dark_mode === "true"
    )
    const {detailItemData, allCheckoutItems} = useSelector((state: RootStore) => state.globalState);
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

    const BackIcon = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <g fill="none">
                <path fill="currentColor" d="m10.875 19.3l-6.6-6.6q-.15-.15-.213-.325Q4 12.2 4 12t.062-.375q.063-.175.213-.325l6.6-6.6q.275-.275.687-.288q.413-.012.713.288q.3.275.313.687q.012.413-.288.713L7.4 11h11.175q.425 0 .713.287q.287.288.287.713t-.287.712Q19 13 18.575 13H7.4l4.9 4.9q.275.275.288.7q.012.425-.288.7q-.275.3-.7.3q-.425 0-.725-.3Z"></path>
            </g>
        </SvgIcon>
    );

    const ButtonVariant = ({name}: any) => {
        return (
            <Button className="variant-button flex justify-center items-center">
                <span style={{color: darkMode? colors.blueBaseColorLighten : colors.blueBaseColorDarken}}>{name}</span>
            </Button>
        )
    }

    useEffect(() => {
        if(!detailItemData) toHomePage();
    }, [])

    return (
        <React.Fragment>
            {detailItemData && (
                <div style={{backgroundColor: darkMode? colors.blackBaseColor : colors.baseBackgroundColor}} className="container-product-detail-page">
                    <div className="product-detail-wrapper flex justify-between items-center">
                        <IconButton onClick={toHomePage}>
                            <BackIcon sx={{color: darkMode? colors.baseBackgroundColor : colors.blueBaseColorDarken, fontSize: "1.2em"}}/>
                        </IconButton>
                        <span style={{color: darkMode? colors.baseBackgroundColor : colors.blueBaseColorDarken}}>Detail Produk</span>
                        <IconButton style={{visibility: "hidden"}}>
                            <BackIcon sx={{color: darkMode? colors.baseBackgroundColor : colors.blueBaseColorDarken, fontSize: "1.2em"}}/>
                        </IconButton>
                    </div>
                    <div className="content-wrapper overflow-x-hidden overflow-y-auto">
                        <div className="image-carousel-wrapper flex justify-center items-center">
                            <Carousel animation={"slide"} autoPlay={false} indicatorContainerProps={{className: "indicator-image-carousel"}}
                                      className="image-carousel">
                                {detailItemData.imageUrls.map((imageUrl: string, index: number) => (
                                    <Paper key={index} className="flex justify-center items-center">
                                        <img src={imageUrl}
                                             alt="product"/>
                                    </Paper>
                                ))}
                            </Carousel>
                        </div>
                        <div className="price-per-pcs-wrapper">
                            <span style={{color: darkMode? colors.blueBaseColorLighten : colors.blueBaseColorDarken}} className="price">Rp. {numberWithCommas(detailItemData.price)} </span>
                            <span style={{color: darkMode? colors.baseBackgroundColor : colors.blackBaseColor}} className="per-pcs">/{detailItemData.form}</span>
                        </div>
                        <div className="product-title-wrapper">
                            <span style={{color: darkMode? colors.baseBackgroundColor : colors.blackBaseColor}}>{detailItemData.name}</span>
                        </div>
                        {detailItemData.variant && (
                            <div className="selecting-variant-wrapper flex items-start overflow-x-auto overflow-y-hidden">
                                {detailItemData.variant.variants.map((name: string, index: number) => (
                                    <ButtonVariant key={index} name={name} />
                                ))}
                            </div>
                        )}
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
                                    <span>Deskripsi</span>
                                    <span>:</span>
                                </div>
                                <div className="content flex justify-between items-center">
                                    <span>{detailItemData.description}</span>
                                </div>
                            </div>
                            <div className="field-content-wrapper flex">
                                <div className="field flex justify-between items-start">
                                    <span>Indikasi</span>
                                    <span>:</span>
                                </div>
                                <div className="content flex justify-between items-center">
                                    <span>-</span>
                                </div>
                            </div>
                            <div className="field-content-wrapper flex">
                                <div className="field flex justify-between items-start">
                                    <span>Efek Samping</span>
                                    <span>:</span>
                                </div>
                                <div className="content flex justify-between items-center">
                                    <span>-</span>
                                </div>
                            </div>
                            <div className="field-content-wrapper flex">
                                <div className="field flex justify-between items-start">
                                    <span>Nomor Izin Edar</span>
                                    <span>:</span>
                                </div>
                                <div className="content flex justify-between items-center">
                                    <span>{detailItemData.noIzinEdar}</span>
                                </div>
                            </div>
                            <div className="field-content-wrapper flex">
                                <div className="field flex justify-between items-start">
                                    <span>Di Produksi oleh</span>
                                    <span>:</span>
                                </div>
                                <div className="content flex justify-between items-center">
                                    <span>-</span>
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
            )}
        </React.Fragment>
    );
};

export default ProductDetailPage;
