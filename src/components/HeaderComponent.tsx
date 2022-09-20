import React from 'react';
import "../scss/_shippingAddressPage.scss"
import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";
import colors from '../scss/_variables.module.scss';
import {IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface Props {
    headerText: string,
    previousPage: string
}

function HeaderComponent({headerText, previousPage}: Props) {
    const navigate = useNavigate();

    const toHomePage = () => {
        navigate("/")
    }

    const ArrowBackIcon = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path fill="currentColor"
                  d="m10.875 19.3l-6.6-6.6q-.15-.15-.213-.325Q4 12.2 4 12t.062-.375q.063-.175.213-.325l6.6-6.6q.275-.275.687-.288q.413-.012.713.288q.3.275.313.687q.012.413-.288.713L7.4 11h11.175q.425 0 .713.287q.287.288.287.713t-.287.712Q19 13 18.575 13H7.4l4.9 4.9q.275.275.288.7q.012.425-.288.7q-.275.3-.7.3q-.425 0-.725-.3Z"></path>
        </SvgIcon>
    );

    const HomeIcon = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path fill="currentColor"
                  d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10Zm0 2q-.825 0-1.412-.587Q4 19.825 4 19v-9q0-.475.213-.9q.212-.425.587-.7l6-4.5q.275-.2.575-.3q.3-.1.625-.1t.625.1q.3.1.575.3l6 4.5q.375.275.588.7q.212.425.212.9v9q0 .825-.587 1.413Q18.825 21 18 21h-5v-6h-2v6Zm6-8.75Z"></path>
        </SvgIcon>
    );

    return (
        <div className="header-navigation flex justify-between items-center shadow-lg">
            <IconButton onClick={() => navigate(previousPage)} sx={{marginLeft: "0.1em"}}>
                <ArrowBackIcon sx={{color: colors.blackBaseColor, fontSize: "1.3em"}}/>
            </IconButton>
            <span>{headerText}</span>
            <IconButton onClick={toHomePage} sx={{marginRight: "0.1em"}}>
                <HomeIcon sx={{color: colors.blackBaseColor, fontSize: "1.3em"}}/>
            </IconButton>
        </div>
    );
}


export default HeaderComponent;