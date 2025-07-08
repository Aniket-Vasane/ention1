import React, { useState, useEffect } from 'react'

import { signIn, useSession, } from "next-auth/react";
// import styles from 'styles/Products.module.css'
import Image from 'next/image'
import Link from 'next/link'
import hero from 'assets/Group 2069.png'
import hero1 from 'assets/Group 2070.png'
import {FaGoogle, FaLinkedin} from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedinIn } from 'react-icons/fa';

const Login = () => {

    const {session, status} = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [passVisible, togglePass] = useState(false) 
    const [errors, setErrors] = useState({})
    const [formValues, setFormValues] = useState({ email: '', password: '' })
    const emailInputRef = React.useRef(null);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const passwordInputRef = React.useRef(null);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    if(status === 'loading' || status === 'unauthenticated'){
         
    }else{
        router.push(searchParams.get('redirect') || '/')
    }

    const validate = (values) => {
        const errs = {};
        if (!values.email.trim()) {
            errs.email = 'Please enter your email.';
        } else if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(values.email)) {
            errs.email = 'Please enter a valid email address.';
        }
        if (!values.password) {
            errs.password = 'Please enter your password.';
        }
        return errs;
    }

    const handleInputChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate(formValues);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
        const {email, password} = formValues;
        const id = toast.loading('Processing', {type: 'info', theme: 'colored'})
        await new Promise(res => setTimeout(res, 2000))
        signIn('credentials', {redirect: false, email, password})
        .then(({err, status, ok, url}) => {
            if(ok) {
                router.push(searchParams.get('redirect') || '/')
                toast.dismiss()
            }else {
                toast.update(id, {render: 'Invalid username or password', type: 'error', isLoading: false, autoClose: 3000});
            }
        })
    }


    return (
        <main className={'main overflow-x-hidden relative'}>
            
            <div className='w-full lg:w-[90%] h-full mx-auto md:flex items-center justify-center pt-0 md:pt-20 px-6 md:px-10 md:px-0'>
                <div className='hidden md:block w-[30%] '>
                    <Image src={hero1} alt="/">
                    </Image>

                </div>
                <div className='w-full md:w-[50%] lg:w-[30%] flex justify-center items-center py-10 md:py-0'>
                    <form onSubmit={handleSubmit} className='login-form w-full max-w-md bg-white backdrop-blur-md border border-[#007E9E] shadow-2xl rounded-3xl px-10 py-12 flex flex-col gap-7'>
                        <div className="flex w-full justify-between mb-2">
                            <h2 className='cursor-pointer text-3xl text-center text-[#007E9E] font-bold border-b-4 border-b-[#007E9E] pb-2'>Login</h2>
                            <Link href="/signup">
                                <h2 className='cursor-pointer text-3xl text-center font-bold'>Signup</h2>
                            </Link>
                        </div>
                        <div className="flex flex-col gap-5 mt-4">
                            <div className="relative">
                                <input
                                    className={`peer w-full h-12 px-3 pt-4 text-md rounded-lg border-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#007E9E] transition ${formValues.email ? 'not-empty' : ''}`}
                                    type="email"
                                    placeholder=" "
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    ref={emailInputRef}
                                    onFocus={() => setIsEmailFocused(true)}
                                    onBlur={() => setIsEmailFocused(false)}
                                />
                                <label
                                    className={
                                        `absolute left-3 top-3 text-gray-500 text-md pointer-events-none transition-all duration-200 bg-white px-1 \
                                        peer-placeholder-shown:top-3 peer-placeholder-shown:text-md \
                                        peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#007E9E] peer-focus:bg-white peer-focus:px-1 peer-focus:py-0.5 peer-focus:rounded \
                                        not-empty:-top-3 not-empty:text-xs not-empty:text-[#007E9E] not-empty:bg-white not-empty:px-1 not-empty:py-0.5 not-empty:rounded`
                                    }
                                    style={{zIndex:2}}
                                >
                                    Email
                                </label>
                                {errors.email && <div className="text-red-500 text-xs mt-1 ml-1">{errors.email}</div>}
                            </div>
                            <div className="relative">
                                <input
                                    className={`peer w-full h-12 px-3 pt-4 text-md rounded-lg border-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#007E9E] transition ${formValues.password ? 'not-empty' : ''}`}
                                    type={passVisible ? "text" : "password"}
                                    placeholder=" "
                                    name="password"
                                    value={formValues.password}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    ref={passwordInputRef}
                                    onFocus={() => setIsPasswordFocused(true)}
                                    onBlur={() => setIsPasswordFocused(false)}
                                />
                                <label
                                    className={
                                        `absolute left-3 top-3 text-gray-500 text-md pointer-events-none transition-all duration-200 bg-white px-1 \
                                        peer-placeholder-shown:top-3 peer-placeholder-shown:text-md \
                                        peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#007E9E] peer-focus:bg-white peer-focus:px-1 peer-focus:py-0.5 peer-focus:rounded \
                                        not-empty:-top-3 not-empty:text-xs not-empty:text-[#007E9E] not-empty:bg-white not-empty:px-1 not-empty:py-0.5 not-empty:rounded`
                                    }
                                    style={{zIndex:2}}
                                >
                                    Password
                                </label>
                                <span className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-2xl text-gray-400 hover:text-[#007E9E]' onClick={() => togglePass(!passVisible)}>{passVisible ? <FiEyeOff /> : <FiEye />}</span>
                                {errors.password && <div className="text-red-500 text-xs mt-1 ml-1">{errors.password}</div>}
                            </div>
                        </div>
                        <div className="flex justify-end mb-2">
                            <Link href="/forgot-password" className="text-sm text-[#007E9E] hover:underline">Forgot password?</Link>
                        </div>
                        <button type="submit" className='w-full h-12 text-white text-lg rounded-lg bg-[#007E9E] hover:bg-[#005f7a] font-semibold transition'>Log In</button>
                        <div className='flex items-center gap-2 my-2'>
                            <div className='flex-grow h-px bg-gray-300'></div>
                            <span className='text-gray-400 text-sm'>or sign in with</span>
                            <div className='flex-grow h-px bg-gray-300'></div>
                        </div>
                        <div className='flex gap-4 items-center justify-center'>
                            <button type="button" className='flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-200 hover:border-[#007E9E] bg-white shadow-md transition text-2xl'><FcGoogle /></button>
                            <button type="button" className='flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-200 hover:border-[#007E9E] bg-white shadow-md transition text-2xl text-[#0077B5]'><FaLinkedinIn /></button>
                        </div>
                    </form>
                </div>
                <div className='hidden md:block w-full md:w-[20%] lg:w-[30%] px-0 md:px-0'>
                    <Image src={hero} alt="/">
                    </Image>
                </div>
            </div>
            <hr className="w-[80%] text-[#D9D9D9] mx-auto  mt-2 mb-20"></hr>


            
        </main>
    )
}
export default Login
