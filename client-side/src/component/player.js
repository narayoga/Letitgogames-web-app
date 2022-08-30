import React from "react";
import scissors from "../assets/scissor.png";
import paper from "../assets/paper.png";
import rock from "../assets/rock.png";

const Player = ({ hand }) => (
  <>
    <div className="player">
      <img
        style={{width:"150px", height:"150px", position:"relative", top:"175px"}}
        className="player-image"
        src={
          hand === "rock" ? rock : hand === "scissors" ? scissors : paper
        }
        alt="Rock Paper Scissors"
      />
    </div>
  </>
);

export default Player;