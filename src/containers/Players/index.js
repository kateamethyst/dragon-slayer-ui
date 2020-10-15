import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import {playerReducer} from './reducer';
import { GET_PLAYERS } from './actions';
import dragon from '../../assets/images/dragon.jpg';
import hero from '../../assets/images/hunter.png';

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
      <div className="d-flex justify-content-center flex-wrap">
        {filteredPlayers.length > 0 ? 
        (filteredPlayers.map(player => {
          return (
            <div className="card mb-3 mx-2" key={player._id}>
              <div className="row no-gutters">
                <div className="col-md-4">
                  {player.is_winner === 'NO' ? <img src={dragon} className="card-img" alt="..." /> : <img src={hero} className="card-img" alt="..." />}
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Player ID: {player.player_id}</h5>
                    <p>{player.is_winner === 'YES' ? (<span className="text-success">Hunter Wins</span>) : (<span className="text-danger">Rathalos Wins</span>)}</p>
                    <p className="card-text"><small className="text-muted">Date Played: {moment(player.created_at).format('MMMM Do YYYY, h:mm:ss a')}</small></p>
                  </div>
                </div>
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
    </div>
  )
}

export default Players;