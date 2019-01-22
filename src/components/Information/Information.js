import React, { Component } from 'react';

import { Modal, ModalHeader, ModalBody, ModalFooter, Media } from 'reactstrap';

import '../Navbar/Navbar.css';
import './Information.css';

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: false
    };
  }
  
  toggleInformation = () => {
    this.setState({
      info: !this.state.info
    });
  }
    
  render = () => {
    return(
      <div>
        <div className="nav-link" onClick={this.toggleInformation}>
          <i className="fa fa-info-circle fa-2x"></i>
          <p className="ml-3- mt-3">Informations</p>
        </div>
        <Modal isOpen={this.state.info} toggle={this.toggleInformation} className={this.props.className}>
          <ModalHeader toggle={this.toggleInformation}><div className="title-info">Informations</div></ModalHeader>
          <ModalBody className="photoGit">
            <Media tag="p">
              <Media className="rounded-circle" src={process.env.PUBLIC_URL+'/assets/images/IMG_0588.JPG'} alt="Photo Geoffroy" />
              <a className="infoGit" href="https://github.com/geoffroy72" target="_blank" rel="noopener noreferrer">LAUGER Geoffroy </a>
            </Media>
            <Media tag="p">
              <Media className="rounded-circle" src={process.env.PUBLIC_URL+'/assets/images/Emilie.png'} alt="Photo Emilie" />
              <a className="infoGit" href="https://github.com/LeBihanEmilie" target="_blank" rel="noopener noreferrer">LE BIHAN Emilie</a>
            </Media>
            <Media tag="p">
              <Media className="rounded-circle" src={process.env.PUBLIC_URL+'/assets/images/Olivier.png'} alt="Photo Olivier" />
              <a className="infoGit" href="https://github.com/olivierbretaud" target="_blank"rel="noopener noreferrer">BRETAUD Olivier</a>
            </Media>
            <Media tag="p">
              <Media className="rounded-circle" src={process.env.PUBLIC_URL+'/assets/images/Marion.png'} alt="Photo Marion" />
              <a className="infoGit" href="https://github.com/mtouja" target="_blank" rel="noopener noreferrer">TOUJA Marion</a>
            </Media>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default Information;  