import React, {useState} from 'react';
import colors from '../scss/_variables.module.scss';
import {Box, Button, SwipeableDrawer} from "@mui/material";
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';
import {cart_icon, dettol_50ml, warning_icon} from "../assets"
import {useNavigate} from "react-router-dom";

type ItemProps = any

const ItemComponent = ({children, ...props}: ItemProps) => {
    const {item} = props;
    const navigate = useNavigate();
    const [addToCart, setAddToCart] = useState<boolean>(false)
    const [selectingVariantDrawer, setSelectingVariantDrawer] = useState<boolean>(false);

    function numberWithCommas(price: number) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

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
        setAddToCart(true)
    };

    const openSelectingVariantDrawer = (open: boolean) => () => {
        setSelectingVariantDrawer(open);
    }

    const toProductDetailPage = () => {
        navigate("/product-detail")
    }

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
                        overflowY: "auto"
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
                                <img src={dettol_50ml} alt="product"/>
                            </div>
                        </div>
                        <div className="image-title-per-price-right flex flex-col justify-center">
                            <span className="title">DETTOL ANTISEPTIC LIQUID 45ML DETTOL ANTISEPTIC LIQUID 45ML</span>
                            <span className="per">Per Buah</span>
                            <span className="price">Rp. 108.192</span>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="selecting-variant-wrapper flex items-start overflow-x-auto overflow-y-hidden">
                        <Button className="variant-button flex justify-center items-center">
                            <span>100 ML</span>
                        </Button>
                        <Button className="variant-button flex justify-center items-center">
                            <span>100 ML</span>
                        </Button>
                        <Button className="variant-button flex justify-center items-center">
                            <span>100 ML</span>
                        </Button>
                        <Button className="variant-button flex justify-center items-center">
                            <span>100 ML</span>
                        </Button>
                        <Button className="variant-button flex justify-center items-center">
                            <span>100 ML</span>
                        </Button>
                        <Button className="variant-button flex justify-center items-center">
                            <span>100 ML</span>
                        </Button>
                    </div>

                    <div className="add-cart-button-wrapper flex justify-center items-center">
                        <Button className="add-cart-button">
                            <span>Tambah ke keranjang</span>
                        </Button>
                    </div>
                </Box>
            </SwipeableDrawer>

            <div className="the-item">
                <div onClick={toProductDetailPage} className="the-item-img flex justify-center items-center">
                    <img src={item.imageUrls} alt="product"/>
                </div>
                <div className="the-item-title flex justify-center items-center">
                    <span>{item.name}</span>
                </div>
                <div className="the-item-price flex justify-start items-center">
                    <span>Rp {numberWithCommas(item.price)}</span>
                </div>
                <div className="the-item-action flex justify-center items-center">
                    {
                        item.variant? (
                            <Button onClick={openSelectingVariantDrawer(true)}
                                    className="add-to-cart-button flex justify-center items-center">
                                <img className="cart-icon" src={cart_icon} alt="cart icon"/>
                                <span>Pilih variant</span>
                            </Button>
                        ) : (
                            addToCart ? (
                                <>
                                    <Button className="minus-button flex justify-center items-center">
                                        <MinIcon sx={{color: colors.grayBaseColor, fontSize: "1.6em"}}/>
                                    </Button>
                                    <div className="counter flex justify-center items-center">
                                        <span>2</span>
                                    </div>
                                    <Button className="plus-button flex justify-center items-center">
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
