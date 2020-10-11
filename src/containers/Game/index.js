import React, { useEffect, useState } from 'react';
import dragon from '../../assets/images/dragon.jpg';
import hero from '../../assets/images/hunter.png';
import '../../assets/css/game.css';
import { randomIntFromInterval } from '../../helpers';
import axios from 'axios';


function Game (props) {
  const [styleHunterHp, setStyleHunterHp] = useState({
    width: '100%'
  });

  const [styleMmonsterHp, setStyleMonsterHp] = useState({
    width: '100%'
  });

  const [modalStyle, setModalStyle] = useState({
    display: 'none'
  });
  const [superAttackMin, setSuperAttackMin] = useState(2);

  const [hunterHp, setHunterHp] = useState(100);
  const [monsterHp, setMonsterHp] = useState(100);
  const [turn, setTurn] = useState('hunter');

  const [hunterActivity, setHunterActivity] = useState([]);
  const [monsterActivity, setMonsterActivity] = useState([]);

  const handleOnClickAttack =  () => {
    const attack = randomIntFromInterval(3, 5);
    let currentHp = (monsterHp - attack) < 0 ? 0 : (monsterHp - attack);
    setMonsterHp(currentHp);
    setStyleMonsterHp({width: `${currentHp}%`});
    setHunterActivity([
      `Hunter use attack against Rathalos with a damage deal of ${attack}`,
      ...hunterActivity
    ]);
    setTurn('monster');
    checkLife(currentHp, hunterHp);
    setTimeout(() => {
      monsterAttack();
    }, 1500);
  };
  
  const handleOnClickSlash =  () => {
    const attack = randomIntFromInterval(5, 20);
    let currentHp = (monsterHp - attack) < 0 ? 0 : (monsterHp - attack);
    setMonsterHp(currentHp);
    setStyleMonsterHp({width: `${currentHp}%`});
    setHunterActivity([
      `Hunter use slash against Rathalos with a damage deal of ${attack} ${attack > 10 ? '. Critical Hit!!' : '' }`,
      ...hunterActivity
    ]);
    setTurn('monster');
    checkLife(currentHp, hunterHp);
    setTimeout(() => {
      monsterAttack();
    }, 1500);
  };

  const handleOnClickSpiritBlade =  () => {
    const attack = randomIntFromInterval(25, 25);
    let currentHp = (monsterHp - attack) < 0 ? 0 : (monsterHp - attack);
    if (superAttackMin > 0) {
      setMonsterHp(currentHp);
      setStyleMonsterHp({width: `${currentHp}%`});
      setTurn('monster');
      setHunterActivity([
        `Hunter use Spirit Blade against Rathalos with a damage deal of ${attack}`,
        ...hunterActivity
      ]);
      checkLife(currentHp, hunterHp);
      setTimeout(() => {
        monsterAttack();
      }, 1500);
    }

    setSuperAttackMin(superAttackMin - 1);
  };

  const handleOnClickHeal =  () => {
    const heal = randomIntFromInterval(10, 20);
    let currentHp = hunterHp + heal;
    setHunterHp(currentHp);
    setStyleHunterHp({width: `${currentHp}%`});
    setTurn('monster');
    checkLife(currentHp, hunterHp);
    setHunterActivity([
      `Hunter use Heal and gain ${heal} hp`,
      ...hunterActivity
    ]);
    setTimeout(() => {
      monsterAttack();
    }, 1500);
  };
  console.log(props);
  const monsterAttack = () => {
    let damage = randomIntFromInterval(4, 20);
    if (damage <= 5) {
      setMonsterActivity([
        `Rathalos use Bite against Hunter with a damage deal of ${damage}`,
        ...monsterActivity
      ]);
    }

    if (damage <= 10 && damage > 5) {
      setMonsterActivity([
        `Rathalos use Claw Attack against Hunter with a damage deal of ${damage}`,
        ...monsterActivity
      ]);
    }

    if (damage >= 11) {
      setMonsterActivity([
        `Rathalos use Blast against Hunter with a damage deal of ${damage}`,
        ...monsterActivity
      ]);
    }
    let hunterLife = (hunterHp - damage) <= 0 ? 0 : (hunterHp - damage);
    setHunterHp(hunterLife);
    setStyleHunterHp({width: `${hunterLife}%`});
    setTurn('hunter');
    checkLife(monsterHp, hunterLife);
  }

  const [successMessage, setSuccessMessage] = useState('');
  const checkLife = (monster, hunter) => {
    if (hunter <= 0) {
      setModalStyle({
        display: 'block'
      });
      setSuccessMessage('Rathalos Wins');
      savePlayerDetails('NO');
    }
    if (monster <= 0) {
      setModalStyle({
        display: 'block'
      });
      setSuccessMessage('Hunter Wins');
      savePlayerDetails('YES');
    }

  };

  const savePlayerDetails = (isWinner) => {
    axios.post('https://dragonslayer-app.herokuapp.com/players', {
      player_id: props.player_id,
      is_winner: isWinner
    });
  };

  const handleOnClickGiveUp = () => {
    setSuccessMessage('Hunter Gives Up, Rathalos Wins');
    setModalStyle({
      display: 'block'
    });
    savePlayerDetails('NO');
  }

  return (
    <>
      <div className="container">
        <div className="row py-5">
          <div className="hunter-container col-sm-6">
            <img src={hero} alt="Hunter" />
            <p>Hunter (Player Id: {props.player_id})</p>
            <div className="progress">
              <div className="progress-bar bg-success" role="progressbar" aria-valuenow={monsterHp} aria-valuemin="0" aria-valuemax="100" style={styleHunterHp}></div>
            </div>
            <br />
            <div>
              <button className="mx-2 btn btn-warning" disabled={turn === 'monster'} onClick={handleOnClickAttack}>Attack</button>
              <button className="mx-2 btn btn-info" disabled={turn === 'monster'} onClick={handleOnClickSlash}>Slash</button>
              <button className="mx-2 btn btn-primary" onClick={handleOnClickSpiritBlade} disabled={superAttackMin === 0 || turn === 'monster'}>{superAttackMin > 0 ? superAttackMin : 0} Spirit Blade</button>
              <button className="mx-2 btn btn-success" disabled={turn === 'monster'} onClick={handleOnClickHeal}>Heal</button>
              <button className="mx-2 btn btn-secondary" onClick={handleOnClickGiveUp} disabled={turn === 'monster'}>Give Up</button>
            </div>
            <br />
            <div className="activity p-3 text-left">
              {hunterActivity ? hunterActivity.map((activity, index) => {
                return (
                  <p key={index}>{activity}</p>
                ); 
              }) : ''}
            </div>
          </div>
          <div className="col-sm-6 monster-container">
            <img src={dragon} alt="Rathalos Dragon" />
            <p>Rathalos Dragon</p>
            <div className="progress">
              <div className="progress-bar bg-success" role="progressbar" aria-valuenow={monsterHp} aria-valuemin="0" aria-valuemax="100" style={styleMmonsterHp}></div>
            </div>
            <br />
            <div>
              <button className="mx-2 btn btn-warning" disabled={turn === 'hunter'} onClick={handleOnClickAttack}>Bite</button>
              <button className="mx-2 btn btn-info" disabled={turn === 'hunter'} onClick={handleOnClickSlash}>Claw Attack</button>
              <button className="mx-2 btn btn-primary" onClick={handleOnClickSpiritBlade} disabled={turn === 'hunter'}>Blast</button>
            </div>
            <br />
            <div className="activity p-3 text-left">
              {monsterActivity ? monsterActivity.map((activity, index) => {
                return (
                  <p key={index}>{activity}</p>
                ); 
              }) : ''}
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade show" id="exampleModal" data-backdrop="static" style={modalStyle} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              {successMessage === 'Rathalos Wins' ? (<img src={dragon} className="dragon" />) : (<img src={hero} className="dragon" />)}
              <h3 className="py-3">{successMessage}</h3>
              <button type="button" className="btn btn-primary btn-lg" data-dismiss="modal" onClick={() => {window.location = '/'}}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Game;