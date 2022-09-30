import React, {useState} from 'react';
import "../scss/_checkoutSuccessPage.scss"
import colors from "../scss/_variables.module.scss";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";
import {visa_mandiri} from "../assets";
import {useDispatch, useSelector} from "react-redux";
import {setAllCheckoutItems, setEstimatePrice, setTotalProduct} from "../store/actions/global.action";
import {RootStore} from "../store";
import {numberWithCommas} from "../helpers/utils";
import {useCookies} from "react-cookie";

const CheckoutSuccessPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['dark_mode'])
    const darkMode = (
        cookies.dark_mode === "true"
    )
    const {totalEndPrice, receiverDataG} = useSelector((state: RootStore) => state.globalState);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

    const toHomePage = () => {
        dispatch(setEstimatePrice(0))
        dispatch(setTotalProduct(0))
        dispatch(setAllCheckoutItems())
        navigate("/")
    }

    const MaterialSymbolsCheckCircleRounded = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path fill="currentColor"
                  d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"></path>
        </SvgIcon>
    )

    return (
        <div className="container-checkout-success-page flex flex-col">
            <div style={{backgroundColor: darkMode ? colors.blackBaseColor : colors.baseBackgroundColor}}
                 className="content flex flex-col justify-between items-center">
                <div
                    className="kf-icon-main-text-user-data-billing-details-wrapper flex flex-col justify-center items-center">
                    <div className="image-wrapper">
                        <img
                            src="data:image/png;base64,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"
                            alt="logo-kimia-farma-mobile"/>
                    </div>
                    <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                          className="main-text">Toko Obat 999 Mobile</span>
                    <span style={{color: darkMode ? colors.baseBackgroundColorGray : colors.grayBaseColor}}
                          className="user-data">01000000000000006718 - {receiverDataG.receiverName}</span>
                    <span style={{color: darkMode ? colors.blueBaseColorLighten : colors.blueBaseColor}}
                          className="billing-details">Billing Details</span>
                </div>
                <div className="amount-wrapper flex flex-col justify-center items-start">
                    <span style={{color: darkMode ? colors.baseBackgroundColorGray : colors.grayBaseColor}}
                          className="text">Amount</span>
                    <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                          className="amount">Rp {numberWithCommas(totalEndPrice)}</span>
                </div>
                <div style={{
                    backgroundColor: darkMode ?
                        colors.blackBaseColorLighten :
                        colors.baseBackgroundColorDarken
                }} className="source-of-fund-payroll-saving-card-wrapper">
                    <span style={{color: darkMode ? colors.baseBackgroundColorGray : colors.grayBaseColor}}
                          className="source-of-fund">Source of Fund</span>
                    <div className="payroll-saving-card flex relative">
                        <div style={{backgroundColor: darkMode ? colors.blackBaseColor : colors.baseBackgroundColor}}
                             className="payroll-saving-card-left absolute flex flex-col">
                            <div className="flex justify-start items-center">
                                <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                                      className="text">Tabungan Payroll</span>
                                <MaterialSymbolsCheckCircleRounded
                                    sx={{color: colors.blueBaseColor, fontSize: "1em", marginLeft: "0.4em"}}/>
                            </div>
                            <span style={{color: darkMode ? colors.baseBackgroundColorGray : colors.grayBaseColor}}
                                  className="payroll-number">987398309802</span>
                        </div>
                        <div className="payroll-saving-card-right absolute">
                            <img src={visa_mandiri} alt="visa-card"/>
                        </div>
                    </div>
                </div>
                <div onClick={toHomePage} className="continue-button-wrapper flex flex-col justify-end items-center">
                    <Button disabled={buttonDisabled ? true : false}
                            className={buttonDisabled ? "continue-button-disabled" : "continue-button"}>
                        <span>Continue</span>
                    </Button>
                </div>
            </div>
        </div>
    )
        ;
};

export default CheckoutSuccessPage;
