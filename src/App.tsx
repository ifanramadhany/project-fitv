import React from 'react';
import {Route, Routes} from "react-router-dom";
import {HomePage, ShippingAddress, SelectingLocationPage, CheckoutPage, CheckoutSuccessPage, ProductDetailPage} from "./pages";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="shipping-address" element={<ShippingAddress/>}/>
            <Route path="selecting-location" element={<SelectingLocationPage/>}/>
            <Route path="checkout" element={<CheckoutPage/>}/>
            <Route path="checkout-success" element={<CheckoutSuccessPage/>}/>
            <Route path="product-detail" element={<ProductDetailPage/>}/>
            <Route path="*" element={<HomePage/>}/>
        </Routes>
    );
}

export default App;
