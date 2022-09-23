import React, {useState} from 'react';
import "../scss/_checkoutSuccessPage.scss"
import colors from "../scss/_variables.module.scss";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";
import {kfm_logo, visa_mandiri} from "../assets";
import {useDispatch} from "react-redux";
import {setEstimatePrice, setTotalProduct} from "../store/actions/global.action";

const CheckoutSuccessPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

    const toHomePage = () => {
        dispatch(setEstimatePrice(0))
        dispatch(setTotalProduct(0))
        navigate("/")
    }

    const MaterialSymbolsCheckCircleRounded = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path fill="currentColor"
                  d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"></path>
        </SvgIcon>
    )

    return (
        <div className="container-checkout-page flex flex-col">
            <div className="content flex flex-col justify-between items-center">
                <div
                    className="kf-icon-main-text-user-data-billing-details-wrapper flex flex-col justify-center items-center">
                    <div className="image-wrapper">
                        <img src={kfm_logo} alt="logo-kimia-farma-mobile"/>
                    </div>
                    <span className="main-text">Kimia Farma Mobile</span>
                    <span className="user-data">01000000000000006718 - Cahyadi Andri</span>
                    <span className="billing-details">Billing Details</span>
                </div>
                <div className="amount-wrapper flex flex-col justify-center items-start">
                    <span className="text">Amount</span>
                    <span className="amount">Rp 33.000</span>
                </div>
                <div className="source-of-fund-payroll-saving-card-wrapper">
                    <span className="source-of-fund">Source of Fund</span>
                    <div className="payroll-saving-card flex relative">
                        <div className="payroll-saving-card-left absolute flex flex-col">
                            <div className="flex justify-start items-center">
                                <span className="text">Tabungan Payroll</span>
                                <MaterialSymbolsCheckCircleRounded
                                    sx={{color: colors.blueBaseColor, fontSize: "1em", marginLeft: "0.4em"}}/>
                            </div>
                            <span className="payroll-number">987398309802</span>
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
