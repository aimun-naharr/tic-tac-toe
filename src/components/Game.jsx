import React, { useState } from 'react';
import Board from './Board';

const Game = ({channel}) => {
     const [playersJoined, setPlayersJoined]=useState(channel.state.watcher_count ===2)
     const [result, setResult]=useState({winner: 'none', state: 'none'})
    
     channel.on("user.watching.start", (event)=>{
          setPlayersJoined(event.watcher_count===2)
     })
     if(!playersJoined){
          return <h4>Waiting for other players to join....</h4>
     }
     return (
          <div>
               <Board result={result} setResult={setResult}/>
               {/* chat */}
               {/* leave game button */}
          </div>
     );
};

export default Game;