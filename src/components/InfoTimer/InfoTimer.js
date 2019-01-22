import React, { Component } from 'react';

import './InfoTimer.css';
import 'react-notifications/lib/notifications.css';

import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { NotificationManager } from 'react-notifications';

class InfoTimer extends Component {
  constructor(props) {
    super(props);
		this.state = {
			popoverOpen: false
		};
	}
	
	togglePopover = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
	}

	cancelLocation = () => {
    if(this.props.resetClicks) {
      this.props.resetClicks();
    }
    NotificationManager.warning('Votre réservation est annulée. ', 'Annulation', 5000);
    window.localStorage.clear("reservation");
    this.togglePopover();
    this.props.removeTimer();
	}

	render = () => {
		return(
			<div>
				<a className="nav-link"id="Popover1" onClick={this.togglePopover}>
					<i className="fa fa-info-circle fa-2x infobutton"></i>	
				</a>
				<Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.togglePopover}>
					<PopoverHeader>Vous avez une réservation<br/> en cours.
					</PopoverHeader>
					<PopoverBody>
						<Button outline color="warning" size="sm" onClick={ () => { this.cancelLocation() }} >Annuler réservation</Button>
					</PopoverBody>
				</Popover>
			</div>
		)
	}
}

export default InfoTimer;