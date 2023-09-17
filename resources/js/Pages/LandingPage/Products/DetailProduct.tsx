import InputError from '@/Components/InputError'
import ButtonMain from '@/Components/LandingPage/ButtonMain'
import Guest from '@/Layouts/GuestLayout'
import { Product } from '@/model/Product'
import { PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react'
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import AddCartProduct from './AddCartProduct'
import QuantityInput from '@/Components/LandingPage/QuantityInput'

type DetailProductProps = {
    product: Product
}

const DetailProduct: React.FC<DetailProductProps> = ({ product }) => {

    const [processing, setProcessing] = useState<boolean>(false)

    const { auth } = usePage<PageProps>().props
    const [inputValue, setInputValue] = useState<number>(1);
    const [stockMsg, setStockMsg] = useState<string>()

    function handlePay() {

        if (isNaN(inputValue) || !auth.user) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Make account first',
            })
        }

        router.post(route('product.transaction.pay', product.id), {
            'quantity': inputValue,
        }, {
            onProgress: () => {
                setProcessing(true)
            },
            onSuccess: () => {
                setProcessing(false)
            }
        })
    }



    return (
        <>
            <Guest>
                <div className='' >
                    <div className='flex h-full flex-col xl:flex-row' >
                        <div className='w-[30%] xl:sticky top-44 h-full px-6 '>
                            <div className='  h-52 ' >
                                <img src={'/storage/' + product.image} alt="" />
                            </div>
                        </div>
                        <div className='flex-1 py-2 px-4 border-x-2 h-screen' >
                            <h1 className='text-xl font-semibold'>{product.product_name}</h1>
                            <p>{product.price}</p>
                        </div>
                        <div className='xl:w-[22%] xl:sticky top-44 h-full px-6 '>
                            <div className=' h-72  border-2 border-opacity-50 border-base_four rounded-lg' >
                                <div className='flex flex-col  w-full' >
                                    <>
                                        <h1 className='text-lg font-bold text-center' >CheckOut</h1>
                                        <QuantityInput product={product} inputValue={inputValue} setInputValue={setInputValue} setStockMsg={setStockMsg} stockMsg={stockMsg} />
                                    </>
                                    <div className='mx-6 ' >
                                        <div className='flex justify-between'>
                                            <p>SubTotal :</p>
                                            {
                                                isNaN(inputValue) || product.stock == 0 ?
                                                    <p>$ 0</p>
                                                    :
                                                    <p>$ {product.price * inputValue - product.discount * inputValue}</p>
                                            }
                                        </div>
                                        <div className='flex flex-col gap-3 mt-6 ' >
                                            <AddCartProduct product={product} quantity={inputValue} />
                                            <div className='w-full flex justify-center ' >
                                                <ButtonMain disabled={isNaN(inputValue) || processing} onClick={handlePay} variant='no_border' >
                                                    Pay
                                                </ButtonMain>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='h-screen border-y-8 my-5 border-base_four '>
                        asd
                    </div>
                </div>
            </Guest>
        </>
    )
}

export default DetailProduct