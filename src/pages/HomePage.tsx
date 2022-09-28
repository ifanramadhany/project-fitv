import React, {useEffect, useState} from 'react';
import "../scss/_homePage.scss"
import {Button, IconButton, Input, Menu, MenuItem, Switch} from "@mui/material";
import colors from '../scss/_variables.module.scss';
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';
import {clinic_reservation, lab_test, vitamin_suplemen} from "../assets"
import {ItemComponent, LoadingItemComponent} from "../components"
import {useNavigate} from "react-router-dom";
import {useCookies} from 'react-cookie'
import {allItemsLocal} from "../dummy_data/home.page";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../store";
import {styled} from "@mui/material/styles";
import {setCheckoutButton, setEstimatePrice, setTotalProduct} from "../store/actions/global.action";
import {ItemService} from "../services";
import {numberWithCommas} from "../helpers/utils";

const ITEM_HEIGHT = 48;

const Android12Switch = styled(Switch)(({theme}) => (
    {
        padding: 8,
        '& .MuiSwitch-track': {
            borderRadius: 22 / 2,
            '&:before, &:after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
            },
            '&:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="white" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
                left: 12,
            },
            '&:after': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M19,13H5V11H19V13Z" /></svg>')`,
                right: 12,
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            width: 16,
            height: 16,
            margin: 2,
        },
    }
));

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['dark_mode'])
    const darkMode = (cookies.dark_mode === "true")
    const itemService = new ItemService();
    const {checkoutButton, totalProduct, estimatePrice, allCheckoutItems} = useSelector((state: RootStore) => state.globalState);
    const [searchItemsLocal, setSearchItemsLocal] = useState<any>(null)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
    const [inputSearchItem, setInputSearchItem] = useState<string>("");
    const [widthSearch, setWidthSearch] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const SearchIcon = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path fill="currentColor" fillRule="evenodd"
                  d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426ZM10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"></path>
        </SvgIcon>
    );

    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCookie('dark_mode', event.target.checked, {path: '/'});
    };

    function isBlank(str: string) {
        return !str || /^\s*$/.test(str);
    }

    const refCari = React.useRef<HTMLDivElement>(null);

    function componentDidMount() {
        refCari.current
            ? setWidthSearch(refCari.current.offsetWidth)
            : setWidthSearch(0);
    }

    const open = Boolean(anchorEl);
    const openSearchItem = () => {
        setAnchorEl(refCari.current);
    };
    const closeSearchItem = () => {
        setAnchorEl(null);
    };

    const toShippingAddressPage = () => {
        navigate("/shipping-address")
    }

    const showCheckoutButton = () => {
        dispatch(setCheckoutButton(true))
    }

    // const getRecommendedItems = () => {
    //      itemService.getRecommendedItems().then(
    //         ({data}) => {
    //             if (data?.result) {
    //                 console.log(data.result)
    //             }
    //         },
    //         error => {
    //             console.log(error);
    //         }
    //     )
    // }

    useEffect(() => {
        // getRecommendedItems();
        componentDidMount();
        dispatch(setEstimatePrice(0))
        dispatch(setTotalProduct(0))
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, []);

    return (
        <div style={{backgroundColor: darkMode ? colors.blackBaseColor : colors.baseBackgroundColor}}
             className="container-home-page flex flex-col overflow-hidden">
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={closeSearchItem}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: widthSearch,
                    },
                }}
            >
                {(
                    () => {
                        if (!searchItemsLocal) {
                            return (
                                <MenuItem disabled>
                                    ketik minimal 3 karakter
                                </MenuItem>
                            );
                        } else if (searchItemsLocal.length === 0) {
                            return (
                                <MenuItem disabled>
                                    produk tidak ditemukan
                                </MenuItem>
                            )
                        } else if (searchItemsLocal.length > 0) {
                            return (
                                searchItemsLocal.map((item: any, index: number) => (
                                    <MenuItem key={index}>
                                        {item.name}
                                    </MenuItem>
                                ))
                            )
                        }
                    }
                )()}
            </Menu>

            <div className={checkoutButton ?
                "content overflow-y-auto overflow-x-hidden" :
                "content-full overflow-y-auto overflow-x-hidden"}>
                <div style={{backgroundColor: darkMode ? colors.blueBaseColorDarken : colors.blueBaseColor}}
                     className="header-search flex flex-col justify-center items-center">
                    <div className="text-1">Produk dan jasa yang tersedia merupakan tanggung jawab dari Kimia Farma,
                        bila terjadi kendala pada pemesanan dan transaksi silakan menghubungi customer service Kimia
                        Farma <span>1-500-255</span> atau melalui email <span>kimiafarmacare@kimiafarma.co.id</span>
                    </div>
                    <div className="text-2">Cek syarat dan ketentuan <span>disini</span></div>
                </div>
                <div style={{backgroundColor: darkMode ? colors.blueBaseColorDarken : colors.blueBaseColor}}
                     className="search-wrapper flex justify-center items-center drop-shadow-xl">
                    <div ref={refCari} className="search-input flex justify-center items-center">
                        <IconButton sx={{marginLeft: "0.2em"}}>
                            <SearchIcon sx={{color: colors.grayBaseColor, fontSize: "0.8em"}}/>
                        </IconButton>
                        <Input
                            placeholder="Cari obat"
                            disableUnderline={true}
                            sx={{fontSize: "0.8em"}}
                            fullWidth={true}
                            value={inputSearchItem}
                            onChange={(
                                ev: React.ChangeEvent<HTMLTextAreaElement>,
                            ): void => setInputSearchItem(ev.target.value)}
                        />
                    </div>
                </div>
                <div style={{display: "none"}} className="icon-menu-container flex justify-center items-center">
                    <div className="icon-menu-wrapper shadow-xl flex justify-evenly items-center">
                        <Button className="the-icon flex flex-col justify-center items-center">
                            <img className="icon-size" src={clinic_reservation} alt="clinic reservation"/>
                            <span className="icon-text-size">Reservasi Klinik</span>
                        </Button>
                        <Button className="the-icon flex flex-col justify-center items-center">
                            <img className="icon-size" src={lab_test} alt="lab test"/>
                            <span className="icon-text-size">Reservasi Test Laboratorium</span>
                        </Button>
                        <Button className="the-icon flex flex-col justify-center items-center">
                            <img className="icon-size" src={vitamin_suplemen} alt="vitamin suplemen"/>
                            <span className="icon-text-size">Vitamin & Suplemen</span>
                        </Button>
                    </div>
                </div>
                <div style={{backgroundColor: darkMode ? colors.blackBaseColor : colors.baseBackgroundColor}}
                     className="content-container flex flex-col items-center">
                    <div className="product-text-wrapper flex justify-between items-center">
                        <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}>Produk Terlaris</span>
                        <div className="dark-mode-wrapper flex justify-center items-center">
                            <Android12Switch checked={darkMode}
                                             onChange={handleChangeSwitch}/>
                            <div className="flex flex-col justify-center items-center">
                                <span style={{
                                    color: darkMode ?
                                        colors.baseBackgroundColor :
                                        colors.blackBaseColor
                                }}>Dark</span>
                                <span style={{
                                    color: darkMode ?
                                        colors.baseBackgroundColor :
                                        colors.blackBaseColor
                                }}>Mode</span>
                            </div>
                        </div>
                    </div>
                    <div style={{backgroundColor: darkMode ? colors.blackBaseColor : colors.baseBackgroundColor}}
                         className="items-product-wrapper flex flex-wrap justify-center">
                        {/*all card items*/}
                        {
                            isLoading ? <LoadingItemComponent/> : (
                                allItemsLocal ? (
                                    allItemsLocal.map((item: Object, index: number) => (
                                        <ItemComponent key={index} item={item}></ItemComponent>
                                    ))
                                ) : (
                                    <LoadingItemComponent/>
                                )
                            )
                        }
                        {/* last element */}
                        <div className="the-item"></div>
                    </div>
                </div>
            </div>
            <div className={checkoutButton ?
                "checkout-button-container -translate-y-full flex justify-center items-center duration-100" :
                "checkout-button-container flex justify-center items-center translate-y-full duration-100"}>
                <div className="total-product flex justify-start items-center">
                    <span>{totalProduct} Produk</span>
                </div>
                <div className="price-estimate flex flex-col justify-center items-start">
                    <span>Estimasi Harga</span>
                    <span>Rp. {numberWithCommas(estimatePrice)}</span>
                </div>
                <Button onClick={toShippingAddressPage} disabled={buttonDisabled ? true : false}
                        className={buttonDisabled ? "checkout-button-disabled" : "checkout-button"}>
                    <span>Checkout</span>
                </Button>
            </div>
        </div>
    );
};

export default HomePage;
