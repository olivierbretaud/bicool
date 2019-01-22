import React, { Component } from 'react'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

import './Contact.css';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      question: '',
      modal: false
    };

    this.isSubmitDisabled = true;
  }

  handleChangeEmail = (event) => {
    this.setState({email: event.target.value});
  }

  handleChangeQuestion = (event) => {
    this.setState({question: event.target.value});
  }


  toggleModaleContact = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
 

  render = () => {

    if( this.state.email.length > 0 &&  this.state.question.length > 0 ) {
      this.isSubmitDisabled = false;
    } else {
      this.isSubmitDisabled = true;
    }
    
    return (
      <div>
        <div className="nav-link"  onClick={this.toggleModaleContact}>
          <i className="fa fa-envelope fa-2x"></i>
          <p className="ml-3- mt-3">Contact</p>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModaleContact} className={this.props.className}>
          <ModalHeader toggle={this.toggleModaleContact}><div className="title-contact">Contact</div></ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="exampleEmail">Votre Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="" value={this.state.email} onChange={this.handleChangeEmail} />
            </FormGroup>
            <FormGroup >
              <Label for="exampleQuestion">Votre question</Label>
                <Input type="textarea" name="question" id="" value={this.state.question} onChange={this.handleChangeQuestion}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" disabled={this.isSubmitDisabled} onClick={this.toggleModaleContact}>Envoyer</Button>
         </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Contact;