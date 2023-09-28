'use client';
import React, { useEffect, useState } from 'react'

const LocalStorage = () => {
  const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;

  // Initialize the score from localStorage if available, or use defaults
  let score = isLocalStorageAvailable
    ? JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 }
    : { wins: 0, losses: 0, ties: 0 };

  const [current_score, setScore] = useState(score)

  useEffect(()=> {
    localStorage.setItem('score',JSON.stringify(current_score))
  }, [current_score])  

const handle_wins = () =>{
    setScore({...current_score, wins: current_score.wins + 1})
}
const handle_ties = () =>{
    setScore({...current_score, ties: current_score.ties + 1})
}

const handle_losses = () =>{
    setScore({...current_score, losses: current_score.losses + 1})
} 

const [label_result, setlabel] = useState("")
  
function gamehandle(playermove){
      const AI_move = Ai_pickmove();
      let result = ""
      
      if(playermove === 'rock'& AI_move ==='paper'){
        result = "You Lose"
        handle_losses()
      }else if(playermove ==='rock' & AI_move ==='scissor'){
        result = "You Win"
        handle_wins()
      }else if(playermove === 'paper' & AI_move ==='rock'){
        result = "You Win"
        handle_wins()
      }else if(playermove === 'paper' & AI_move === 'scissor'){
        result = "You Lose"
        handle_losses()
      }else if(playermove === 'scissor' & AI_move === 'rock'){
        result = "You Lose"
        handle_losses()
      }else if(playermove === 'scissor' & AI_move === 'paper'){
        result = "You Win"
        handle_wins()
      }else{
        result = "Tie"
        handle_ties()
      }
      // if(playermove ==='rock'){
      //   if(AI_move ==='paper'){
      //     result = "You Lose"
      //     handle_losses()
      //   }
      //   else if(AI_move === 'scissor'){
      //     result = "You Win"
      //     handle_wins()
      //   }else if(AI_move === 'rock'){
      //     result = "Tie"
      //     handle_ties()
      //   }
      // }

      setlabel(result)
      console.log("You choose: "+playermove+" AI choose: "+AI_move+" Result : "+label_result)
      //console.log('result is '+ label_result)
};

    function Ai_pickmove(){
      let random_numb = Math.round(Math.random()*2);
      let result = "";
      if(random_numb == 0){
        result = "rock"
      }else if(random_numb == 1){
        result = "paper"
      }else{
        result = "scissor"
      }
      return result;
    };
    const handle_reset = ()=>{
      setScore({wins:0,ties:0,losses:0})
     
      localStorage.removeItem('score')
    }
return(
  <div className='game-container'>
  <span className='title-label'><h1/> Rock Paper Scissor Game!</span>
  <div className='btn-container'>
  <button className='btn' type='submit' onClick={()=> gamehandle('rock')}>Rock</button>
  <button className='btn'onClick={()=> gamehandle('paper')} >Paper</button>
  <button className='btn' onClick={()=> gamehandle('scissor')}>Scissor</button>
  </div><span className='score-label'>
  <h1>wins: {current_score.wins}</h1>
  <h1>ties: {current_score.ties}</h1>
  <h1>losses: {current_score.losses}</h1>
  </span>
  <button onClick={handle_reset}>Reset</button>
  </div>
  )
}

export default LocalStorage