import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import colors from '../scss/_variables.module.scss';
import {useSelector} from "react-redux";
import {RootStore} from "../store";

const LoadingItemComponent = () => {
    const {darkMode} = useSelector((state: RootStore) => state.globalState);

    return (
        <>
            <Skeleton sx={{ bgcolor: darkMode ? colors.baseBackgroundColorDarken : "" }} variant="rounded" className="the-item-loading" />
            <Skeleton sx={{ bgcolor: darkMode ? colors.baseBackgroundColorDarken : "" }} variant="rounded" className="the-item-loading" />
            <Skeleton sx={{ bgcolor: darkMode ? colors.baseBackgroundColorDarken : "" }} variant="rounded" className="the-item-loading" />
            <Skeleton sx={{ bgcolor: darkMode ? colors.baseBackgroundColorDarken : "" }} variant="rounded" className="the-item-loading" />
        </>
    );
};

export default LoadingItemComponent;
