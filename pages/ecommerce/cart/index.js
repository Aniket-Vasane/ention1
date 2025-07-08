"use client"
import React, { useState, useEffect } from 'react'
import {Navbar, Footer} from 'components'
import {Loader} from 'components/Utils'
import { useLocalStorage } from 'react-use';
import Image from 'next/image'
import Link from 'next/link'
import {FaMinus, FaPlus} from 'react-icons/fa'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const Cart = () => {
    const router = useRouter()
    const [cart, setCart] = useLocalStorage('cart', []);
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
 

    useEffect(() => {
        let temp = products?.length > 0 ? products.reduce((a, b) => a + (b.pricing.sellingPrice * cart.find(p => p.slug == b?.slug).quantity), 0) : 0;
        setTotal(temp)
    }, [products, cart])

    useEffect(() => {
        if(loading && cart.length > 0) {
            const fetchProducts = async (slugs) => {
                console.log(slugs)
                const res = await fetch('/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        accept: 'application/json'
                    },
                    body: JSON.stringify({ slugs })
                })

                if (res.status === 200) {
                    setProducts([...(await res.json()).products])
                }
                setLoading(false)
                return 
            }
            fetchProducts(cart?.map(p => p.slug) || [])
        }else{
            setLoading(false)
        }
    }, [loading, cart.length])


    if (typeof window !== "undefined") {
        toast.dismiss()
    }
    
    const updateCount = (action, product) => {
        const i = cart.findIndex((x) => x.slug === product?.slug)
        if(i !== -1){
            setCart(() => {
                const newCart = [...cart]
                const temp = action == 'inc' ? 1 : action == 'dec' && newCart[i].quantity > 1 ? -1 : 0
                newCart[i].quantity += temp
                return newCart
            })
        }
        return
    }

    const removeFromCart = (product) => {
        const i = cart.findIndex((x) => x.slug === product?.slug)
        const j = cart.findIndex((x) => x.slug === product?.slug)
        if(i !== -1 && j !== -1){
            const newCart = [...cart]
            const newProducts = [...products]
            newCart.splice(i, 1)
            newProducts.splice(j, 1)
            router.refresh();
            setCart(newCart)
            setProducts(newProducts)
        }
        return
    }


  return (
    <main>
    <Navbar />
        {/* Create a vertical cart product list with indrement decrement and remove buttons using tailwind css */}
        <div className="mt-8 text-white w-full">
            <h3 className="text-5xl font-semibold text-center"> Cart </h3>
            
            <div className="w-full px-2 lg:px-16 lg:py-10 rounded-md lg:flex flex-col-reverse lg:flex-row">
                {
                    cart.length > 0 && !loading && products.length > 0 ? <>
                        <div className="w-full lg:w-[70%] lg:px-5 rounded-md">
                            <div className="productList min-h-[36vh]">
                                {
                                    products.map((product, i) => (
                                        <div className='my-3 ' key={`cart-product-${i+1}`}>
                                            <div className="flex flex-row py-5">
                                                <div className="imgContainer w-[20%] lg:w-[20%] flex items-center ">
                                                    <Image src={product?.images ? product.images[0] : product?.cover_image} alt='product' width={150} height={150} className='my-auto' />
                                                </div>
                                                <div className="w-[80%] lg:w-[75%] flex items-center justify-center">
                                                    <div className="w-full lg:w-[80%]">
                                                        <h3 className="text-xl truncate"> {product?.title} </h3>
                                                        <p className="text-sm lg:text-lg truncate mt-4 text-gray-300"> Category - {product?.category} </p>
                                                        {/* <h3 className="text-xl mt-2 text-[#6fdbf6] font-semibold"> ₹ {product?.pricing?.sellingPrice.toLocaleString('en-IN')} </h3>
                                                        <p className="text-base text-gray-200"> Sub Total <span className="text-[#6fdbf6]/90">₹{((product?.pricing?.sellingPrice || 1) * cart.find(p => p.slug == product?.slug).quantity)?.toLocaleString('en-IN')}</span> </p>
                                                    */}
                                                     </div>
                                                    <div className="w-full lg:w-[20%] min-w-max h-full flex flex-col justify-center">
                                                        <div className="flex space-x-3 mt-2">
                                                            <button onClick={() => updateCount('dec', product)} className="p-2 center text-xs bg-[#007E9E]/30 hover:bg-[#007E9E]/80 rounded-full outline-none"> <FaMinus /> </button>
                                                            <h3 className="text-xl px-6 border border-[#007E9E] rounded center"> {cart.find(p => p.slug == product?.slug).quantity} </h3>
                                                            <button onClick={() => updateCount('inc', product)} className="p-2 center text-xs bg-[#007E9E]/30 hover:bg-[#007E9E]/80 rounded-full outline-none"> <FaPlus /> </button>
                                                        </div>
                                                        <div className="w-full center">
                                                            <button onClick={() => removeFromCart(product)} className="mt-3 px-2 text-[#007E9E] hover:bg-[#007E9E]/20 rounded"> Remove </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {/* temporary comment out payment details */}
                        {/* <div className="w-full lg:w-[30%]">
                            {
                                cart.length > 0 ? <>
                                    <div className="w-full px-2 lg:px-8 lg:py-10 rounded-md">
                                        <div className="border border-[#007E9E] rounded-md py-3 w-full">
                                            <div className="border-b border-b-[#007E9E] flex w-full pl-3 pr-3">
                                                <h2 className="text-2xl font-semibold mb-2">Price Details</h2>
                                            </div>
                                            <div className="px-3 py-5">
                                                <h4 className="text-lg font-semibold mb-3"> Price ({cart.length} item{cart.length === 1 ? '' : 's'}): ₹ {cart.reduce((a, b) => a + (b.quantity * products.find(p => p.slug == b.slug)?.pricing?.sellingPrice), 0).toLocaleString('en-IN')}</h4>
                                             
                                            </div>
                                            <div className="border-t border-t-[#007E9E] flex w-full pl-3 pr-3 pt-3">
                                                <h3 className="text-xl font-semibold mb-">Total payable: ₹ {(total + (total >= 999 ? 0 : 90)).toLocaleString('en-IN')}</h3>
                                            </div>
                                        </div>
                                        <Link href='/checkout'>
                                            <button className='bg-[#007E9E] w-full py-3 rounded mt-5 font-semibold text-xl'> Proceed To Checkout </button>
                                        </Link>
                                    </div>
                                </> : null
                            }
                        </div> */}
                        {/* end of payment details */}
                    </> : loading ? <div className="w-full min-h-[50vh] center"> <Loader /> </div> : <div className="w-full min-h-[50vh] center">
                        <h2 className="text-4xl text-white"> There is no product in cart.  </h2>
                    </div>
                }
            </div>
        </div>
    <Footer />
    </main>
  )
}

export default Cart
