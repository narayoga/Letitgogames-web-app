import { Fragment, useEffect  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authenticatedAction } from '../redux/actions/authenticated';
// import { getLeaderboard } from '../redux/actions/leaderboard';
import DropMenu from '../component/dropMenu';
import Content from "../component/content";
import Navbar from "../component/nav";
import Footer from "../component/footer"
import './pages.css';
import '../component/component.css';

export default function Home() {
    const dispatch = useDispatch()
    const { token, data } = useSelector((state) => state.authenticatedReducer);

    useEffect(() => {
        document.title = 'Home';
        dispatch(authenticatedAction());
        // dispatch(getLeaderboard());
    }, [dispatch])

    return(
        <Fragment>        
        <div data-testid={'banner'} className="section banner-bg">
            {token && <DropMenu user = {data} />}
            {!token && <Navbar />}
            <div className="banner">
                <h1 style={{fontSize:'64px', letterSpacing: "3px"}}>Play Free HD Games <br/> And Many Videos</h1>
                <p>Enjoy your unlimited games and entertain post videos collection. We re the definitive source for the best curated games. playable on laptop, pc, wooden pc, anymore</p>
            </div>
        </div>
        <div data-testid={'content'}  className="section">
            <Content />
        </div>
        <div data-testid={'footer'}  className="section">
            <Footer />
        </div>
        </Fragment>
    )
}