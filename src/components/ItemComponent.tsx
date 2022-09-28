import React, {useEffect, useState} from 'react';
import colors from '../scss/_variables.module.scss';
import {Box, Button, SwipeableDrawer} from "@mui/material";
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';
import {cart_icon} from "../assets"
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../store";
import {
    addNewCheckoutItem,
    setCheckoutButton,
    setDetailItemData,
    setEstimatePrice,
    setTotalProduct
} from "../store/actions/global.action";
import {numberWithCommas} from "../helpers/utils";
import {useCookies} from "react-cookie";
import {ItemCheckoutComponent} from "./index";

type ItemProps = any

const ItemComponent = ({children, ...props}: ItemProps) => {
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['dark_mode'])
    const darkMode = (
        cookies.dark_mode === "true"
    )
    const {totalProduct, estimatePrice, allCheckoutItems} = useSelector((state: RootStore) => state.globalState);
    const {item} = props;
    const navigate = useNavigate();
    const [addToCart, setAddToCart] = useState<boolean>(false)
    const [selectingVariantDrawer, setSelectingVariantDrawer] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0)

    const MinIcon = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path fill="currentColor"
                  d="M8 13q-.425 0-.713-.288Q7 12.425 7 12t.287-.713Q7.575 11 8 11h8q.425 0 .712.287q.288.288.288.713t-.288.712Q16.425 13 16 13Z"></path>
        </SvgIcon>
    );

    const PlusIcon = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path fill="currentColor"
                  d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z"></path>
        </SvgIcon>
    );

    const changeAddToCardStatus = () => {
        dispatch(setTotalProduct(totalProduct + 1))
        setCounter(counter + 1)
        setAddToCart(true)
        dispatch(setEstimatePrice(estimatePrice + item.price))
    };

    const openSelectingVariantDrawer = (open: boolean) => () => {
        setSelectingVariantDrawer(open);
    }

    const toProductDetailPage = () => {
        dispatch(setDetailItemData(item))
        navigate("/product-detail")
    }

    const ButtonVariant = ({name}: any) => {
        return (
            <Button className="variant-button flex justify-center items-center">
                <span style={{
                    color: darkMode ?
                        colors.blueBaseColorLighten :
                        colors.blueBaseColorDarken
                }}>{name}</span>
            </Button>
        )
    }

    const plusCounter = () => {
        setCounter(counter + 1)
        dispatch(setEstimatePrice(estimatePrice + item.price))
    }

    const minusCounter = () => {
        dispatch(setEstimatePrice(estimatePrice - item.price))
        if (counter === 1) {
            dispatch(setTotalProduct(totalProduct - 1))
            setAddToCart(false)
            setCounter(counter - 1)
        } else {
            setCounter(counter - 1)
        }
    }

    useEffect(() => {
        if (totalProduct === 0) {
            dispatch(setCheckoutButton(false))
        } else if (totalProduct > 0) {
            dispatch(setCheckoutButton(true))
        }
    }, [totalProduct]);

    useEffect(() => {
        dispatch(addNewCheckoutItem({
            id: item.id,
            title: item.name,
            image: item.imageUrls[0],
            totalItems: counter,
            totalPrice: counter * item.price,
        }))
    }, [counter]);

    return (
        <>
            {/*some items not available drawer */}
            <SwipeableDrawer
                anchor={"bottom"}
                open={selectingVariantDrawer}
                onOpen={openSelectingVariantDrawer(false)}
                onClose={openSelectingVariantDrawer(false)}
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
                    onKeyDown={openSelectingVariantDrawer(false)}
                >
                    <div className="sign-swipe-wrapper flex justify-center items-start">
                        <div className="sign-swipe"></div>
                    </div>
                    <div className="image-title-per-price-wrapper flex">
                        <div className="image-title-per-price-left flex justify-center items-center">
                            <div className="image-wrapper flex justify-center items-center">
                                <img src={item.imageUrls[0]} alt="product"/>
                            </div>
                        </div>
                        <div className="image-title-per-price-right flex flex-col justify-center">
                            <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                                  className="title">DETTOL ANTISEPTIC LIQUID 45ML DETTOL ANTISEPTIC LIQUID 45ML</span>
                            <span className="per">Per {item.form}</span>
                            <span style={{color: darkMode ? colors.blueBaseColorLighten : colors.blackBaseColor}}
                                  className="price">Rp {numberWithCommas(item.price)}</span>
                        </div>
                    </div>
                    <div className="divider"></div>
                    {item.variant && (
                        <div className="selecting-variant-wrapper flex items-start overflow-x-auto overflow-y-hidden">
                            {item.variant.variants.map((name: string, index: number) => (
                                <ButtonVariant key={index} name={name}/>
                            ))}
                        </div>
                    )}

                    <div className="add-cart-button-wrapper flex justify-center items-center">
                        <Button className="add-cart-button">
                            <span>Tambah ke keranjang</span>
                        </Button>
                    </div>
                </Box>
            </SwipeableDrawer>

            <div style={{borderColor: darkMode ? colors.baseBackgroundColor : colors.grayBaseColor}}
                 className="the-item">
                <div onClick={toProductDetailPage} className="the-item-img flex justify-center items-center">
                    <img src={item.imageUrls[0]} alt="product"/>
                </div>
                <div style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                     className="the-item-title flex justify-center items-center">
                    <span>{item.name}</span>
                </div>
                <div className="the-item-price flex justify-start items-center">
                    <span style={{
                        color: darkMode ?
                            colors.blueBaseColorLighten :
                            colors.blueBaseColorDarken
                    }}>Rp {numberWithCommas(item.price)}</span>
                </div>
                <div className="the-item-action flex justify-center items-center">
                    {
                        item.variant ? (
                            <Button onClick={openSelectingVariantDrawer(true)}
                                    className="add-to-cart-button flex justify-center items-center">
                                <img className="cart-icon" src={cart_icon} alt="cart icon"/>
                                <span>Pilih variant</span>
                            </Button>
                        ) : (
                            addToCart ? (
                                <>
                                    <Button onClick={minusCounter}
                                            className="minus-button flex justify-center items-center">
                                        <MinIcon sx={{color: colors.grayBaseColor, fontSize: "1.6em"}}/>
                                    </Button>
                                    <div className="counter flex justify-center items-center">
                                        <span style={{
                                            color: darkMode ?
                                                colors.baseBackgroundColor :
                                                colors.blackBaseColor
                                        }}>{counter}</span>
                                    </div>
                                    <Button onClick={plusCounter}
                                            className="plus-button flex justify-center items-center">
                                        <PlusIcon sx={{color: colors.baseBackgroundColor, fontSize: "1.2em"}}/>
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={changeAddToCardStatus}
                                        className="add-to-cart-button flex justify-center items-center">
                                    <img className="cart-icon" src={cart_icon} alt="cart icon"/>
                                    <span>Tambah ke Keranjang</span>
                                </Button>
                            )
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default ItemComponent;
