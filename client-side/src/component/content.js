import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom"; 
import './component.css';

export default function Content() {
    const d = new Date();
    let date = d.toLocaleDateString(); 
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [collection, setCollection ] = useState([])
    
    const getGames = () => {
        let url = 'https://letigogames-v1.herokuapp.com';
        axios.get(url)
            .then(res => {
                const game = res.data.data
                setLoading(false)
                setCollection(game)
            })
            .catch(err => {
                console.log("game", err)
            })

    }

    const increment = (view, id) => {
        const newCount = view + 1
        const url = `https://letigogames-v1.herokuapp.com/${id}`
        const body = {
            view : newCount
        }
        axios.put(url, body)
        .then(res => {
            console.log(res)
            navigate(`/gamepage/${id}`)
        })
        .catch(
            err => {
            console.log(err)
            }
        )
    }
    
    useEffect(() => {
        getGames();
    }, []);

    return(
        <Fragment>
            <div style={{width:"fit-content", height:"280px",paddingTop:"10%", margin:"0 auto"}}>
                <div className="slide d-flex justify-content-between">
                    <div className="text">
                        <h3 className="py-0 my-0">Recent Update</h3>
                        <p className="pb-0 mb-2">{date}</p>
                    </div>
                    <div className="carousel">
                        <div className="d-flex">
                            <p className="arrow">All</p>
                            <div className="d-flex ms-2">
                                <p className="arrow">{'<'}</p>
                                <p className="arrow" >{'>'}</p>
                            </div>
                        </div>                     
                    </div>
                </div>
                <div className="main-content d-flex justify-content-between">
                    {collection.map((item) =>{
                        return(
                            <div key={item.id} className="box">
                                <div onClick={() => increment(item.view, item.id)}>
                                    <img alt="ada gambar" src={item.src}/>
                                    <div className="py-3 ">
                                        <div className="text-center no-space" data-testid={`content-${item.id}`}>{item.gamesname}</div>
                                        <div className="d-flex mx-auto" style={{width:"fit-content"}}>
                                            <i className="gg-eye text-center me-2 mt-1"></i>
                                            <input className="text-white no-space view" name="view" type='text' value= {item.view} readOnly/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Fragment>
    )
}

{/* <div to={`gamepage/${item.id}`}></div> */}
