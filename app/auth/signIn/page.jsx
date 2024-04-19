"use client"
import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { Inter, Work_Sans } from "next/font/google";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { roles } from '@/constants';
const inter = Inter({ subsets: ["latin"] });
const WorkSans = Work_Sans({ subsets: ["latin"] });
const SignIn = () => {
    const router = useRouter();
    const { data: session, status } = useSession()
    // if (status === "authenticated") {
    //         router.push("/")
    //   }
    
    const [formData, setFormData] = useState({});
    const [selectedRole, setSelectedRole] = useState(roles[0])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedRole)
        const data = {
            redirect: false,
            role:selectedRole.role,
            ...formData
        }
        const res = await signIn("credentials", data);
        console.log("resss in sing in",res)
        if (!res.ok) {
            router.replace("/auth/register")
        }
        else {
             router.push("/")
        }
    };

    return (
        <div className={`flex justify-center items-center absolute inset-0 ${WorkSans.className}`}>
            <div className=''>

                <form className=' md:w-[400px] relative md:h-[390px] rounded-xl shadow-xl border broder-2  flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                    <h2 className='text-xl font-bold text-center mb-8'>Sign In</h2>
                    <div className=''>
                        <label htmlFor="email"
                            className='text-sm'>Email:</label>
                        <br></br>
                        <input
                            type="email"
                            className='w-[250px] bg-gray-50 border-[1px] border-gray-100 p-2 text-sm m-1 rounded-[5px]'
                            placeholder='enter your email'
                            autoFocus={true}
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className='text-sm'>Password:</label>
                        <br></br>
                        <input
                            type="password"
                            className='w-[250px] bg-gray-50 border-[1px] border-gray-100 p-2 text-sm m-1 rounded-[5px]'
                            placeholder='enter your password'
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <div className=''>
                        <label htmlFor="password" className='text-sm'>Role:</label>
                            <Listbox  value={selectedRole.role} onChange={setSelectedRole}>
                                <Listbox.Button className="mt-2 rounded-[5px]  border-2 flex flex-row justify-between w-[150px] p-1 text-sm " >{selectedRole.role} <ChevronUpDownIcon  className="h-5 w-5"  /> </Listbox.Button>
                                <Listbox.Options>
                                    {roles.map((person) => (
                                        <Listbox.Option
                                           className=" border-2 w-[150px]  p-1 text-sm"
                                            value={person} >
                                            {person.role}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Listbox>
                        </div>

                    </div>
                    <div className='flex flex-row items-center justify-evenly w-full mt-4'>
                    <button type="submit" className='p-2 bg-black text-white text-[8px] w-[80px] rounded-[7px] m-2 mt-3'>Sign In</button>
                    <Link href="/auth/register" className='text-[8px] w-[80px] rounded-[7px] border-[1px] p-2 text-center'>sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
