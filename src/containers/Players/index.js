import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import {playerReducer} from './reducer';
import { GET_PLAYERS } from './actions';

function Players () {
  const initialState = {
    players: ''
  };

  const [filteredPlayers, setFilteredPlayers] = useState([]);

  useEffect(() => {
      axios.get('https://dragonslayer-app.herokuapp.com/players')
        .then(response => {
            dispatch({
              type: GET_PLAYERS,
              payload: response.data
            });
            setFilteredPlayers(response.data)
        })
  }, []);

  const [state, dispatch] = useReducer(playerReducer, initialState);
  const [playerIdInput, setPlayerIdInput] = useState('');
  const {players} = state;

  /**
   * Search info by player id
   */
  const handleOnClickSearchPlayerId = () => {
    let currentfilteredPlayers = [];
    filteredPlayers.map(player => {
      if (player.player_id === playerIdInput) {
        return currentfilteredPlayers.push(player);
      }
    });
    setFilteredPlayers(currentfilteredPlayers);
  };

  /**
   * Reset search result
   */
  const handleOnClickReset = () => {
    setPlayerIdInput('');
    setFilteredPlayers(players);
  }
  return (
    <div className="container p-5">
      <div className="form-row text-right">
        <div className="form-group col-md-10 d-flex">
          <input 
            type="text"
            className="form-control"
            id="inputEmail4"
            value={playerIdInput}
            placeholder="Enter Player Id"
            onChange={evt => setPlayerIdInput(evt.target.value)} 
          />
        </div>
        <div className="form-group col-md-2">
          <button
            type="button"
            className="btn btn-primary"
            id="inputPassword4"
            onClick={handleOnClickSearchPlayerId}
          >
            Search
          </button>
          <button
            type="button"
            className="btn btn-secondary ml-1"
            id="inputPassword4"
            onClick={handleOnClickReset}
          >
            Reset
          </button>
        </div>
      </div>
      {filteredPlayers ? 
      (filteredPlayers.map(player => {
        return (
          <div className="card my-3" key={player.player_id}>
            <div className="card-body">
              <p>Player ID: {player.player_id}</p>
              <p>{player.is_winner === 'YES' ? (<span className="text-success">Hunter Wins</span>) : (<span className="text-danger">Rathalos Wins</span>)}</p>
              <p>Date Played: {moment(player.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
            </div>
          </div>
        )
      })) : (
        <div className="text-center">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default Players;