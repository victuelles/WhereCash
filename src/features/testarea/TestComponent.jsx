import React, { Component } from 'react'
import { Button,Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { incrementCounter, decrementCounter } from './testActions'
import Script from 'react-load-script';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import GoogleMapReact from 'google-map-react';

const mapState = (state) => ({
  data: state.test.data
})

const actions = {
  incrementCounter,
  decrementCounter
}

const Marker=()=><Icon name ='marker' size='huge' color='green'/>
class TestComponent extends Component {
  state={
    addess:'',
    scriptLoaded:false
  }

  static defaultProps = {
    center: {
      lat: 37.3235774,
      lng: -122.039895
    },
    zoom: 12
  };

  handleScriptLoad=()=>{
    console.log("handleScriptLoad loaded")
    this.setState({scriptLoaded:true})
  }
  handleFormSubmit = (event) => {
    event.preventDefault()
  
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
  }
  
  onChange = (address) => this.setState({ address })

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
    const {incrementCounter, decrementCounter, data} = this.props;
    return (
      <div>
      {/*Script
        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAF5EOiEiSMLh5d7afJ7cdj-oum9zUdsmI&libraries=places"
        onLoad={this.handleScriptLoad}
      */}
     
        <h1>Google Marker demo</h1>
        <h3> Whole Foods location</h3>
        <section style={{display:'none'}}>
        <h3>The answer is: {data}</h3>
        <Button onClick={incrementCounter} color='green' content='Increment' />
        <Button onClick={decrementCounter} color='red' content='Decrement' />
        <br/>
        <form onSubmit={this.handleFormSubmit}>
        {this.state.scriptLoaded && <PlacesAutocomplete inputProps={inputProps} /> }
          <button type="submit">Submit</button>
      </form>
        </section>
       <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyAF5EOiEiSMLh5d7afJ7cdj-oum9zUdsmI" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={37.3235774}
            lng={-122.039895}
            text={'Whole Foods'}
          />
        </GoogleMapReact>
      </div>
      </div>
    )
  }
}

export default connect(mapState, actions)(TestComponent)