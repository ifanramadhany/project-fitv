import React, {useState, useEffect} from 'react';
import "../scss/_shippingAddressPage.scss"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import colors from "../scss/_variables.module.scss";
import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import {Button, Paper} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootStore} from "../store";
import {useCookies} from "react-cookie";

const sub_districts = [
    {sub_district: 'Cilandak'},
    {sub_district: 'Jagakarsa'},
    {sub_district: 'Kebayoran Baru'},
    {sub_district: 'Kebayoran Lama'},
    {sub_district: 'Mampang Prapatan'},
    {sub_district: "Pancoran"},
    {sub_district: 'Pasar Minggu'}
]

const ShippingAddressPage = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['dark_mode'])
    const darkMode = (cookies.dark_mode === "true")
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

    const MaterialSymbolsLocationOn = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path fill="currentColor"
                  d="M12 12q.825 0 1.413-.588Q14 10.825 14 10t-.587-1.413Q12.825 8 12 8q-.825 0-1.412.587Q10 9.175 10 10q0 .825.588 1.412Q11.175 12 12 12Zm0 10q-4.025-3.425-6.012-6.363Q4 12.7 4 10.2q0-3.75 2.413-5.975Q8.825 2 12 2t5.587 2.225Q20 6.45 20 10.2q0 2.5-1.987 5.437Q16.025 18.575 12 22Z"></path>
        </SvgIcon>
    );

    const toCheckoutPage = () => {
        navigate("/checkout")
    }

    return (
        <div className="container-shipping-address-page flex flex-col">
            <div style={{backgroundColor: darkMode ? colors.blackBaseColor : colors.baseBackgroundColor}}
                 className="content overflow-y-auto overflow-x-hidden">
                <div className="form-body">
                    <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                          className="text-subTitle-form">Data Penerima</span>
                    <div className="column-textfield1">
                        <TextField
                            sx={{input: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}}
                            InputProps={{
                                sx: {
                                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                        borderWidth: "0.063em",
                                        borderColor: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor,
                                        borderRadius: "0.5em"
                                    }
                                },
                            }}
                            InputLabelProps={{
                                sx: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                            }}
                            className="margin-input1"
                            label="Nama Penerima"
                            placeholder="Masukkan Nama Penerima"
                            fullWidth/>
                        <TextField
                            sx={{input: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}}
                            InputProps={{
                                inputProps: {
                                    type: 'number',
                                    min: 0, max: 9,
                                },
                                sx: {
                                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                        borderWidth: "0.063em",
                                        borderColor: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor,
                                        borderRadius: "0.5em"
                                    }
                                },
                            }}
                            InputLabelProps={{
                                sx: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                            }}
                            className="margin-input2"
                            label="Nomor Handphone"
                            placeholder="08xx xxxx xxxx"
                            fullWidth/>
                    </div>
                    <TextField
                        sx={{input: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}}
                        InputProps={{
                            sx: {
                                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    borderWidth: "0.063em",
                                    borderColor: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor,
                                    borderRadius: "0.5em"
                                },
                                marginBottom: "1.25em"
                            },
                        }}
                        InputLabelProps={{
                            sx: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                        }}
                        type="email"
                        label="Email"
                        placeholder="Masukkan Email"
                        fullWidth/>

                    <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                          className="text-subTitle-form">Alamat Penerima</span>

                    <div className="column-textfield2">
                        <TextField
                            sx={{input: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}}
                            className="margin-input1"
                            fullWidth
                            multiline
                            label="Alamat"
                            placeholder="Masukkan Alamat"
                            InputProps={{
                                style: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                                rows: 4,
                                sx: {
                                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                        borderWidth: "0.063em",
                                        borderColor: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor,
                                        borderRadius: "0.5em"
                                    },
                                },
                            }}
                            InputLabelProps={{
                                sx: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                            }}
                        />

                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            fullWidth
                            PaperComponent={({children}) => (
                                <Paper style={{
                                    background: darkMode ? colors.blackBaseColor : colors.baseBackgroundColor,
                                    color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor
                                }}>{children}</Paper>
                            )}
                            options={sub_districts.map((option) => option.sub_district)}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    className="margin-input2"
                                    sx={{
                                        ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                            borderWidth: "0.063em",
                                            borderColor: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor,
                                            borderRadius: "0.5em"
                                        },
                                        input: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}
                                    }}
                                    InputLabelProps={{
                                        sx: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                                    }}
                                    label="Kota/Kecamatan"
                                    placeholder="Masukkan Nama Kota/Kecamatan"
                                />}
                        />

                    </div>

                    <div className="column-textfield3">
                        <TextField
                            sx={{input: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}}
                            InputProps={{
                                inputProps: {
                                    type: 'number',
                                    min: 0, max: 9,
                                },
                                sx: {
                                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                        borderWidth: "0.063em",
                                        borderColor: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor,
                                        borderRadius: "0.5em"
                                    },
                                },
                            }}
                            InputLabelProps={{
                                sx: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                            }}
                            className="margin-input1"
                            label="Kode Pos"
                            placeholder="Masukkan Kode Pos"
                            fullWidth/>

                        <FormControl fullWidth>
                            <TextField
                                onClick={() => navigate("/selecting-location")}
                                sx={{input: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}}
                                FormHelperTextProps={{style: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}}
                                InputProps={{
                                    startAdornment:
                                        <InputAdornment position="start"><MaterialSymbolsLocationOn sx={{
                                            color: colors.redBaseColor
                                        }}/></InputAdornment>,
                                    sx: {
                                        ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                            borderWidth: "0.063em",
                                            borderColor: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor,
                                            borderRadius: "0.5em"
                                        },
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                                }}
                                value="Jl. Pakubuwono"
                                className="margin-input2"
                                label="Lokasi"
                                placeholder="Pilih Lokasi"
                                helperText="Pastikan lokasi yang anda tandai, sesuai dengan alamat yang tertera"
                            />
                        </FormControl>
                    </div>

                    <TextField
                        sx={{input: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}}
                        InputProps={{
                            sx: {
                                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    borderWidth: "0.063em",
                                    borderColor: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor,
                                    borderRadius: "0.5em"
                                }
                            },
                        }}
                        InputLabelProps={{
                            sx: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                        }}
                        label="Catatan(Opsional)"
                        placeholder="Contoh, pagar warna merah"
                        fullWidth/>

                    <div className="save-button-wrapper flex justify-center items-start">
                        <Button onClick={toCheckoutPage} disabled={buttonDisabled ? true : false}
                                className={buttonDisabled ? "save-button-disabled" : "save-button"}>
                            <span>Simpan</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingAddressPage;
