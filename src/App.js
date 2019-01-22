import React, { Component } from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Reservation from './components/Reservation/Reservation';
import Timer from './components/Timer/Timer';
import Map from './components/Map/Map';

class App extends Component {
  constructor() {
    super();
    this.state = {
      enableTimer: false,
      address: "",
      available_bike_stands: 0,
      available_bikes: 0,
      station: [],
      enableReservation: false,
      timeToEnd: 1200,
      timerMinutes: "20",
      timerSeconds: "00",
      enableButton: false,
      funcResetClicks: null
    };
  }

  componentDidMount = () => {
    this.handleTimer();
  }

  toggleRenderTimer = () => {
    this.setState({
      enableTimer: !this.state.enableTimer
    })
  }

  toggleRemoveResa = () => {
    this.setState({
      enableReservation: !this.state.enableReservation
    }) 
  }

  handleResetClicks = (func) => {
    this.setState({funcResetClicks: func});
  }

  //Code Réservation, Map
  getMarkerStation = (key, param) => {
    if(this.state.enableReservation) {
      this.state.funcResetClicks();
    }
    this.setState({
      address: param.station.address,
      available_bike_stands: param.station.available_bike_stands,
      available_bikes: param.station.available_bikes,
      enableReservation: true,
      enableButton: true
    })
  }

  handleTimer = () => {
    if(localStorage.getItem('reservation')) {
      let reservation = JSON.parse(localStorage.getItem('reservation'));
      let reservationDelay = (Date.now() - reservation.date) / 1000;
      if(reservationDelay < this.state.timeToEnd) {
        this.setState({
          timeToEnd: Math.round(this.state.timeToEnd - reservationDelay)
        });
        this.toggleRenderTimer();
      } else {
        window.localStorage.clear("reservation");
      }
    }
  }

  render = () => {
    return (
      <div className="wrapper-full-page">
        <Navbar/>

        {this.state.enableButton ?

          <div>
            {this.state.enableReservation ?

            <div className="btn-display-resa text-center shadow-resa" onClick={this.toggleRemoveResa}><i className="fa fa-angle-right fa-3x align-middle"></i></div>
            :
            <div className="btn-display-resa text-center shadow-resa" onClick={this.toggleRemoveResa}><i className="fa fa-angle-left fa-3x align-middle"></i></div>
          
            }
          </div>
        :
        null }
        
        <Map getMarker={this.getMarkerStation}/>

        {this.state.enableButton ?

          <div>
            {this.state.enableReservation ?
            //handleResetClicks={this.handleResetClicks} permet de faire le lien entre le composent parent App et le composent enfant Reservation
            <Reservation anim="entry-reservation" handleResetClicks={this.handleResetClicks} removeReservation={this.toggleRemoveResa} timerTrue={this.state.enableTimer} displayTimer={this.toggleRenderTimer} address={this.state.address} available_bikes={this.state.available_bikes} available_bike_stands={this.state.available_bike_stands}  />
            :
            <Reservation anim="leave-reservation" handleResetClicks={this.handleResetClicks} timerTrue={this.state.enableTimer} displayTimer={this.toggleRenderTimer} address={this.state.address} available_bikes={this.state.available_bikes} available_bike_stands={this.state.available_bike_stands}  />
            }
          </div>
        :
        null }

        {this.state.enableTimer ? <Timer resetClicks={this.state.funcResetClicks} removeTimer={this.toggleRenderTimer} compteur={this.state.timeToEnd} /> : null}
      </div>
    );
  }
}

export default App;