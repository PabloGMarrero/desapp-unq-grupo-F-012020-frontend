import React from 'react';
import Product from '../Product/Product';
import {useTranslation} from 'react-i18next'
const ProductsList = ({products, calculateTotal}) =>{
    const {t} = useTranslation()
    return (
        products.length > 0 ?
        products.map( product =>
            <Product
            product={product}
                
            />
          )
          : <p>Loading...</p>
    )
}

export default ProductsList;

/*
productName={product.productName}
                price={product.price}
                imageUrl={product.imageUrl}
                handleTotal={calculateTotal}
                t = {t}*/