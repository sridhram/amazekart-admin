import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import {PlusIcon, PencilIcon} from '@heroicons/react/24/outline'

const Products = () => {
    const [products, setProducts] = useState(null);
    useEffect(() => {
        async function getProductsList(){
            fetch('/api/products').then(response => response.json()).then(products => setProducts(products));
        }
        getProductsList();
    },[])
  return (
    <>
        {products ?
            <Layout>
                <Link className='btn-primary flex items-center gap-2 w-fit text-sm' href='/products/new'>
                    <PlusIcon className='w-5 h-5' />
                    Add New Product
                </Link>

                <section className='flex flex-col gap-4 mt-8'>
                    {products.map((product) => {
                        return(
                            <Link href={`/products/${product._id}`} key={product._id} className='flex items-center gap-2 group'>
                                <h3 className='text-xl'>{product.name}</h3>
                                <PencilIcon className='w-5 h-5 hidden group-hover:block' />
                            </Link>
                        )
                    })}
                </section>

            </Layout>
        :
            'Loading...'
        }
    </>
  )
}

export default Products