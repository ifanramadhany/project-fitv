import axios from "axios";

const baseApiOaSecurity = process.env.REACT_APP_SERVICE_BASE_PATH_OA_SECURITY;
const baseApiMAMasterItem = process.env.REACT_APP_SERVICE_BASE_PATH_MA_MASTER_ITEM;

const apiOaSecurity = axios.create({
    baseURL: baseApiOaSecurity,
});

const apiMAMasterItem = axios.create({
    baseURL: baseApiMAMasterItem,
});

export {apiOaSecurity, apiMAMasterItem};