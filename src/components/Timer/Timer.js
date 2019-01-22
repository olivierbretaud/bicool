import React, { Component }from "react";
import './Timer.css';

import InfoTimer from '../InfoTimer/InfoTimer';
import { NotificationManager } from 'react-notifications';

class Timer extends Component {

  constructor(props) { 
    super(props);
    this.compteur = props.compteur;

    let placeholderTimerSec = '';
    let placeholderTimerMin = '';

    if(Math.floor(props.compteur / 60) < 10) {
      placeholderTimerMin = '0';
    }
    if(Math.round(props.compteur % 60) < 10) {
      placeholderTimerSec = '0';
    }

    this.state = {
      minutes: placeholderTimerMin + Math.floor(props.compteur / 60).toString(),
      seconds: placeholderTimerSec + Math.round(props.compteur % 60).toString()
    }

    this.interval = setInterval(() => {
      if(this.compteur - 1 < 0) {
        clearInterval(this.interval);
      } else {
        this.compteur -= 1;
      }

      this.setState({
        seconds: this.compteur % 60,
        minutes: Math.floor(this.compteur / 60)
      })

      if(this.state.minutes < 10) {
        this.setState({
          minutes: "0" + this.state.minutes
        })
      }

      if(this.state.seconds < 10) {
        this.setState({
          seconds: "0" + this.state.seconds
        })
      }
    }, 1000, true);
  }
  
	endLocation = () => {
    NotificationManager.warning('Temps de location écoulé.', 'Fin de location !', 15000);
    window.localStorage.clear("reservation");
    this.props.removeTimer();
  }
  
  render = () => {
    if (this.state.minutes <= 0 && this.state.seconds <= 0) {
      this.endLocation();
    }
    return(
      <div id='timer-box'>
        <div id="time-contain">
          <div id="timer">
            <span id="chrono">{`${this.state.minutes}:${this.state.seconds}`}</span>
          </div>
          <div id="info-box">
            <div className="circle-info">
              <InfoTimer resetClicks={this.props.resetClicks} removeTimer={this.props.removeTimer} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Timer;