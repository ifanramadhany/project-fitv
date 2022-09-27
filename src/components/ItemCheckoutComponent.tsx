import React from 'react';
import {numberWithCommas} from "../helpers/utils";
import {useCookies} from "react-cookie";
import colors from "../scss/_variables.module.scss";

type ItemProps = any

const ItemCheckoutComponent = ({children, ...props}: ItemProps) => {
    const [cookies, setCookie] = useCookies(['dark_mode'])
    const darkMode = (cookies.dark_mode === "true")
    const {item} = props;

    return (
        <>
            <div style={{backgroundColor: darkMode ? colors.blackBaseColorLighten : colors.baseBackgroundColor}} className="the-item shadow-lg flex justify-center items-center">
                <div className="image flex justify-center items-center">
                    <img src={item.image} alt="product"/>
                </div>
                <div className="details-product flex flex-col justify-center items-start">
                    <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}} className="product-name">{item.title}</span>
                    <div className="qty-price flex justify-between items-center">
                        <span style={{color: darkMode ? colors.baseBackgroundColorGray : colors.grayBaseColor}} className="product-qty">Qty : {item.totalItems}</span>
                        <span style={{
                            color: darkMode ?
                                colors.blueBaseColorLighten :
                                colors.blueBaseColorDarken
                        }} className="product-price">Rp {numberWithCommas(item.totalPrice)}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemCheckoutComponent;
