import React from 'react';

type ItemProps = any

const ItemCheckoutComponent = ({children, ...props}: ItemProps) => {
    const {item} = props;

    function numberWithCommas(price: number) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <>
            <div className="the-item shadow-lg flex justify-center items-center">
                <div className="image flex justify-center items-center">
                    <img src={item.image} alt="product"/>
                </div>
                <div className="details-product flex flex-col justify-center items-start">
                    <span className="product-name">{item.title}</span>
                    <div className="qty-price flex justify-between items-center">
                        <span className="product-qty">Qty : {item.totalItems}</span>
                        <span className="product-price">Rp {numberWithCommas(item.totalPrice)}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemCheckoutComponent;
