import React, {useState, useRef, useEffect} from 'react';
import "../scss/_selectingLocationPage.scss"
import {Button, IconButton, Input} from "@mui/material";
import colors from '../scss/_variables.module.scss';
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';
import {
    useJsApiLoader,
    GoogleMap,
    MarkerF,
    Autocomplete,
    DirectionsRenderer,
} from '@react-google-maps/api'
import Skeleton from '@mui/material/Skeleton';
import { usePlacesWidget } from "react-google-autocomplete";

const SelectingLocationPage = () => {
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
    const [center, setCenter] = useState<{lat: number; lng: number}>({
        lat: -6.229642,
        lng: 106.7588609
    })

    const { ref, autocompleteRef } = usePlacesWidget({
        apiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
        onPlaceSelected: (place) => {
            console.log(place);
        },
        options: {
            types: ["establishment"],
            componentRestrictions: { country: "id" }
        },
    });

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
        libraries: ['places'],
    })

    const MapIcon = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path fill="currentColor"
                  d="M12 2C7.589 2 4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12c0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4s-1.79 4-4 4z"></path>
        </SvgIcon>
    );
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords)
            setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
        })
    }, [])

    return (
        <div className="container-selecting-location-page flex flex-col overflow-hidden">
            <div className="search-wrapper flex justify-center items-center drop-shadow-xl">
                <div className="search-input flex justify-center items-center">
                    <IconButton sx={{marginLeft: "0.2em"}}>
                        <MapIcon sx={{color: colors.grayBaseColor, fontSize: "0.8em"}}/>
                    </IconButton>
                    <Input
                        placeholder="Cari lokasi"
                        disableUnderline={true}
                        sx={{fontSize: "0.8em"}}
                        fullWidth={true}
                        inputRef={ref}
                    />
                    <IconButton sx={{visibility: "hidden"}}>
                        <MapIcon sx={{color: colors.grayBaseColor, fontSize: "1.1em"}}/>
                    </IconButton>
                </div>
            </div>
            {
                isLoaded? (
                    <GoogleMap
                        center={center}
                        zoom={15}
                        mapContainerStyle={{ width: '100vw', height: '100vh' }}
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                    >
                        <MarkerF position={center} />
                    </GoogleMap>
                ) : <Skeleton variant="rounded" width={"100vw"} height={"100vh"} />
            }
            <Button disabled={buttonDisabled? true : false} className={buttonDisabled? "selecting-location-button-disabled" : "selecting-location-button"}>
                <span>Pilih Lokasi</span>
            </Button>
        </div>
    );
};

export default SelectingLocationPage;
