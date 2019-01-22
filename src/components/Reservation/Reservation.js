import React, {Component} from 'react';
import Modale from '../Modale/Modale';

import { InputGroup, InputGroupAddon,InputGroupText, Button } from 'reactstrap';

import './Reservation.css';

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 1
    };
    //permet de passer la méthode reset en func de la méthode handleResetClicks dans App
    this.props.handleResetClicks(this.reset);
  }

  IncrementItem = () => {
    if (this.state.clicks <= this.props.available_bikes - 1) {
      this.setState({ clicks: this.state.clicks + 1 });
    }
  }

  DecreaseItem = () => {
    if (this.state.clicks >= 2) {
      this.setState({ clicks: this.state.clicks - 1 });
    }
  }
 //méthode pour remettre à 1 le nombre sélectionné de vélo
  reset = () => {
    this.setState({clicks: 1});
  }

  render = () => {

    let nameAdress = this.props.address;
    let arrayAdress = nameAdress.split("-");
    let name = arrayAdress[0];
    let adress = arrayAdress[1];

    return (
      <div id={this.props.anim} className="bg-grey shadow-resa">
        <div className="wrapper-reservation p-0">
          <div className="box">
            <div className="title-box text-center">
                <i className="fa fa-user text-orange"></i>
                <h3 className="font-weight-bold text-orange">Ma réservation</h3>
            </div>
            <div className="adress-box text-center">
              <h6 className="font-weight-bold"><i className="fa fa-map-marker"></i></h6>
              <h5 className="adress font-weight-bold">{name}</h5>
              <span className="adress">{adress}</span>
              <div className="nb-bicycle-adress">
                <span className="number-size text-orange font-weight-bold">{this.props.available_bikes}</span><br/>
                <span className="font-weight-bold"> vélos disponibles</span>
              </div>
              <div className="nb-bicycle-adress">
                <span className="number-size text-orange font-weight-bold">{this.props.available_bike_stands}</span><br/>
                <span className="font-weight-bold"> places libres</span>
              </div>
            </div>
            {/* Condition there is more than 0 bikes*/}
            {this.props.available_bikes !== 0 ?
              <div className="reservation-box text-center">
                <span className="font-weight-bold">Nombre de vélos<br/>
                    que vous souhaitez réserver
                </span>
                <InputGroup className="my-3 text-center">
                  <InputGroupAddon addonType="prepend">
                    <Button className="minus btn-sm" onClick={this.DecreaseItem}>
                      <i className="fa fa-minus align-middle"></i>
                    </Button>
                  </InputGroupAddon>
                  <InputGroupText className="btn-sm">
                    <div className="nb-bicycle font-weight-bold text-orange">{this.state.clicks}</div>
                  </InputGroupText>
                  <InputGroupAddon addonType="append">
                    <Button className="plus btn-sm" onClick={this.IncrementItem}>
                      <i className="fa fa-plus align-middle"></i>
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                <div className="button-box">
                  <Modale removeReservation={this.props.removeReservation} timerTrue={this.props.timerTrue} displayTimer={this.props.displayTimer} numberBikes={this.state.clicks} addressStation={this.props.address}/>
                </div>
              </div> 
              : 
              <div className="reservation-box text-center">
                <h6 className="font-weight-bold text-danger">Aucun vélo <br/>n'est disponible</h6>
              </div>
            }
            {/* End Condition there is more than 0 bikes*/}
          </div>
        </div>
      </div>
    )
  }
}

export default Reservation;