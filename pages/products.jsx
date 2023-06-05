import React, { useEffect, useRef, useState } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import {PlusIcon, PencilIcon, TrashIcon} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

const Products = () => {
    let currentProductIndex = null;
    const [products, setProducts] = useState(null);
    const deleteConfirmDialog = useRef();
    let currentProductId = null;
    
    function confirmProductDelete(productId, index){
        currentProductId = productId;
        currentProductIndex = index;
        deleteConfirmDialog.current.showModal();
    }

    function OnProductDeleteConfirm(){
        deleteConfirmDialog.current.close();

        fetch(`/api/products?id=${currentProductId}`,{method: 'DELETE'}).then(response => {
            if(response.status === 204){
                const updatedProductsList = products;
                updatedProductsList.splice(currentProductIndex,1);
                setProducts([...updatedProductsList]);
            }
        })
    }

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
                    {products.map((product, index) => {
                        return(
                            <div key={product._id} className='flex items-center gap-2 group'>
                                <h3 className='text-xl'>{product.name}</h3>
                                <Link href={`/products/${product._id}`}>
                                    <PencilIcon className='w-5 h-5 hidden group-hover:block' />
                                </Link>
                                <TrashIcon className='w-5 h-5 hidden cursor-pointer group-hover:block' onClick={() => confirmProductDelete(product._id, index)} />
                            </div>
                        )
                    })}
                </section>
                <dialog data-modal ref={deleteConfirmDialog} className='rounded-lg'>
                    <div className='p-8'>
                        <h3 className='mb-4'>Are you sure you want to delete? Once deleted data cant be retrieved</h3>
                        <section className='flex gap-4 justify-center'>
                            <button onClick={OnProductDeleteConfirm} className='btn-primary-red'>Yes</button>
                            <button className='btn-primary-green' onClick={() => {deleteConfirmDialog.current.close()}}>No</button>
                        </section>
                    </div>
                </dialog>
            </Layout>
        :
            'Loading...'
        }
    </>
  )
}

export default Products