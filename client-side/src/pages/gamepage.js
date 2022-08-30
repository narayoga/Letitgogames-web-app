import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate, useParams} from "react-router-dom";
// import poster from '../assets/paperockscissor.jpg'
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import Video from '../component/video';
import { authenticatedAction } from '../redux/actions/authenticated';
import { getLeaderboard } from "../redux/actions/leaderboard";
import { useDispatch, useSelector } from "react-redux";

function GameDetail() {
  const { token, data } = useSelector((state) => state.authenticatedReducer);
  const {getLeaderboardResult, getLeaderboardLoading,getLeaderboardError} = useSelector((state) => state.leaderboardReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams();
  const id = params.id
  const [banner, setBanner] = useState('')
  const [desc, setDesc] = useState('')
  const [title, setTitle] = useState('')
  const [players, setPlayers] = useState({})
  const [leaderBoard, setLeaderBoard] = useState(false)

  let count = 1

  const getGames = () => {
    let url = `https://letigogames-v1.herokuapp.com/${id}`
    axios.get(url)
      .then(res => {
        setBanner(res.data.data.banner)
        setDesc(res.data.data.desc)
        setTitle(res.data.data.gamesname)
      })
  }

  const getUser= () => {
      let url = `https://letigogames-v1.herokuapp.com/games/${id}`;
      axios.get(url)
          .then((response) => {
            const array = response.data.data
            const arrayMap = array.map((player)=>{
              return{
                game: player.Game.gamesname,
                id: player.Player.id,
                username : player.Player.username,
                score: player.points,
              }
            })
            arrayMap.sort((a, b)=>{
              return  b.score - a.score 
            })
            setPlayers(arrayMap)
            setLeaderBoard(true)
            // const points = players.find((o)=> o.playerId === id).points
            // if(points){
            //   localStorage.setItem('score', points)
            // }else{
            //   localStorage.setItem('score', 0)
            // }
          })
          .catch(err => console.log(err))
  }

  const play = async () => {
    const selected = players.find((p) => p.id == data.id)
    if (selected) {
      localStorage.setItem('score', selected.score)
    } else {
      localStorage.setItem('score', 0)
    }
    navigate(`/${title}`)
  }

  useEffect(() => {
      document.title = 'Pingsut'
      dispatch(authenticatedAction());
      dispatch(getLeaderboard(id))
      getUser();
      getGames()
  }, [dispatch]);

  return (
    <>
    {!token && navigate('/login')}
    <div data-testid={"gamepage"} className="section">
      <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-lg-7">
              <Video url={banner}/>
            </div>
            <div className="col-lg-5">
              <h1 className="font-weight-light">{title}</h1>
              <p>
                {desc}
              </p>
              <div className="d-flex justify-content-start">
                <Link to='/'><button className="me-4 btn btn-danger">&laquo; back</button></Link>
                <button onClick={()=> play()} className="ms-2 px-4 btn btn-primary">play</button>
              </div>
            </div>
          </div>
            <div className="mx-auto" style={{width:'500px'}}>
                <h2 className='text-center mb-4'>Leader Board</h2>
                {!leaderBoard && 
                  <h4 className="text-center">No data</h4>
                }
                {leaderBoard &&
                <Table striped bordered hover className='leaderboard'>
                    <thead>
                        <tr>
                            <th className='text-white'>Rank</th>
                            <th className='text-white'>Username</th>
                            <th className='text-white'>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                      {players.map((player) =>{
                          return(
                            <tr key={player.id}>
                              <td className='text-white'>{count++}</td>
                              <td className='text-white'><Link to={{pathname:`/profile/${player.id}`}}>{player.username}</Link></td>
                              <td className='text-white'>{player.score}</td>
                            </tr>
                          )
                        })}
                    </tbody>
                </Table>
                }
            </div>
      </div>
    </div>
    </>
  );
}

export default GameDetail;