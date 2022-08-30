import { Fragment, useEffect } from "react";
import './pages.css';


export default function Error() {

    useEffect(() => {
        document.title = 'Error'
    }, []);

    return(
        <Fragment>        
            <div className="section">
                <h1>404 NOT FOUND</h1>
            </div>
        </Fragment>
    )
}