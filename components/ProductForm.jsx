import React, {useState} from 'react'
import { useRouter } from 'next/router';
import {ArrowUpTrayIcon} from '@heroicons/react/24/outline'
import Image from 'next/image';

const FormInput = (props) => {
    return(
        <label className='flex flex-col gap-1'>
            <span className='text-sm'>{props.placeholder}</span>
            <input {...props} />
        </label>
    )
}

const ProductForm = ({
    pageTitle,
    _id,
    name:productName,
    description:productDescription,
    price:productPrice,
    imagesList
}) => {
        const router = useRouter();

    const [formValues, setFormvalues] = useState({
        name: productName || '',
        description: productDescription || '',
        price: productPrice || '',
        imagesList: imagesList || []
    });

    const formSubmit = (event) => {
        event.preventDefault();
        let method = 'POST';
        let formData = new FormData();
        for(let key in formValues){
            formData.append(key, formValues[key]);
        }
        if(_id){
            method = 'PUT';
            formData.append('_id',_id);
        }
        
        fetch('/api/products',{
            method,
            headers:{
                'Content-Type': 'application/json'
            },
            body: formValues
        }).then((response) => {
            if(response.status === 201 || response.status === 204 ){
                router.push('/products');
            }
        })
    }

    const onChange = (event) => {
        const {name, value} = event.target;
        setFormvalues({
            ...formValues,
            [name]:value
        })
    }

    const uploadImage = (event) => {
        // const imageReader = new FileReader();
        // imageReader.onload = () => {
        //     if(imageReader.readyState === 2){
                
        //     }
        // }
        setFormvalues({
            ...formValues,
            imagesList : [event.target.files[0], ...formValues.imagesList]
        })
        // imageReader.readAsDataURL(event.target.files[0]);

    }

    const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

  return (
    <>
        <h1 className='text-3xl font-semibold'>{pageTitle}</h1>
        <hr className='my-4' />
        <form onSubmit={formSubmit} encType="multipart/form-data" className='flex flex-col gap-4'>
            <FormInput name="name" value={formValues.name} onChange={onChange} placeholder="Product Name" />
            <section className='flex gap-4 flex-wrap'>
                <label className="px-6 py-12 flex gap-1 items-center w-fit rounded-lg bg-sec-text-light/20 cursor-pointer">
                    <input type="file" className='hidden' onChange={uploadImage} multiple="multiple" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*" />
                    <ArrowUpTrayIcon className='w-5 h-5' />
                    Upload
                </label>
                {formValues.imagesList.length != 0 && (
                    formValues.imagesList.map((image, index) => {
                        return(
                            <figure key={index} className="w-32 h-32 rounded-lg bg-sec-text-light/20 cursor-pointer overflow-hidden">
                                <Image className='object-fill h-full' height={128} width={128} src={image} alt='product preview' />
                            </figure>
                        )
                    })
                )}
            </section>
            <label className='flex flex-col gap-1'>
                <span className='text-sm'>Product Description</span>
                <textarea name="description" value={formValues.description} onChange={onChange} placeholder='Product Description' ></textarea>
            </label>
            <FormInput onKeyDown={blockInvalidChar} type="number" name="price" value={formValues.price} onChange={onChange} placeholder="Price(in INR)" />
            <button className='btn-primary !px-10 self-start mt-2'>Submit</button>
        </form>
    </>
  )
}

export default ProductForm