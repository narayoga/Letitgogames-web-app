import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate} from 'react-router-dom';
// import {useDispatch} from "react-redux"
import axios from "axios";
import './pages.css';
import Navbar from "../component/nav";
import Footer from "../component/footer"
import Submit from "../component/submit";
import NoSubmit from "../component/submitNo";

export default function Login() {
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('')

    const createUser= (e) => {
        console.log('1. masuk handlesubmit')
        e.preventDefault()
        let url = 'https://letigogames-v1.herokuapp.com/register'
        const form = {
            username: username,
            email: email,
            password: password,
            src: 'https://res.cloudinary.com/alternate-cloud/image/upload/v1658843311/letitimages/d8e9sqsek4saf4ikv21j.jpg'
        }

        axios.post(url, form)
        .then(res => {
            navigate('/login')
        })
        .catch(err => {
            if (err.response.status === 500) {
                setError('User Already Taken')
            } else if (err.response.status === 400) {
                setError(err.response.data.message) 
            } else {
                setError(err.message)
            }
        })

    }

    useEffect(() => {
        document.title = 'SignUp'
    }, []);


    return(
        <Fragment>        
        <div className="section banner-bg">
            <Navbar />
            <div className='container ' >
                <div className="form-border mx-auto ">
                    <h1 className="text-center mt-5 fw-bold">Letitgo-games</h1>
                    <h3 className="text-center mb-5 fw-light">Create Account</h3>
                    <form method="post" onSubmit={createUser} > 
                        <div className="mb-4">
                            <input type="text" className="form-input" id="InputUsername" placeholder="Username" name='username' value={username} onChange={(e) => {setUsername(e.target.value)}} required />
                        </div>
                        <div className="mb-4">
                            <input type="email" className="form-input" id="InputEmail1" placeholder="Email" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}}required />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-input" id="InputPassword" placeholder="Password" value={password} name="password" onChange={(e) => {setPassword(e.target.value)}} required />
                            <p className="warning">{error}</p>
                        </div>
                        <Submit command="CREATE ACCOUNT" />
                    </form>
                </div>
                <div className="form-bottom mx-auto py-2">
                    <p className="text-center py-2" style={{fontSize:'14px'}}>Already a member?</p>
                    <Link to='/login'><NoSubmit command="SIGN IN"  /></Link> 
                </div>
            </div> 
        </div>
        <div className="section">
            <Footer />
        </div>
        </Fragment>
    )
}

// .catch( err => {
//     if(err.response.status === 500){
//         setError('username or email has taken')
//     }else if(response.status === 400) {
//         setError(err.response.data.message)
//     }else{
//         setError(err.message)
//         console.log(err)
//     }
// })