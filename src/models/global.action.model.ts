export interface ICheckoutItem {
    id: number;
    title: string;
    image: string;
    totalItems: number;
    totalPrice: number;
}

export interface IReceiverData {
    receiverName?: string;
    receiverPhoneNumber?: string;
    receiverEmail?: string;
    receiverLocationData?: string;
    receiverAddress?: string;
    receiverDistrict?: string;
    receiverPostCode?: string;
    receiverNote?: string;
}

export interface ILatLng {
    lat: number;
    lng: number;
}