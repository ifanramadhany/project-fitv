import React, {useState, useEffect, useRef} from 'react';
import "../scss/_homePage.scss"
import {Button, IconButton, Input, Menu, MenuItem} from "@mui/material";
import colors from '../scss/_variables.module.scss';
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';
import {clinic_reservation, lab_test, vitamin_suplemen} from "../assets"
import {ItemComponent, LoadingItemComponent} from "../components"
import {useNavigate} from "react-router-dom";
import { useCookies } from 'react-cookie'
import {allItemsLocal} from "../dummy_data/homePage";
import {Result} from "../models/homePageModel"

const ITEM_HEIGHT = 48;

const HomePage = () => {
    function isBlank(str: string) {
        return !str || /^\s*$/.test(str);
    }

    const [searchItemsLocal, setSearchItemsLocal] = useState<any>(null)

    const [inputSearchItem, setInputSearchItem] = useState<string>("");

    const [widthSearch, setWidthSearch] = useState<number>(0);
    const refCari = React.useRef<HTMLDivElement>(null);

    function componentDidMount() {
        refCari.current
            ? setWidthSearch(refCari.current.offsetWidth)
            : setWidthSearch(0);
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const openSearchItem = () => {
        setAnchorEl(refCari.current);
    };
    const closeSearchItem = () => {
        setAnchorEl(null);
    };

    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token'])

    const navigate = useNavigate();
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
    const [checkoutButton, setCheckoutButton] = useState<boolean>(false)

    const toCheckoutPage = () => {
        navigate("/checkout")
    }

    const showCheckoutButton = () => {
        setCheckoutButton(!checkoutButton)
    }

    const SearchIcon = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path fill="currentColor" fillRule="evenodd"
                  d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426ZM10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"></path>
        </SvgIcon>
    );

    useEffect(() => {
        componentDidMount();
    }, []);

    return (
        <div className="container-home-page flex flex-col overflow-hidden">
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
                {(() => {
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
                })()}
            </Menu>

            <div className={checkoutButton? "content overflow-y-auto overflow-x-hidden" : "content-full overflow-y-auto overflow-x-hidden"}>
                <div className="header-search flex flex-col justify-center items-center">
                    <div className="text-1">Produk dan jasa yang tersedia merupakan tanggung jawab dari Kimia Farma,
                        bila terjadi kendala pada pemesanan dan transaksi silakan menghubungi customer service Kimia
                        Farma <span>1-500-255</span> atau melalui email <span>kimiafarmacare@kimiafarma.co.id</span>
                    </div>
                    <div className="text-2">Cek syarat dan ketentuan <span>disini</span></div>
                </div>
                <div className="search-wrapper flex justify-center items-center drop-shadow-xl">
                    <div ref={refCari} className="search-input flex justify-center items-center">
                        <IconButton onClick={showCheckoutButton} sx={{marginLeft: "0.2em"}}>
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
                <div className="content-container flex flex-col items-center">
                    <div className="product-text-wrapper flex justify-start items-center">
                        <span>Produk Terlaris</span>
                    </div>
                    <div className="items-product-wrapper flex flex-wrap justify-center">
                        {/*all card items*/}
                        {
                            allItemsLocal? (
                                allItemsLocal.map((item: Object, index: number) => (
                                    <ItemComponent key={index} item={item}></ItemComponent>
                                ))
                            ) : (
                                <LoadingItemComponent />
                            )
                        }
                        {/* last element */}
                        <div className="the-item"></div>
                    </div>
                </div>
            </div>
            <div className={checkoutButton? "checkout-button-container -translate-y-full flex justify-center items-center duration-100" : "checkout-button-container flex justify-center items-center translate-y-full duration-100"}>
                <div className="total-product flex justify-start items-center">
                    <span>1 Produk</span>
                </div>
                <div className="price-estimate flex flex-col justify-center items-start">
                    <span>Estimasi Harga</span>
                    <span>Rp. 30.000</span>
                </div>
                <Button onClick={toCheckoutPage} disabled={buttonDisabled? true : false} className={buttonDisabled? "checkout-button-disabled" : "checkout-button"}>
                    <span>Checkout</span>
                </Button>
            </div>
        </div>
    );
};

export default HomePage;
