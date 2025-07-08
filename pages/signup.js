import React, { useRef, useState } from 'react'
import { Navbar } from '../components/index'
import { signIn, useSession, getSession } from "next-auth/react";
import styles from 'styles/Products.module.css'
import Image from 'next/image'
import Link from 'next/link'
import hero from 'assets/Group 2069.png'
import hero1 from 'assets/Group 2070.png'
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import {FcGoogle} from 'react-icons/fc';
import {FiEye, FiEyeOff} from 'react-icons/fi';
import { FaLinkedinIn } from 'react-icons/fa';

const Signup = () => {

    const {session, status} = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [passVisible, togglePass] = useState(false) 
    const form = useRef()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    if(status === 'loading' || status === 'unauthenticated'){
         
    }else{
        router.push(searchParams.get('redirect') || '/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        toast.dismiss()
        const {name, email, phone, password } = e.target
        const id = toast.loading('Processing', {type: 'info', theme: 'colored'})

        if(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email.value)){
            await new Promise(res => setTimeout(res, 2000))
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                },
                body: JSON.stringify({name: name.value, email: email.value, password: password.value})
            })
            
            if(res.status === 200) {
                toast.update(id, {render: 'Your account has been created successfully. Please log in now to proceed.', type: 'success', isLoading: false, autoClose: 3000});
                router.push('/login')
            }else{
                const data = await res.json()
                toast.update(id, {render: <>
                    <h4 className="text-base">Failed to create account</h4>
                    <h5 className="text-sm"> Err: {data.message} </h5>
                </>, type: 'error', isLoading: false, autoClose: 3000});
            }
            return
        }
        toast.update(id, {render: 'Please enter valid email address', type: 'error', isLoading: false, autoClose: 3000});
    }


    return (
        <main className={'main overflow-x-hidden relative'}>
            
            <div className='w-full lg:w-[90%] h-full mx-auto md:flex items-center justify-center pt-0 md:pt-20 px-6 md:px-10 md:px-0'>
                <div className='hidden md:block w-[30%] '>
                    <Image src={hero1} alt="/">
                    </Image>
                </div>
                <div className='w-full md:w-[50%] lg:w-[30%] flex justify-center items-center py-10 md:py-0'>
                    <form onSubmit={handleSubmit} ref={form} className='login-form w-full max-w-md bg-white backdrop-blur-md border border-[#007E9E] shadow-2xl rounded-3xl px-10 py-12 flex flex-col gap-7'>
                        <div className="flex w-full justify-between mb-2">
                            <Link href="/login">
                                <h2 className='cursor-pointer text-3xl text-center font-bold'>Login</h2>
                            </Link>
                            <h2 className='cursor-pointer text-3xl text-center text-[#007E9E] font-bold border-b-4 border-b-[#007E9E] pb-2'>Signup</h2>
                        </div>
                        <div className="flex flex-col gap-5 mt-4">
                            {/* Name */}
                            <div className="relative">
                                <input
                                    className={`peer w-full h-12 px-3 pt-4 text-md rounded-lg border-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#007E9E] transition ${name ? 'not-empty' : ''}`}
                                    type="text"
                                    name="name"
                                    required
                                    autoComplete="off"
                                    placeholder=" "
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                <label className="absolute left-3 top-3 text-gray-500 text-md pointer-events-none transition-all duration-200 bg-white px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-md peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#007E9E] peer-focus:bg-white peer-focus:px-1 peer-focus:py-0.5 peer-focus:rounded not-empty:-top-3 not-empty:text-xs not-empty:text-[#007E9E] not-empty:bg-white not-empty:px-1 not-empty:py-0.5 not-empty:rounded" style={{zIndex:2}}>Name</label>
                            </div>
                            {/* Email */}
                            <div className="relative">
                                <input
                                    className={`peer w-full h-12 px-3 pt-4 text-md rounded-lg border-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#007E9E] transition ${email ? 'not-empty' : ''}`}
                                    type="email"
                                    name="email"
                                    required
                                    pattern="[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                                    autoComplete="off"
                                    placeholder=" "
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <label className="absolute left-3 top-3 text-gray-500 text-md pointer-events-none transition-all duration-200 bg-white px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-md peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#007E9E] peer-focus:bg-white peer-focus:px-1 peer-focus:py-0.5 peer-focus:rounded not-empty:-top-3 not-empty:text-xs not-empty:text-[#007E9E] not-empty:bg-white not-empty:px-1 not-empty:py-0.5 not-empty:rounded" style={{zIndex:2}}>Email</label>
                            </div>
                            {/* Phone */}
                            <div className="relative">
                                <input
                                    className={`peer w-full h-12 px-3 pt-4 text-md rounded-lg border-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#007E9E] transition ${phone ? 'not-empty' : ''}`}
                                    type="tel"
                                    name="phone"
                                    required
                                    autoComplete="off"
                                    placeholder=" "
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                                <label className="absolute left-3 top-3 text-gray-500 text-md pointer-events-none transition-all duration-200 bg-white px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-md peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#007E9E] peer-focus:bg-white peer-focus:px-1 peer-focus:py-0.5 peer-focus:rounded not-empty:-top-3 not-empty:text-xs not-empty:text-[#007E9E] not-empty:bg-white not-empty:px-1 not-empty:py-0.5 not-empty:rounded" style={{zIndex:2}}>Phone</label>
                            </div>
                            {/* Password */}
                            <div className="relative">
                                <input
                                    className={`peer w-full h-12 px-3 pt-4 text-md rounded-lg border-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#007E9E] transition ${password ? 'not-empty' : ''}`}
                                    type={passVisible ? "text" : "password"}
                                    name="password"
                                    required
                                    autoComplete="off"
                                    placeholder=" "
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <label className="absolute left-3 top-3 text-gray-500 text-md pointer-events-none transition-all duration-200 bg-white px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-md peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#007E9E] peer-focus:bg-white peer-focus:px-1 peer-focus:py-0.5 peer-focus:rounded not-empty:-top-3 not-empty:text-xs not-empty:text-[#007E9E] not-empty:bg-white not-empty:px-1 not-empty:py-0.5 not-empty:rounded" style={{zIndex:2}}>Password</label>
                                <span className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-2xl text-gray-400 hover:text-[#007E9E]' onClick={() => togglePass(!passVisible)}>{passVisible ? <FiEyeOff /> : <FiEye />}</span>
                            </div>
                        </div>
                        <button type="submit" className='w-full h-12 text-white text-lg rounded-lg bg-[#007E9E] hover:bg-[#005f7a] font-semibold transition'>Sign Up</button>
                        <div className='flex items-center gap-2 my-2'>
                            <div className='flex-grow h-px bg-gray-300'></div>
                            <span className='text-gray-400 text-sm'>or sign up with</span>
                            <div className='flex-grow h-px bg-gray-300'></div>
                        </div>
                        <div className='flex gap-4 items-center justify-center'>
                            <button type="button" className='flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-200 hover:border-[#007E9E] bg-white shadow-md transition text-2xl'><FcGoogle /></button>
                            <button type="button" className='flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-200 hover:border-[#007E9E] bg-white shadow-md transition text-2xl text-[#0077B5]'><FaLinkedinIn /></button>
                        </div>
                    </form>
                </div>
                <div className='hidden md:block w-[30%] px-0 md:px-0'>
                    <Image src={hero} alt="/">
                    </Image>
                </div>
            </div>
            <hr className="w-[80%] text-[#D9D9D9] mx-auto  mt-2 mb-20"></hr>
        </main>
    )
}
export default Signup
