import React, {useEffect, useState} from 'react';
import "../scss/_selectingLocationPage.scss"
import {Button, IconButton, Input} from "@mui/material";
import colors from '../scss/_variables.module.scss';
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';
import {GoogleMap, MarkerF, useJsApiLoader,} from '@react-google-maps/api'
import Skeleton from '@mui/material/Skeleton';
import {usePlacesWidget} from "react-google-autocomplete";
import {useNavigate} from "react-router-dom";

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ['places']

const SelectingLocationPage = () => {
    const navigate = useNavigate();
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
    const [center, setCenter] = useState<{ lat: number; lng: number }>({
        lat: -6.229642,
        lng: 106.7588609
    })

    const toShippingAddressPage = () => {
        navigate("/shipping-address")
    }

    const {ref, autocompleteRef} = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
        onPlaceSelected: async (place) => {
            console.log(place);
            const address = await place.address_components;
            const newAddress = place.formatted_address
            let newDistrictName: string = ""
            await address?.forEach((el: any) => {
                if (el.types[0] === "administrative_area_level_3") {
                    newDistrictName = `${el.long_name.slice(10)}`
                }
            });
            const {long_name: postalCode = ''} =
            await address?.find(c => c.types.includes('postal_code')) || {};
            console.log(newDistrictName, postalCode, newAddress)
        },
        options: {
            types: ["establishment"],
            componentRestrictions: {country: "id"}
        },
    });

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
        libraries,
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
                isLoaded ? (
                    <GoogleMap
                        center={center}
                        zoom={15}
                        mapContainerStyle={{width: '100vw', height: '100vh'}}
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                    >
                        <MarkerF position={center}/>
                    </GoogleMap>
                ) : <Skeleton variant="rounded" width={"100vw"} height={"100vh"}/>
            }
            <Button onClick={() => !buttonDisabled && navigate("/shipping-address")}
                    disabled={buttonDisabled ? true : false}
                    className={buttonDisabled ? "selecting-location-button-disabled" : "selecting-location-button"}>
                <span>Pilih Lokasi</span>
            </Button>
        </div>
    );
};

export default SelectingLocationPage;
