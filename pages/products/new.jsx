import React, {useState} from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

const FormInput = (props) => {
    return(
        <label className='flex flex-col gap-1'>
            <span className='text-sm'>{props.placeholder}</span>
            <input {...props} />
        </label>
    )
}

const New = () => {
    
    const router = useRouter();

    const [formValues, setFormvalues] = useState({
        name: '',
        description: '',
        price: ''
    });

    const formSubmit = (event) => {
        event.preventDefault();
        fetch('/api/products',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues)
        }).then((response) => {
            if(response.status === 204){
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

    const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

  return (
    <Layout>
        <h1 className='text-3xl font-semibold'>Add New Product</h1>
        <hr className='my-4' />
        <form onSubmit={formSubmit} className='flex flex-col gap-4'>
            <FormInput name="name" value={formValues.name} onChange={onChange} placeholder="Product Name" />
            <label className='flex flex-col gap-1'>
                <span className='text-sm'>Product Description</span>
                <textarea name="description" value={formValues.description} onChange={onChange} placeholder='Product Description' ></textarea>
            </label>
            <FormInput onKeyDown={blockInvalidChar} type="number" name="price" value={formValues.price} onChange={onChange} placeholder="Price(in INR)" />
            <button className='btn-primary !px-10 self-start mt-2'>Submit</button>
        </form>

    </Layout>
  )
}

export default New