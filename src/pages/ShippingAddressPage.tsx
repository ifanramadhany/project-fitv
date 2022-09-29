import React, {useEffect, useState} from 'react';
import "../scss/_shippingAddressPage.scss"
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import colors from "../scss/_variables.module.scss";
import SvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";
import * as EmailValidator from 'email-validator';
import {Button, CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStore} from "../store";
import {useCookies} from "react-cookie";
import {setReceiverDataG} from "../store/actions/global.action";

interface IReceiverData {
    receiverName: string;
    receiverPhoneNumber: string;
    receiverEmail: string;
    receiverLocationData: string;
    receiverAddress: string;
    receiverDistrict: string;
    receiverPostCode: string;
    receiverNote: string;
}

interface IReceiverDataValidation {
    receiverNameValidation: string;
    receiverPhoneNumberValidation: string;
    receiverEmailValidation: string;
    receiverLocationDataValidation: string;
    receiverAddressValidation: string;
    receiverDistrictValidation: string;
    receiverPostCodeValidation: string;
    receiverNoteValidation: string;
}

interface IDisabledValidation {
    disabledEmail: boolean;
    disabledChoosingLocation: boolean;
    disabledRestOfField: boolean;
    disabledSaveButton: boolean;
}

const ShippingAddressPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {receiverDataG} = useSelector((state: RootStore) => state.globalState);
    const [cookies, setCookie] = useCookies(['dark_mode'])
    const darkMode = (
        cookies.dark_mode === "true"
    )
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isAllFieldsCorrect, setIsAllFieldsCorrect] = useState<boolean>(false)
    const [receiverData, setReceiverData] = useState<IReceiverData>({
        receiverName: "",
        receiverPhoneNumber: "",
        receiverEmail: "",
        receiverLocationData: "",
        receiverAddress: "",
        receiverDistrict: "",
        receiverPostCode: "",
        receiverNote: ""
    })

    const [receiverDataValidation, setReceiverDataValidation] = useState<IReceiverDataValidation>({
        receiverNameValidation: "",
        receiverPhoneNumberValidation: "",
        receiverEmailValidation: "",
        receiverLocationDataValidation: "",
        receiverAddressValidation: "",
        receiverDistrictValidation: "",
        receiverPostCodeValidation: "",
        receiverNoteValidation: ""
    })

    const [disabledValidation, setDisabledValidation] = useState<IDisabledValidation>({
        disabledEmail: true,
        disabledChoosingLocation: true,
        disabledRestOfField: true,
        disabledSaveButton: true
    })

    const MaterialSymbolsLocationOn = (props: SvgIconProps) => (
        <SvgIcon {...props}>
            <path fill="currentColor"
                  d="M12 12q.825 0 1.413-.588Q14 10.825 14 10t-.587-1.413Q12.825 8 12 8q-.825 0-1.412.587Q10 9.175 10 10q0 .825.588 1.412Q11.175 12 12 12Zm0 10q-4.025-3.425-6.012-6.363Q4 12.7 4 10.2q0-3.75 2.413-5.975Q8.825 2 12 2t5.587 2.225Q20 6.45 20 10.2q0 2.5-1.987 5.437Q16.025 18.575 12 22Z"></path>
        </SvgIcon>
    );

    const toCheckoutPage = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            navigate("/checkout")
        }, 800)

    }

    const enableSaveButton = () => {
        if (!receiverDataValidation.receiverNameValidation && !receiverDataValidation.receiverPhoneNumberValidation &&
            !receiverDataValidation.receiverEmailValidation && !receiverDataValidation.receiverAddressValidation &&
            !receiverDataValidation.receiverDistrictValidation && !receiverDataValidation.receiverPostCodeValidation &&
            !receiverDataValidation.receiverLocationDataValidation &&
            receiverData.receiverName !== "" && receiverData.receiverPhoneNumber !== "" &&
            receiverData.receiverEmail !== "" && receiverData.receiverAddress !== "" &&
            receiverData.receiverDistrict !== "" && receiverData.receiverPostCode !== "" &&
            receiverData.receiverLocationData !== ""
        ) {
            setIsAllFieldsCorrect(true)
        }
    }

    const validationBouncer = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, dataValidation: string,
        textValidation: string
    ) => {
        setTimeout(() => {
            if (!e.target.value) {
                setReceiverDataValidation({...receiverDataValidation, [dataValidation]: textValidation})
                setTimeout(() => {
                    setIsAllFieldsCorrect(false)
                }, 300)

            } else {
                setReceiverDataValidation({...receiverDataValidation, [dataValidation]: ""})
                setTimeout(() => {
                    enableSaveButton()
                }, 300)
            }
        }, 600);
    }

    const onChangeReceiverName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setReceiverDataG({...receiverDataG, receiverName: e.target.value}))
        setReceiverData({...receiverData, receiverName: e.target.value})
        validationBouncer(e, "receiverNameValidation", "Mohon isi data berikut dengan benar!")
    }

    const onChangeReceiverPhoneNumber = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setReceiverDataG({...receiverDataG, receiverPhoneNumber: e.target.value}))
        setReceiverData({...receiverData, receiverPhoneNumber: e.target.value})
        setTimeout(() => {
            if (!e.target.value || e.target.value.length < 10 || !e.target.value.startsWith("08")) {
                setDisabledValidation({...disabledValidation, disabledEmail: true})
                setReceiverDataValidation({
                    ...receiverDataValidation,
                    receiverPhoneNumberValidation: `Mulai dengan "08" dan isi minimal 10 digit angka!`
                })
                setTimeout(() => {
                    setIsAllFieldsCorrect(false)
                }, 300)

            } else {
                setReceiverDataValidation({...receiverDataValidation, receiverPhoneNumberValidation: ""})
                setDisabledValidation({...disabledValidation, disabledEmail: false})
                setTimeout(() => {
                    enableSaveButton()
                }, 300)
            }
        }, 600);
    }

    const onChangeReceiverEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setReceiverDataG({...receiverDataG, receiverEmail: e.target.value}))
        setReceiverData({...receiverData, receiverEmail: e.target.value})
        setTimeout(() => {
            if (!e.target.value || !EmailValidator.validate(e.target.value)) {
                setDisabledValidation({...disabledValidation, disabledChoosingLocation: true})
                setReceiverDataValidation(
                    {...receiverDataValidation, receiverEmailValidation: "Mohon isi dengan format email yang benar!"})
                setTimeout(() => {
                    setIsAllFieldsCorrect(false)
                }, 300)

            } else {
                setReceiverDataValidation({...receiverDataValidation, receiverEmailValidation: ""})
                setDisabledValidation({...disabledValidation, disabledChoosingLocation: false})
                setTimeout(() => {
                    enableSaveButton()
                }, 300)
            }
        }, 600);
    }

    const onChangeReceiverPostCode = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setReceiverDataG({...receiverDataG, receiverPostCode: e.target.value}))
        setReceiverData({...receiverData, receiverPostCode: e.target.value})
        setTimeout(() => {
            if (!e.target.value || e.target.value.length !== 5 || !receiverData.receiverAddress ||
                !receiverData.receiverDistrict) {
                setReceiverDataValidation(
                    {...receiverDataValidation, receiverPostCodeValidation: "Mohon isi data berikut dengan benar!"})
                setTimeout(() => {
                    setIsAllFieldsCorrect(false)
                    setDisabledValidation({...disabledValidation, disabledSaveButton: true})
                }, 100)

            } else {
                setReceiverDataValidation({...receiverDataValidation, receiverPostCodeValidation: ""})
                setTimeout(() => {
                    enableSaveButton()
                    setDisabledValidation({...disabledValidation, disabledSaveButton: false})
                }, 100)
            }
        }, 200);
    }

    const onChangeRestOfReceiverFields = (
        key: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!e.target.value || !receiverData.receiverAddress || !receiverData.receiverDistrict ||
            !receiverData.receiverPostCode || receiverData.receiverPostCode.length !== 5) {
            setDisabledValidation({...disabledValidation, disabledSaveButton: true})
        } else {
            setDisabledValidation({...disabledValidation, disabledSaveButton: false})
        }
        dispatch(setReceiverDataG({...receiverDataG, [key]: e.target.value}))
        setReceiverData({...receiverData, [key]: e.target.value})
        if (key === "receiverAddress") {
            validationBouncer(e, "receiverAddressValidation", "Mohon isi data berikut dengan benar!")
        }
        if (key === "receiverDistrict") {
            validationBouncer(e, "receiverDistrictValidation", "Mohon isi data berikut dengan benar!")
        }
    }

    const clearReceiverLocationDataG = () => {
        dispatch(setReceiverDataG({
            ...receiverDataG,
            receiverLocationData: "",
            receiverAddress: "",
            receiverDistrict: "",
            receiverPostCode: ""
        }))
        navigate("/selecting-location")
    }

    useEffect(() => {
        setReceiverData(receiverDataG)
        if (receiverDataG.receiverEmail) {
            setDisabledValidation(
                {...disabledValidation, disabledChoosingLocation: false, disabledEmail: false})
        }
        if (receiverDataG.receiverLocationData && receiverDataG.receiverAddress && receiverDataG.receiverDistrict &&
            receiverDataG.receiverPostCode) {
            setDisabledValidation(
                {
                    ...disabledValidation,
                    disabledChoosingLocation: false,
                    disabledEmail: false,
                    disabledRestOfField: false,
                    disabledSaveButton: false
                })
        }
    }, [receiverDataG, receiverData]);

    return (
        <div className="container-shipping-address-page flex flex-col">
            <div style={{backgroundColor: darkMode ? colors.blackBaseColor : colors.baseBackgroundColor}}
                 className="content overflow-y-auto overflow-x-hidden">
                <div className="form-body">
                    <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                          className="text-subTitle-form">Data Penerima</span>
                    <div className="column-textfield1">
                        <TextField
                            error={!!receiverDataValidation.receiverNameValidation}
                            helperText={receiverDataValidation.receiverNameValidation}
                            value={receiverData.receiverName}
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
                            onChange={e => onChangeReceiverName(e)}
                            className="margin-input1"
                            label="Nama Penerima"
                            placeholder="Masukkan Nama Penerima"
                            fullWidth/>
                        <TextField
                            error={!!receiverDataValidation.receiverPhoneNumberValidation}
                            helperText={receiverDataValidation.receiverPhoneNumberValidation}
                            value={receiverData.receiverPhoneNumber}
                            disabled={!receiverData.receiverName}
                            sx={{
                                input: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                                "& .MuiInputBase-root.Mui-disabled": {
                                    "& > fieldset": {
                                        borderColor: darkMode ?
                                            colors.disabledGrayColor :
                                            "",
                                    }
                                },
                                Label: {
                                    '&.Mui-disabled': {
                                        color: darkMode ? colors.disabledGrayColor : ""
                                    },
                                },
                            }}
                            InputProps={{
                                inputProps: {
                                    type: 'number',
                                }, sx: {
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
                            onChange={e => onChangeReceiverPhoneNumber(e)}
                            className="margin-input2"
                            label="Nomor Handphone"
                            placeholder="08xx xxxx xxxx"
                            fullWidth/>
                    </div>
                    <TextField
                        error={!!receiverDataValidation.receiverEmailValidation}
                        helperText={receiverDataValidation.receiverEmailValidation}
                        value={receiverData.receiverEmail}
                        disabled={disabledValidation.disabledEmail}
                        sx={{
                            input: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                            "& .MuiInputBase-root.Mui-disabled": {
                                "& > fieldset": {
                                    borderColor: darkMode ?
                                        colors.disabledGrayColor :
                                        "",
                                }
                            },
                            Label: {
                                '&.Mui-disabled': {
                                    color: darkMode ? colors.disabledGrayColor : ""
                                },
                            },
                        }}
                        style={{marginBottom: "1em"}}
                        InputProps={{
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
                        onChange={e => onChangeReceiverEmail(e)}
                        type="email"
                        label="Email"
                        placeholder="Masukkan Email"
                        fullWidth/>

                    <span style={{color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor}}
                          className="text-subTitle-form">Alamat Penerima</span>

                    <div className="column-textfield2">
                        <TextField
                            value={receiverData.receiverLocationData}
                            disabled={disabledValidation.disabledChoosingLocation}
                            onClick={() => !disabledValidation.disabledChoosingLocation &&
                                clearReceiverLocationDataG()}
                            sx={{
                                input: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                                "& .MuiInputBase-root.Mui-disabled": {
                                    "& > fieldset": {
                                        borderColor: darkMode ?
                                            colors.disabledGrayColor :
                                            "",
                                    }
                                },
                                Label: {
                                    '&.Mui-disabled': {
                                        color: darkMode ? colors.disabledGrayColor : ""
                                    },
                                },
                            }}
                            FormHelperTextProps={{
                                style: {
                                    color: darkMode ?
                                        colors.baseBackgroundColor :
                                        colors.blackBaseColor
                                }
                            }}
                            className="margin-input1"
                            InputProps={{
                                startAdornment: <InputAdornment
                                    position="start"><MaterialSymbolsLocationOn
                                    sx={{color: colors.redBaseColor}}/></InputAdornment>,
                                sx: {
                                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                        borderWidth: "0.063em",
                                        borderColor: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor,
                                        borderRadius: "0.5em",
                                    },
                                },
                            }}
                            InputLabelProps={{
                                sx: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                            }}
                            label="Lokasi"
                            placeholder="Pilih Lokasi"
                            helperText="Pastikan lokasi yang anda tandai, sesuai dengan alamat yang tertera"
                            fullWidth
                        />

                        <TextField
                            error={!!receiverDataValidation.receiverAddressValidation}
                            helperText={receiverDataValidation.receiverAddressValidation}
                            disabled={disabledValidation.disabledRestOfField}
                            value={receiverData.receiverAddress}
                            onChange={e => onChangeRestOfReceiverFields("receiverAddress", e)}
                            sx={{
                                input: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                                "& .MuiInputBase-root.Mui-disabled": {
                                    "& > fieldset": {
                                        borderColor: darkMode ?
                                            colors.disabledGrayColor :
                                            "",
                                    }
                                },
                                Label: {
                                    '&.Mui-disabled': {
                                        color: darkMode ? colors.disabledGrayColor : ""
                                    },
                                },
                            }}
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

                    </div>

                    <div className="column-textfield3">
                        <TextField
                            error={!!receiverDataValidation.receiverDistrictValidation}
                            helperText={receiverDataValidation.receiverDistrictValidation}
                            disabled={disabledValidation.disabledRestOfField}
                            value={receiverData.receiverDistrict}
                            onChange={e => onChangeRestOfReceiverFields("receiverDistrict", e)}
                            className="margin-input1"
                            sx={{
                                input: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                                "& .MuiInputBase-root.Mui-disabled": {
                                    "& > fieldset": {
                                        borderColor: darkMode ?
                                            colors.disabledGrayColor :
                                            "",
                                    }
                                },
                                Label: {
                                    '&.Mui-disabled': {
                                        color: darkMode ? colors.disabledGrayColor : ""
                                    },
                                },
                            }}
                            InputLabelProps={{
                                sx: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                            }}
                            label="Kecamatan"
                            placeholder="Kecamatan"
                            fullWidth/>

                        <TextField
                            error={!!receiverDataValidation.receiverPostCodeValidation}
                            helperText={receiverDataValidation.receiverPostCodeValidation}
                            disabled={disabledValidation.disabledRestOfField}
                            value={receiverData.receiverPostCode}
                            onChange={e => onChangeReceiverPostCode(e)}
                            sx={{
                                input: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                                "& .MuiInputBase-root.Mui-disabled": {
                                    "& > fieldset": {
                                        borderColor: darkMode ?
                                            colors.disabledGrayColor :
                                            "",
                                    }
                                },
                                Label: {
                                    '&.Mui-disabled': {
                                        color: darkMode ? colors.disabledGrayColor : ""
                                    },
                                },
                            }}
                            InputProps={{
                                inputProps: {
                                    type: 'number',
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
                            label="Kode Pos"
                            placeholder="Masukkan Kode Pos"
                            fullWidth/>
                    </div>

                    <TextField
                        disabled={disabledValidation.disabledRestOfField}
                        value={receiverData.receiverNote}
                        onChange={e => onChangeRestOfReceiverFields("receiverNote", e)}
                        sx={{
                            input: {color: darkMode ? colors.baseBackgroundColor : colors.blackBaseColor},
                            "& .MuiInputBase-root.Mui-disabled": {
                                "& > fieldset": {
                                    borderColor: darkMode ?
                                        colors.disabledGrayColor :
                                        "",
                                }
                            },
                            Label: {
                                '&.Mui-disabled': {
                                    color: darkMode ? colors.disabledGrayColor : ""
                                },
                            },
                        }}
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
                        style={{marginTop: "0.5em"}}
                        label="Catatan(Opsional)"
                        placeholder="Contoh, pagar warna merah"
                        fullWidth/>
                    <div className="save-button-wrapper flex justify-center items-start">
                        {
                            isLoading ? (
                                <Button className="save-button">
                                    <CircularProgress size="1.5em" color="inherit"/>
                                </Button>
                            ) : (
                                <Button onClick={toCheckoutPage}
                                        disabled={disabledValidation.disabledSaveButton ? true : false}
                                        className={disabledValidation.disabledSaveButton ?
                                            "save-button-disabled" :
                                            "save-button"}>
                                    <span>Simpan</span>
                                </Button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingAddressPage;
