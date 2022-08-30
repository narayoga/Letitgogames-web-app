import { Link} from 'react-router-dom';
import Search from './search'
import './component.css';
import {  Fragment } from 'react';

export default function Navbar() {

    return(
        <div className='d-flex justify-content-between pt-4 mx-3 sticky'>
            <div className='d-flex justify-content-between nav-side' style={{paddingLeft:"5em"}}>
                <Link to='/'>Letitgo.games</Link>
                <p >| home</p>
            </div>
            <div className='search'>
                <Search />
            </div>
            <div className='d-flex justify-content-between nav-side' style={{paddingRight:"2em"}}>
                <>
                    <Link to='/login'>SIGN IN</Link> 
                    <Link to='/signup'>CREATE ACCOUNT</Link> 
                </>   
            </div>
        </div>
    )
}