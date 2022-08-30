import React from 'react'
import ReactPlayer from 'react-player'

function Video(props) {
  const {url} = props
  return (
    <div style={{width: "100%"}}>
      <div style={{margin: "0 auto", width: "640px"}}>
        {/* <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' /> */}
        <ReactPlayer
            url= {url}
            controls = {true}
            />
      </div>
    </div>
  );
}

export default Video;