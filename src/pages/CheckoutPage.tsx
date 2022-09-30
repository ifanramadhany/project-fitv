import React, {useEffect, useState} from 'react';
import "../scss/_checkoutPage.scss"
import {Box, Button, CircularProgress, Drawer, IconButton, Input, List, ListItemButton} from "@mui/material";
import colors from '../scss/_variables.module.scss';
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';
import {gojek, grab, jne, self_pickup, shipper_default, warning_icon} from "../assets";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../store";
import {ItemCheckoutComponent} from "../components";
import {setTotalEndPrice} from "../store/actions/global.action";
import {useCookies} from "react-cookie";

interface ITotal {
    totalAllItems: number;
    totalAllPrice: number;
}

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['dark_mode'])
    const darkMode = (
        cookies.dark_mode === "true"
    )
    const {allCheckoutItems, receiverDataG} = useSelector((state: RootStore) => state.globalState);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectingShipper, setSelectingShipper] = useState<boolean>(false);
    const [someItemsNotAvailable, setSomeItemsNotAvailable] = useState<boolean>(false);
    const [shippingData, setShippingData] = useState<string | undefined>();
    const [shippingPrice, setShippingPrice] = useState<number>(0);
    const [total, setTotal] = useState<ITotal>({
        totalAllItems: 0,
        totalAllPrice: 0
    })

    const toShippingAddressPage = () => {
        navigate("/shipping-address")
    }

    const toCheckoutSuccessPage = () => {
        setIsLoading(true)
        setTimeout(() => {
            const totalEndPriceLocal = shippingPrice + total?.totalAllPrice
            dispatch(setTotalEndPrice(totalEndPriceLocal))
            setIsLoading(false)
            navigate("/checkout-success")
        }, 1000)
    }

    const toHomePage = () => {
        setSomeItemsNotAvailable(false)
        navigate("/")
    }

    const openSelectingShipperDrawer = (open: boolean, data: string | undefined = undefined) => () => {
        if (data === "pickup") {
            setShippingData("pickup")
            setShippingPrice(0)
        }
        if (data === "gojek") {
            setShippingData("gojek")
            setShippingPrice(20000)
        }
        if (data === "grab") {
            setShippingData("grab")
            setShippingPrice(18000)
        }
        if (data === "jne") {
            setShippingData("jne")
            setShippingPrice(7000)
        }
        setSelectingShipper(open);
    }

    const openSomeItemsNotAvailableDrawer = (open: boolean) => () => {
        setSomeItemsNotAvailable(open);
    }

    const ArrowRightIcon = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path fill="currentColor"
                  d="M7.15 21.1q-.375-.375-.375-.888q0-.512.375-.887L14.475 12l-7.35-7.35q-.35-.35-.35-.875t.375-.9q.375-.375.888-.375q.512 0 .887.375l8.4 8.425q.15.15.213.325q.062.175.062.375t-.062.375q-.063.175-.213.325L8.9 21.125q-.35.35-.862.35q-.513 0-.888-.375Z"></path>
        </SvgIcon>
    );

    const InfoIcon = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path fill="currentColor"
                  d="M12 17q.425 0 .713-.288Q13 16.425 13 16v-4.025q0-.425-.287-.7Q12.425 11 12 11t-.712.287Q11 11.575 11 12v4.025q0 .425.288.7q.287.275.712.275Zm0-8q.425 0 .713-.288Q13 8.425 13 8t-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8t.288.712Q11.575 9 12 9Zm0 13q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"></path>
        </SvgIcon>
    );

    const CloseIcon = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path fill="currentColor"
                  d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path>
        </SvgIcon>
    );

    function numberWithCommas(price: number) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    useEffect(() => {
        let newTotalAllItems = 0
        let newTotalAllPrice = 0
        Object.entries(allCheckoutItems).map(([key, value]) => {
            newTotalAllItems += value.totalItems
            newTotalAllPrice += value.totalPrice
        })
        setTotal({
            totalAllItems: newTotalAllItems,
            totalAllPrice: newTotalAllPrice,
        })
        if (newTotalAllPrice < 10000) setSomeItemsNotAvailable(true)
    }, [allCheckoutItems]);

    return (
        <>
            {/*selecting shipper drawer*/}
            <Drawer
                anchor={"bottom"}
                open={selectingShipper}
                onClose={openSelectingShipperDrawer(false)}
                sx={{
                    "& .MuiPaper-root": {
                        borderTopLeftRadius: "1.5em",
                        borderTopRightRadius: "1.5em",
                        padding: "0.5em",
                        overflowX: "hidden",
                        overflowY: "auto",
                        backgroundColor: darkMode ? colors.blackBaseColor : colors.baseBackgroundColor
                    }
                }}
            >
                <Box
                    sx={{maxHeight: "auto"}}
                    onKeyDown={openSelectingShipperDrawer(false)}
                >
                    <div className="selecting-shipper-and-close-drawer-button flex justify-between items-center">
                        <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}>Pilih Pengiriman</span>
                        <IconButton onClick={openSelectingShipperDrawer(false)}>
                            <CloseIcon sx={{color: colors.grayBaseColor, fontSize: "1.1em"}}/>
                        </IconButton>
                    </div>
                    <List>
                        <ListItemButton onClick={openSelectingShipperDrawer(false, "pickup")}>
                            <button className="shipper-item-wrapper flex justify-center items-center">
                                <div className="image-wrapper flex justify-center items-center">
                                    <img src={self_pickup} alt="product"/>
                                </div>
                                <div className="text-wrapper flex flex-col justify-center items-start">
                                    <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                                          className="title-text">Ambil Sendiri</span>
                                    <span style={{
                                        color: darkMode ?
                                            colors.baseBackgroundColorGray :
                                            colors.grayBaseColor
                                    }} className="detail-shipper">Obat bisa diambil di Apotek sesuai dengan yang tertera di struk, <span
                                        style={{
                                            color: darkMode ?
                                                colors.baseBackgroundColorGray :
                                                colors.grayBaseColor
                                        }}
                                        className="bolder">tidak perlu bayar pengiriman</span></span>
                                </div>
                                <div className="selected-icon-wrapper flex justify-center items-center">
                                    {shippingData === "pickup" && (
                                        <CheckCircleIcon sx={{color: colors.blackBaseColor, fontSize: "1.5em"}}/>
                                    )}
                                </div>
                            </button>
                        </ListItemButton>

                        <ListItemButton onClick={openSelectingShipperDrawer(false, "grab")}>
                            <button className="shipper-item-wrapper flex justify-center items-center">
                                <div className="image-wrapper flex justify-center items-center">
                                    <img src={grab} alt="product"/>
                                </div>
                                <div className="text-wrapper flex flex-col justify-center items-start">
                                    <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                                          className="title-text">Grab Express</span>
                                    <div>
                                        <span
                                            style={{
                                                color: darkMode ?
                                                    colors.baseBackgroundColorGray :
                                                    colors.grayBaseColor
                                            }}
                                            className="shipping-estimate">Estimasi tiba 1-2 jam. Anda cukup bayar</span>
                                        <span style={{
                                            color: darkMode ?
                                                colors.baseBackgroundColorGray :
                                                colors.grayBaseColor
                                        }} className="shipping-price">Rp 18.000</span>
                                    </div>
                                </div>
                                <div className="selected-icon-wrapper flex justify-center items-center">
                                    {shippingData === "grab" && (
                                        <CheckCircleIcon sx={{color: colors.blackBaseColor, fontSize: "1.5em"}}/>
                                    )}
                                </div>
                            </button>
                        </ListItemButton>

                        <ListItemButton onClick={openSelectingShipperDrawer(false, "gojek")}>
                            <button className="shipper-item-wrapper flex justify-center items-center">
                                <div className="image-wrapper flex justify-center items-center">
                                    <img src={gojek} alt="product"/>
                                </div>
                                <div className="text-wrapper flex flex-col justify-center items-start">
                                    <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                                          className="title-text">Gojek Instant</span>
                                    <div>
                                        <span
                                            style={{
                                                color: darkMode ?
                                                    colors.baseBackgroundColorGray :
                                                    colors.grayBaseColor
                                            }}
                                            className="shipping-estimate">Estimasi tiba 1-2 jam. Anda cukup bayar</span>
                                        <span style={{
                                            color: darkMode ?
                                                colors.baseBackgroundColorGray :
                                                colors.grayBaseColor
                                        }} className="shipping-price">Rp 20.000</span>
                                    </div>
                                </div>
                                <div className="selected-icon-wrapper flex justify-center items-center">
                                    {shippingData === "gojek" && (
                                        <CheckCircleIcon sx={{color: colors.blackBaseColor, fontSize: "1.5em"}}/>
                                    )}
                                </div>
                            </button>
                        </ListItemButton>

                        <ListItemButton onClick={openSelectingShipperDrawer(false, "jne")}>
                            <button className="shipper-item-wrapper flex justify-center items-center">
                                <div className="image-wrapper flex justify-center items-center">
                                    <img src={jne} alt="product"/>
                                </div>
                                <div className="text-wrapper flex flex-col justify-center items-start">
                                    <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                                          className="title-text">JNE Reguler (2-5 hari)</span>
                                    <div>
                                        <span style={{
                                            color: darkMode ?
                                                colors.baseBackgroundColorGray :
                                                colors.grayBaseColor
                                        }} className="shipping-estimate">Estimasi tiba besok - 23 April. Biaya pengiriman</span>
                                        <span style={{
                                            color: darkMode ?
                                                colors.baseBackgroundColorGray :
                                                colors.grayBaseColor
                                        }} className="shipping-price">Rp 7.000</span>
                                    </div>
                                </div>
                                <div className="selected-icon-wrapper flex justify-center items-center">
                                    {shippingData === "jne" && (
                                        <CheckCircleIcon sx={{color: colors.blackBaseColor, fontSize: "1.5em"}}/>
                                    )}
                                </div>
                            </button>
                        </ListItemButton>

                    </List>
                </Box>
            </Drawer>

            {/*some items not available drawer */}
            <Drawer
                anchor={"bottom"}
                open={someItemsNotAvailable}
                sx={{
                    "& .MuiPaper-root": {
                        borderTopLeftRadius: "1.5em",
                        borderTopRightRadius: "1.5em",
                        padding: "0.5em",
                        overflowX: "hidden",
                        overflowY: "auto",
                        backgroundColor: darkMode ? colors.blackBaseColor : colors.baseBackgroundColor
                    }
                }}
            >
                <Box
                    sx={{maxHeight: "auto"}}
                    onKeyDown={openSomeItemsNotAvailableDrawer(false)}
                >
                    <div className="selecting-shipper-and-close-drawer-button flex justify-end items-center">

                    </div>
                    <div className="image-warning-wrapper flex justify-center items-center">
                        <img src={warning_icon} alt="product"/>
                    </div>
                    <div className="main-text-wrapper flex justify-center items-center">
                        <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}>Mohon maaf, total belanja anda kurang dari Rp. 10.000!</span>
                    </div>
                    <div className="items-not-available-wrapper flex flex-col justify-center items-center">
                        {/*here is list items are not available */}
                        {/*<span className="item-not-available">Fituno Blister Suplement 30 Kaplet</span>*/}
                        {/*<span className="item-not-available">Fituno Blister Suplement 30 Kaplet</span>*/}
                        {/*<span className="item-not-available">Fituno Blister Suplement 30 Kaplet</span>*/}
                        {/*<span className="item-not-available">Fituno Blister Suplement 30 Kaplet</span>*/}
                    </div>
                    <div className="next-button-wrapper flex justify-center items-center">
                        <Button onClick={toHomePage} className="next-button">
                            <span>Kembali ke Halaman Utama</span>
                        </Button>
                    </div>
                </Box>
            </Drawer>

            <div style={{backgroundColor: darkMode ? colors.blackBaseColor : colors.baseBackgroundColor}}
                 className="container-checkout-page flex flex-col overflow-y-auto overflow-x-hidden">
                <div className="overflow-y-auto overflow-x-hidden">
                    <div className="shipping-address flex flex-col justify-center items-center">
                        <div style={{backgroundColor: darkMode ? colors.blackBaseColor : colors.baseBackgroundColor}}
                             className="edit-shipping-address flex justify-between items-center">
                            <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}>Alamat Pengiriman</span>
                            <Button onClick={toShippingAddressPage} className="change-address-button">
                                <span style={{
                                    color: darkMode ?
                                        colors.blueBaseColorLighten :
                                        colors.blueBaseColor
                                }}>Ubah</span>
                            </Button>
                        </div>
                        <div className="receiver-detail flex flex-col justify-center items-center">
                            <div className="receiver-name">
                                <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                                      className="name">{receiverDataG.receiverName}</span>
                                <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                                      className="divider-receiver-name">-</span>
                                <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                                      className="phone-number">{receiverDataG.receiverPhoneNumber}</span>
                            </div>
                            <div className="receiver-address">
                                <span style={{
                                    color: darkMode ?
                                        colors.baseBackgroundColorGray :
                                        colors.grayBaseColor
                                }}>{receiverDataG.receiverAddress}</span>
                            </div>
                        </div>
                    </div>
                    <div className="shipped-by-items-selecting-shipper">
                        <div className="shipped-by flex flex-col justify-center items-start">
                            <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                                  className="shipped-by-text">Dikirim dari :</span>
                            <div className="shipped-by-address-distance flex justify-between items-center">
                                <span
                                    style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                                    className="shipped-by-address">Apotek Toko Obat Blok M</span>
                                <span className="shipped-by-distance">2.0 Km</span>
                            </div>
                        </div>
                        <div className="the-items-wrapper">
                            {/*the items here*/}
                            {
                                Object.entries(allCheckoutItems).map(
                                    ([key, value]) => <ItemCheckoutComponent key={key} item={value}/>)
                            }
                        </div>
                        <div className="shipper-selected-wrapper flex justify-center items-center">
                            {!shippingData && (
                                <>
                                    <div className="shipper-selected flex justify-center items-center shadow-lg">
                                        <div className="image flex justify-center items-center">
                                            <img className="shipper-default" src={shipper_default} alt="product"/>
                                        </div>
                                        <div className="shipper-text-button flex justify-between items-center">
                                            <span style={{
                                                color: darkMode ?
                                                    colors.baseBackgroundColor :
                                                    colors.blackBaseColor
                                            }} className="shipper-text">Pilih Pengiriman</span>
                                            <IconButton onClick={openSelectingShipperDrawer(true)}
                                                        sx={{marginRight: "0.5em"}}>
                                                <ArrowRightIcon sx={{color: colors.grayBaseColor, fontSize: "1em"}}/>
                                            </IconButton>
                                        </div>
                                    </div>
                                </>
                            )}
                            {shippingData === "gojek" && (
                                <>
                                    <div className="shipper-selected flex justify-center items-center shadow-lg">
                                        <div className="image flex justify-center items-center">
                                            <img className="shipper" src={gojek} alt="product"/>
                                        </div>
                                        <div className="shipper-text-button flex justify-between items-center">
                                            <span style={{
                                                color: darkMode ?
                                                    colors.baseBackgroundColor :
                                                    colors.blackBaseColor
                                            }} className="shipper-text">Gojek Instant</span>
                                            <IconButton onClick={openSelectingShipperDrawer(true)}
                                                        sx={{marginRight: "0.5em"}}>
                                                <ArrowRightIcon sx={{color: colors.grayBaseColor, fontSize: "1em"}}/>
                                            </IconButton>
                                        </div>
                                    </div>
                                </>
                            )}
                            {shippingData === "grab" && (
                                <>
                                    <div className="shipper-selected flex justify-center items-center shadow-lg">
                                        <div className="image flex justify-center items-center">
                                            <img className="shipper" src={grab} alt="product"/>
                                        </div>
                                        <div className="shipper-text-button flex justify-between items-center">
                                            <span style={{
                                                color: darkMode ?
                                                    colors.baseBackgroundColor :
                                                    colors.blackBaseColor
                                            }} className="shipper-text">Grab Express</span>
                                            <IconButton onClick={openSelectingShipperDrawer(true)}
                                                        sx={{marginRight: "0.5em"}}>
                                                <ArrowRightIcon sx={{color: colors.grayBaseColor, fontSize: "1em"}}/>
                                            </IconButton>
                                        </div>
                                    </div>
                                </>
                            )}
                            {shippingData === "jne" && (
                                <>
                                    <div className="shipper-selected flex justify-center items-center shadow-lg">
                                        <div className="image flex justify-center items-center">
                                            <img className="shipper" src={jne} alt="product"/>
                                        </div>
                                        <div className="shipper-text-button flex justify-between items-center">
                                            <span style={{
                                                color: darkMode ?
                                                    colors.baseBackgroundColor :
                                                    colors.blackBaseColor
                                            }} className="shipper-text">JNE Reguler (2-5 hari)</span>
                                            <IconButton onClick={openSelectingShipperDrawer(true)}
                                                        sx={{marginRight: "0.5em"}}>
                                                <ArrowRightIcon sx={{color: colors.grayBaseColor, fontSize: "1em"}}/>
                                            </IconButton>
                                        </div>
                                    </div>
                                </>
                            )}
                            {shippingData === "pickup" && (
                                <>
                                    <div className="shipper-selected flex justify-center items-center shadow-lg">
                                        <div className="image flex justify-center items-center">
                                            <img className="shipper" src={self_pickup} alt="product"/>
                                        </div>
                                        <div className="shipper-text-button flex justify-between items-center">
                                            <span style={{
                                                color: darkMode ?
                                                    colors.baseBackgroundColor :
                                                    colors.blackBaseColor
                                            }} className="shipper-text">Ambil Sendiri</span>
                                            <IconButton onClick={openSelectingShipperDrawer(true)}
                                                        sx={{marginRight: "0.5em"}}>
                                                <ArrowRightIcon sx={{color: colors.grayBaseColor, fontSize: "1em"}}/>
                                            </IconButton>
                                        </div>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                    <div className="addition-note-wrapper">
                        <div className="addition-note">
                            <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}>Catatan Tambahan</span>
                            <Input
                                placeholder="Tulis Catatan Anda"
                                disableUnderline={true}
                                sx={{
                                    fontSize: "1em",
                                    input: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}
                                }}
                                fullWidth={true}
                            />
                        </div>
                    </div>
                    <div className="summary-payment-wrapper shadow-lg">
                        <div className="summary-payment flex flex-col justify-center items-center">
                            <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                                  className="summary-payment-text">Ringkasan Pembayaran</span>
                            <div className="product-price-per-item flex justify-between items-center">
                                <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}>Harga Produk ({total?.totalAllItems} Barang)</span>
                                <span style={{
                                    color: darkMode ?
                                        colors.baseBackgroundColor :
                                        colors.blackBaseColor
                                }}>Rp {numberWithCommas(total?.totalAllPrice)}</span>
                            </div>
                            <div className="shipping-price flex justify-between items-center">
                                <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}>Ongkos Kirim</span>
                                <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                                      className="shipping-price-second">Rp {numberWithCommas(shippingPrice)}</span>
                            </div>
                            <div className="service-fee flex justify-between items-center">
                                <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}>Biaya Layanan</span>
                                <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                                      className="service-fee-second">Rp 0</span>
                            </div>
                            <div className="info-about-choosing-shipper-wrapper flex justify-center items-center">
                                <div className="info-about-choosing-shipper flex justify-center items-center">
                                    <InfoIcon
                                        sx={{color: colors.grayBaseColor, fontSize: "1.1em", marginRight: "0.2em"}}/>
                                    <span>Silakan Pilih <span
                                        className="bolder">Pengiriman</span> dahulu untuk lanjut bayar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="total-payment-wrapper">
                        <div className="total-payment flex justify-between items-center">
                            <div className="total-payment-nominal flex flex-col justify-center items-start">
                                <span style={{color: darkMode ? colors.blueBaseColorLighten : colors.blueBaseColor}}
                                      className="nominal-text">Total Bayar</span>
                                <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                                      className="nominal">Rp {numberWithCommas(
                                    shippingPrice + total?.totalAllPrice)}</span>
                            </div>
                            {
                                isLoading ? (
                                    <Button className="total-payment-button">
                                        <CircularProgress size="1.5em" color="inherit"/>
                                    </Button>
                                ) : (
                                    <Button onClick={toCheckoutSuccessPage} disabled={!shippingData ? true : false}
                                            className={!shippingData ?
                                                "total-payment-button-disabled" :
                                                "total-payment-button"}>
                                        <span>Bayar</span>
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutPage;
