import React, { Component } from 'react';

import './Modale.css';

import 'react-notifications/lib/notifications.css';

import Signature from 'react-another-signature-pad';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NotificationManager, NotificationContainer } from 'react-notifications';

class Modale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      signature:"",
    };

    this.isSubmitDisabled = true; 
  }
 
  toggleModalReservation = () => {
    this.setState({
      modal: !this.state.modal,
      signature:"", // permet d'effacer la signature et d'en refaire un nouvelle/ bouton grisé à nouveau.
    });
  }

  setReservation = () => {
    localStorage.setItem("reservation", JSON.stringify({
      date: Date.now(),
      bikes: this.props.numberBikes,
      address: this.props.addressStation,
      signatureB64: this.state.signature
    }));

		NotificationManager.success('Votre réservation est bien confirmée. ', 'Félicitations !', 5000);
    this.toggleModalReservation();
    this.props.displayTimer();
    this.props.removeReservation();
	}

  // to end va appeler cette méthode pour envoyer cette signature en base 64
  handleSignatureChange = (data) => {
    this.setState({ signature: data });
  }

  render = () => {
    if (this.state.signature === "") {
      this.isSubmitDisabled = true;  
    } else {
      this.isSubmitDisabled = false;
    }
    return (
      <div>
        {this.props.timerTrue ? <Button color="danger" className="disabled btn-lg">Réservation indisponible</Button> : <Button color="danger" className="btn-lg"onClick={this.toggleModalReservation}>Réserver</Button>}
        <Modal isOpen={this.state.modal} toggle={this.toggleModalReservation} className={this.props.className} backdrop="static">
          <ModalHeader className="text-center pt-modale" toggle={this.toggleModalReservation}>
          </ModalHeader>
          <ModalBody className="modal-box">
          <div className="modal-title">
          <i className="fa fa-bicycle "></i>
          <h4 className="text-dark">Je valide ma réservation</h4>
          </div>
            <p className="title-modal">Signature électronique ci-dessous</p>
            <div className="signature col-md-12">
               {/* Début signature électronique  */}
              <Signature onEnd={this.handleSignatureChange} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary col-md-6" onClick={this.toggleModalReservation}>Annuler</Button>{' '}
            <Button color="success col-md-6"  disabled={this.isSubmitDisabled} onClick={ () => { this.setReservation(); }}>
              Confirmer
            </Button>
          </ModalFooter>
        </Modal>
        <NotificationContainer />
      </div>
    )
  }
}

export default Modale;