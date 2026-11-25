 
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

export function UserRegister(props){
       const [userMsg, setUserMsg] = useState('');
       const [errorClass, setErrorClass] = useState('');

        let navigate= useNavigate();

        const formik = useFormik({
            initialValues:{
            user_id: '',
            user_name: '',
            password: '',
            email: ''
         },
           onSubmit:(user)=>{
            axios.post(`http://localhost:3000/users`,user)
            .then(()=>{
                alert('Registered successfully..')
                navigate('/login')
            })
           }
    })
      function VerifyUserId(e){
        axios.get(`http://localhost:3000/users`) 
        .then(response =>{
            var result = response.data.find(user=> user.user_id===e.target.value);
            if(result){
                setUserMsg('UserId Taken - Try Another');
                 setErrorClass('text-danger');
            }else{
                setUserMsg('User Id Available');
                setErrorClass('text-success')
            }
        })
      }
    return(
        <div>
            <form className={`${props.width} p-3`} onSubmit={formik.handleSubmit} >
            <dl>
                <dt>User Id</dt>
                <dd><input type="text" onKeyUp={VerifyUserId}   onChange={formik.handleChange}  name="user_id" className="form-control" /></dd>
                <dd className={errorClass}>{userMsg}</dd>
                <dt>UserName</dt>
                <dd><input type="text" name="user_name"  onChange={formik.handleChange}  className="form-control" /></dd>
                <dt>Password</dt>
                <dd><input type="password" name="password" onChange={formik.handleChange}   className="form-control" /></dd>
                <dt>Email</dt>
                <dd><input type="email" name="email"  onChange={formik.handleChange} className="form-control" /></dd>
            </dl>
            <button className="btn btn-primary w-100"  type="submit">Register</button>
             <div className="mt-3">
                    <Link to="/login">Existing User Login</Link>
                </div>
          </form>
        </div>
    )
}
