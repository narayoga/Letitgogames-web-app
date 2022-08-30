import { Fragment, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import './pages.css';
import Navbar from "../component/nav";
import Footer from "../component/footer"
import Submit from "../component/submit";
import NoSubmit from "../component/submitNo";
import axios from "axios";

export default function Login() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error,setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = 'https://letigogames-v1.herokuapp.com/login';
        const body = {
            username : username,
            email: email,
            password: password
        }
        axios.post(url, body)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('data', JSON.stringify(res.data.data))
                localStorage.setItem('src', res.data.src)      
                navigate('/')
            })
            .catch(err => {
                setError(err.response.data.message)
                console.log(err.message, err.response)
            })
    }

    useEffect(() => {
        document.title = 'Login'
    }, []);

    return(
        <Fragment>        
        <div className="section banner-bg">
            <Navbar />
            <div className='container ' >
                <div className="form-border mx-auto ">
                    <h1 className="text-center mt-5 fw-bold">Letitgo-games</h1>
                    <h3 className="text-center mb-5 fw-light">Sign In</h3>
                    <form data-testid="form" onSubmit={(e) => handleSubmit(e)} > 
                        <div className="mb-4">
                            <input type="text" className="form-input" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <input type="email" className="form-input" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-input" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <p className="warning">{error}</p>
                        </div>
                        <Submit command="SIGN IN" />
                    </form>
                    {/* <NoSubmit command="FORGET PASSWORD ?" /> */}
                </div>
                <div className="form-bottom mx-auto py-2">
                    <p className="text-center py-2" style={{fontSize:'14px'}}>New to Wuci.co?</p>
                    <Link to='/signup'><NoSubmit command="CREATE AN ACCOUNT"  /></Link>
                </div>
            </div> 
        </div>
        <div className="section">
            <Footer />
        </div>
        </Fragment>
    )
}
