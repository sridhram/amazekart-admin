import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const ProductDetails = () => {
    const router = useRouter();
    const [productDetails, setProductDetails] = useState(null);
    useEffect(() => {
        if(router.query.id){
            fetch(`/api/products?id=${router.query.id}`).then(response => response.json()).then(product => setProductDetails(product));
        }
    }, [router.query.id])
  return (
    <Layout>
        {productDetails ?
            <ProductForm pageTitle='Edit Product Details' {...productDetails} />
        :
         'Loading...'
        }
    </Layout>
  )
}

export default ProductDetails