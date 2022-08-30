import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams} from 'react-router-dom';
import {Form} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { authenticatedAction } from "../redux/actions/authenticated";
// import { getProfilePlayer } from '../redux/actions/profileplayer';
import Edit from "../component/modal-edit";
import './pages.css';
import axios from "axios";

export default function ProfilePlayer() {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [birth, setBirth] = useState("");
    const [country, setCountry] = useState("");
    const [bio, setBio] = useState("");
    const [src, setSrc] = useState("https://res.cloudinary.com/alternate-cloud/image/upload/v1658843311/letitimages/d8e9sqsek4saf4ikv21j.jpg")
    const [toggle, setToggle] = useState(1)
    const { token, data } = useSelector((state) => state.authenticatedReducer);
    const id = params.id;

    const getPlayer = () => {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const url = `https://letigogames-v1.herokuapp.com/profile/${id}`;
        axios.get(url, config)
        .then(res => {
            setUsername(res.data.data.username);
            setEmail(res.data.data.email);
            setBirth(res.data.data.birth);
            setCountry(res.data.data.country);
            setBio(res.data.data.bio);
            setSrc(res.data.data.src)
        })
        .catch((err) => {
            console.log("gagal", err.message);
        });
    }

    const toggleTab = (i) => {
        setToggle(i)
    }

    useEffect(() => {
        dispatch(authenticatedAction());
        getPlayer();
        if(!token){
            navigate('/login')
        }
      }, []);
    return(
        <Fragment>
        <div className="d-flex">
            <div className="container-1 pt-5">
                <nav className="text-white list-container pt-3">
                    <div className="float-end">
                        <p style={{marginBottom:"8px",color:"#3z3c3f"}}>Options</p>
                        <h5 onClick={() => toggleTab(1)} 
                        className={toggle == 1 ? "list-setting active" : "list-setting"}>
                            Account
                        </h5>
                        <h5 onClick={() => toggleTab(2)} 
                        className={toggle == 2 ? "list-setting active" : "list-setting"}>
                            Score
                        </h5>
                        <hr className="line"></hr>
                        <h5 onClick={() => toggleTab(3)} 
                        className={toggle == 3 ? "list-setting active" : "list-setting"}>
                            Achievment
                        </h5>
                    </div>
                </nav>
            </div>
            <div className={toggle == 1 ?"container-2 pt-5" : "container-deactive"}>
                <div className="ms-5 text-white">
                    <h3 className=""> Account</h3>
                    <div className="form-profile mt-3 ">
                        <div className="float-end">
                            {data.id == id &&
                            <div className="py-1 px-2 mt-2 me-2 edit">
                                <Edit />
                            </div>
                            }
                        </div>
                        <div className="container-profile-frame">
                            <div className={data.id == id ?"up-selected align-center": "up align-center"}>
                                <div className="frame-profile mx-auto">
                                    <img className="frame-profile" src={src} />
                                </div> 
                            </div>
                            <div className="bott text-center">
                                <p style={{marginBottom:"0px",fontSize:"22px"}}>{username}</p>
                                <p style={{color:"#f3c669",fontSize:"14px"}}>{email}</p>
                            </div>
                        </div>
                        <div className="status align-center">
                            <div className="px-3" style={{width:"100%"}}>
                                <div className="d-flex">
                                    <i className="gg-flag-alt icon"></i>
                                    <p>{country}</p>
                                </div >
                                <div className="d-flex">
                                    <i className="gg-calendar-dates icon"></i>
                                    <p>{birth}</p>
                                </div>
                                <div className="d-flex">
                                    <i className="gg-user icon"></i>
                                    <p>{bio}</p>
                                </div>
                                <div>
                                    <div className="logo mt-4">Letitgo.games</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={toggle == 1 ?"container-deactive" : "container-2 pt-5"}>
                <div className="ms-5 text-white">
                    <h3 className="">{toggle == 2? "Score" : "Achievment"}</h3>
                    <div className="form-profile mt-3 d-flex align-items-center justify-content-center ">
                        <h1> UNDER MAINTENANCE</h1>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    )
}