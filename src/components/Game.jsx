import React, { useState } from 'react';
import Board from './Board';
import {Window, MessageList,  MessageInput} from 'stream-chat-react'

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
          <div className='w-[90%] mx-auto mt-[100px] '>
              <div className='w-full flex flex-col md:flex-row justify-around'>
              <Board result={result} setResult={setResult}/>
              <div className='bg-slate-700 px-8 py-4 drop-shadow-2xl rounded'>
              <Window>
               <MessageList className='custom-message-list' disableDateSeparator closeReactionSelectorOnClick hideDeletedMessages
               messageActions={['react']}/>
               <MessageInput noFiles/>
              </Window>
              </div>
              </div>
               {/* leave game button */}
          </div>
     );
};

export default Game;