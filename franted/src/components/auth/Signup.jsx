import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'sonner'
import { USER_API_END_POINT } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null
  })

  const navigate = useNavigate()
  const {loading}= useSelector(store=>store.auth)
  const dispatch= useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("password", input.password)
    formData.append("role", input.role)

    if (input.file) {
      formData.append("file", input.file)
    }

    try {
      dispatch(setLoading(true))
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          withCredentials: true
        }
      )

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/login")
      }

    } catch (error) {
      

    
        toast.error(error.response.data.message)
      }

      finally{
        dispatch(setLoading(false))
      }
     
  }

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 rounded-md p-4 my-10 space-y-1 border'>
          <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

          <Label>Full Name</Label>
          <Input name="fullname" value={input.fullname} onChange={changeEventHandler} />

          <Label>Email</Label>
          <Input name="email" value={input.email} onChange={changeEventHandler} />

          <Label>Phone Number</Label>
          <Input name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} />

          <Label>Password</Label>
          <Input type="password" name="password" value={input.password} onChange={changeEventHandler} />

          <RadioGroup className="flex gap-4 my-4">
            <div className="flex items-center gap-2">
              <Input type="radio" name="role" value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
              />
              <Label>Student</Label>
            </div>

            <div className="flex items-center gap-2">
              <Input type="radio" name="role" value="recruitor"
                checked={input.role === "recruitor"}
                onChange={changeEventHandler}
              />
              <Label>Recruitor</Label>
            </div>
          </RadioGroup>

          <Label>Profile Image</Label>
          <Input type="file" accept="image/*" onChange={changeFileHandler} />

          {
            loading?<Button className="w-full my-4  "><Loader2 className='w-4 h-4 mr-2 animate-spin'/>Please Wait ...</Button>: <Button type="submit" className="w-full my-4 cursor-pointer ">Signup</Button>
          }

          <p className="text-sm mt-2">
            Already have an account?
            <Link to="/login" className="text-blue-600 ml-1">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
