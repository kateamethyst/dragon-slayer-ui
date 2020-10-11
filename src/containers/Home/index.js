import React, { useEffect, useReducer, useState } from 'react';
import dragon from '../../assets/images/dragon.jpg';
import { generateBase62UuId } from '../../helpers';
import axios from 'axios';
import Game from '../Game/index';
import {dragonSlayerReducer} from './reducer';
import { SET_PLAYER_ID } from './actions';


function Home () {
  const initialState = {
    player_id: ''
  };

  const [isHidden, setIsHidden] = useState(true);

  const handleOnClickPlayNow = () => {
    setIsHidden(false);
  };

  useEffect(() => {
    dispatch({
      type: SET_PLAYER_ID,
      payload: generateBase62UuId()
    });
  }, []);

  const [state, dispatch] = useReducer(dragonSlayerReducer, initialState);
  const {player_id} = state;
  return (
    <>
      <div className="home" hidden={!isHidden}>
        <div className="text-center align-center pt-5">
          <p className="fontLucky pt-5">Dragon Slayer</p>
          <button onClick={handleOnClickPlayNow} type="button" className="btn btn-dark btn-lg">Play Now</button>
        </div>
      </div>
      <div className="text-center align-center" hidden={isHidden}>
        <Game player_id={player_id} />
      </div>
    </>
  )
}

export default Home;