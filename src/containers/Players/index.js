import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import {playerReducer} from './reducer';
import { GET_PLAYERS } from './actions';


function Players () {
  const initialState = {
    players: ''
  };


  useEffect(() => {
      axios.get('http://localhost:4000/players')
        .then(response => {
            dispatch({
              type: GET_PLAYERS,
              payload: response.data
            });
        })
  }, []);

  const [state, dispatch] = useReducer(playerReducer, initialState);
  const {players} = state;
  return (
    <div className="container p-5">
      {players ? 
      (players.map(player => {
        return (
          <div className="card my-3">
            <div className="card-body">
              <p>Player ID: {player.player_id}</p>
              <p>{player.is_winner === 'YES' ? (<span className="text-success">Hunter Wins</span>) : (<span className="text-danger">Rathalos Wins</span>)}</p>
              <p>Date Played: {moment(player.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
            </div>
          </div>
        )
      })) : ''
      }
    </div>
  )
}

export default Players;