import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useCaptcha } from "../hooks/captcha";



export function UserLogin(props){

    const [cookies, setCookie, removeCookie] = useCookies(['userid']);

    let captcha =useCaptcha();
    let navigate = useNavigate(); 
    const formik = useFormik({
      initialValues:{
        user_id:'',
        password: ''
      },
       onSubmit:(user)=>{
            axios.get(`http://localhost:3000/users`)
            .then(response=>{
                 var result = response.data.find(u=> u.user_id===user.user_id);
                 if(result){
                     if(result.password===user.password){
                         setCookie('userid', user.user_id);
                        navigate('/dashboard');
                     } else {
                        alert('Invalid Password');
                     }
                 } else {
                    alert('Invalid UserId');
                 }
            })
        }
    })
    return(
        <div>
          <form onSubmit={formik.handleSubmit} className={`${props.width} p-3`} >
            <h4 className={props.displayTitle}>User Login</h4>
            <dl>
                <dt>User Id</dt>
                <dd><input type="text" onChange={formik.handleChange } name="user_id" className="form-control" /></dd>
                <dt>Password</dt>
                <dd><input type="password" onChange={formik.handleChange} name="password" className="form-control" /></dd>
                <dt>Verify Code</dt>
                <dd>{captcha}</dd>
            </dl>
            <button className="btn btn-primary w-100">Login</button>
             <div className="mt-3">
                    <Link to="/register">New User Register</Link>
                </div>
          </form>
        </div>
    )
}
