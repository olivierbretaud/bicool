import React, {Component} from 'react';

import'./Map.css';

import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';
import MyGreatPlace from './my_great_place.jsx';


function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.LEFT_CENTER,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_LEFT
    },
    mapTypeControl: true
  };
}


export default class Map extends Component {


shouldComponentUpdate = shouldPureComponentUpdate;

constructor (props) {
  super(props);
  this.state = {
      apiKey: "aa8ce1d08eafc1c6038c05e4e9a038db9b13df85",
      stations: []
  }
}


componentDidMount = () => {
  
  fetch(`https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=${this.state.apiKey}`)
  .then(response => response.json())
  .then (data => {
      this.setState({
          stations: data
      })
  })
}
  render = () => {   
    return (  
      <GoogleMap
        bootstrapURLKeys={{key: "AIzaSyCXELQtGxzFXprV3ln-eZ0eHUd9d9KyxBE"}}
        center={[47.218371, -1.553621]}
        zoom={15}
        options={createMapOptions}
        onChildClick={this.props.getMarker}>

        {this.state.stations.map((station,index) => (
          
        <MyGreatPlace key={index} station={station} lat={station.position.lat} lng={station.position.lng} available_bikes={station.available_bikes}/>)
        )}
      </GoogleMap>
    );
  }
}