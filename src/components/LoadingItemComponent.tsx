import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const LoadingItemComponent = () => {
    return (
        <>
            <Skeleton variant="rounded" className="the-item-loading" />
            <Skeleton variant="rounded" className="the-item-loading" />
            <Skeleton variant="rounded" className="the-item-loading" />
            <Skeleton variant="rounded" className="the-item-loading" />
        </>
    );
};

export default LoadingItemComponent;
