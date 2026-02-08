import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from '@radix-ui/react-label'
import AppliedJobs from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'


const isResume = true
const Profile = () => {
    useGetAppliedJobs()
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth)


    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8' >
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80" alt="profile" />
                        </Avatar>

                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>



                        </div>


                    </div>



                    <Button onClick={() => setOpen(true)} className="text-right cursor-pointer" variant='outline'><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>

                    <div className='flex items-center gap-4 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>

                    </div>





                </div>

                <div>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }

                    </div>

                </div>

                <div className='grid w-full max-w-sm items-center gap-1 '>
                    <Label className='text-md font-bold ' >Resume</Label>

                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://docs.google.com/gview?url=${encodeURIComponent(user?.profile?.resume)}&embedded=true`}
                        className="text-blue-600 w-full hover:underline cursor-pointer"
                    >
                        {user?.profile?.resumeOriginalName}
                    </a>

                </div>



            </div>
            <div className='max-w-7xl mx-auto bg-white rounded-2xl p-6 mt-6 '>
                <h1 className='font-bold text-lg'>Applied Jobs</h1>
                <AppliedJobs />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />


        </div>
    )
}

export default Profile