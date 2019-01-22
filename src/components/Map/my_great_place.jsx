import React, {Component} from 'react';

import PropTypes from '../../../node_modules/prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';


export default class MyGreatPlace extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.state= {
      circleClassName: "circle-marker"
    }
  }

  changeMarkerColor = () => {
    if (this.props.available_bikes === 0) { 
      this.setState({
        circleClassName: "circle-marker-yellow"
      })
    }
  }
  
  componentDidMount = () => {
      this.changeMarkerColor()
  }

  render() {
    return (
       <div className="marker-container">
          <img className="marker" src={process.env.PUBLIC_URL+'/assets/images/map-marker-alt-solid.svg'} alt="marker" />
          <div className={this.state.circleClassName}>
            <a className="number-marker bigger">{this.props.available_bikes}</a>
          </div>
       </div>
    );
  }
}