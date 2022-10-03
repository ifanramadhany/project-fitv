import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import colors from '../scss/_variables.module.scss';
import {useSelector} from "react-redux";
import {RootStore} from "../store";
import {useCookies} from "react-cookie";

const LoadingItemComponent = () => {
    const [cookies, setCookie] = useCookies(['dark_mode'])
    const darkMode = (
        cookies.dark_mode === "true"
    )

    return (
        <>
            <Skeleton sx={{ bgcolor: darkMode ? colors.baseBackgroundColorDarken : "" }} variant="rounded" className="the-item-loading" />
            <Skeleton sx={{ bgcolor: darkMode ? colors.baseBackgroundColorDarken : "" }} variant="rounded" className="the-item-loading" />
            <Skeleton sx={{ bgcolor: darkMode ? colors.baseBackgroundColorDarken : "" }} variant="rounded" className="the-item-loading" />
            <Skeleton sx={{ bgcolor: darkMode ? colors.baseBackgroundColorDarken : "" }} variant="rounded" className="the-item-loading" />
            <Skeleton sx={{ bgcolor: darkMode ? colors.baseBackgroundColorDarken : "" }} variant="rounded" className="the-item-loading" />
            <Skeleton sx={{ bgcolor: darkMode ? colors.baseBackgroundColorDarken : "" }} variant="rounded" className="the-item-loading" />
            <Skeleton sx={{ bgcolor: darkMode ? colors.baseBackgroundColorDarken : "" }} variant="rounded" className="the-item-loading" />
            <Skeleton sx={{ bgcolor: darkMode ? colors.baseBackgroundColorDarken : "" }} variant="rounded" className="the-item-loading" />
        </>
    );
};

export default LoadingItemComponent;
