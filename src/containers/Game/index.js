import React, { useState } from 'react';
import dragon from '../../assets/images/dragon.jpg';
import hero from '../../assets/images/hunter.png';
import '../../assets/css/game.css';
import { randomIntFromInterval } from '../../helpers';
import axios from 'axios';
import HpComponent from '../../components/HpComponent';
import ActivityComponent from '../../components/ActivityComponent';

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

  /**
   * Hunter Attack
   */
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
  
  /**
   * Hunter Slash
   */
  const handleOnClickSlash =  () => {
    const attack = randomIntFromInterval(5, 15);
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

  /**
   * Hunter Spirit Blade
   */
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

  /**
   * Hunter gives up
   */
  const handleOnClickGiveUp = () => {
    setSuccessMessage('Hunter Gives Up, Rathalos Wins');
    setModalStyle({
      display: 'block'
    });
    savePlayerDetails('NO');
  }

  /**
   * Monster Attack
   */
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
    let hunterLife = hunterHp - damage;
    if (hunterLife < 0) {
      hunterLife = 0;
    }
    setHunterHp(hunterLife);
    setStyleHunterHp({width: `${hunterLife}%`});
    setTurn('hunter');
    checkLife(monsterHp, hunterLife);
  }

  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Check monster and hunters life
   * @param {int} monster 
   * @param {int} hunter 
   */
  const checkLife = (monster, hunter) => {
    if (hunter <= 0) {
      setTurn('');
      setModalStyle({
        display: 'block'
      });
      setSuccessMessage('Rathalos Wins');
      savePlayerDetails('NO');
    }
    if (monster <= 0) {
      setTurn('');
      setModalStyle({
        display: 'block'
      });
      setSuccessMessage('Hunter Wins');
      savePlayerDetails('YES');
    }

  };

  /**
   * Save player details
   * @param {string} isWinner 
   */
  const savePlayerDetails = (isWinner) => {
    axios.post('https://dragonslayer-app.herokuapp.com/players', {
      player_id: props.player_id,
      is_winner: isWinner
    });
  };

  return (
    <>
      <div className="container">
        <div className="row py-5">
          <div className="hunter-container col-sm-6">
            <img src={hero} alt="Hunter" />
            <p>Hunter (Player Id: {props.player_id})</p>
            {/* ========= HP Component ======== */}
            <HpComponent hp={hunterHp} style={styleHunterHp} />
            <br />
            <div>
              <button
                className="mx-2 btn btn-warning"
                disabled={turn === 'monster'}
                onClick={handleOnClickAttack}
              >
                Attack
              </button>
              <button
                className="mx-2 btn btn-info"
                disabled={turn === 'monster'}
                onClick={handleOnClickSlash}
              >
                Slash
              </button>
              <button
                className="mx-2 btn btn-primary"
                onClick={handleOnClickSpiritBlade}
                disabled={superAttackMin === 0 || turn === 'monster'}
              >
                {superAttackMin > 0 ? superAttackMin : 0} Spirit Blade
              </button>
              <button
                className="mx-2 btn btn-secondary"
                onClick={handleOnClickGiveUp}
                disabled={turn === 'monster'}
              >
                Give Up
              </button>
            </div>
            <br />
            {/* ========= Activity Component ======== */}
            <ActivityComponent activity={hunterActivity} />
          </div>
          <div className="col-sm-6 monster-container">
            <img src={dragon} alt="Rathalos Dragon" />
            <p>Rathalos Dragon</p>
            {/* ========= HP Component ======== */}
            <HpComponent hp={monsterHp} style={styleMmonsterHp} />
            <br />
            <div>
              <button 
                className="mx-2 btn btn-warning"
                disabled={turn === 'hunter'}
                onClick={handleOnClickAttack}
              >
                Bite
              </button>
              <button
                className="mx-2 btn btn-info"
                disabled={turn === 'hunter'}
                onClick={handleOnClickSlash}
              >
                Claw Attack
              </button>
              <button
                className="mx-2 btn btn-primary" 
                onClick={handleOnClickSpiritBlade}
                disabled={turn === 'hunter'}
              >
                Blast
              </button>
            </div>
            <br />
            {/* ========= Activity Component ======== */}
            <ActivityComponent activity={monsterActivity} />
          </div>
        </div>
      </div>
      <div 
        className="modal fade show"
        id="exampleModal"
        data-backdrop="static"
        style={modalStyle}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              {successMessage === 'Hunter Wins' ? (<img src={hero} alt="Hunter" className="dragon" />) : (<img src={dragon} alt="Rathalos" className="dragon" />)}
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