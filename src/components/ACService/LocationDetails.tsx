import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

declare global {
    interface Window {
        google: any
    }
}

class LocationDetails extends Component {
    state = {
        providers: [
            {
                "area":"Adajan"
            }
        ],
        searchBox:new window.google.maps.places.SearchBox(ReactDOM.findDOMNode(this.refs.input))
    }

    onPlacesChanged = () => {
        console.log(this.state.searchBox.getPlaces());
        // if (this.props.onPlacesChanged) {
        //   this.props.onPlacesChanged(this.state.searchBox.getPlaces());
        // }
        // console.log(this.state.searchBox.getPlaces());
    }
    componentDidMount() {
        let searchBox = new window.google.maps.places.SearchBox(ReactDOM.findDOMNode(this.refs.input));
        searchBox.addListener('places_changed', this.onPlacesChanged);
        this.setState({searchBox:searchBox});
      }
      componentWillUnmount() {
        // https://developers.google.com/maps/documentation/javascript/events#removing
        window.google.maps.event.clearInstanceListeners(this.state.searchBox);
      }

    render() {
        return (
            <div>
               <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyBzut5kO7frGAfdrNOlP91UEizpSz8IVVk"}}
                        defaultCenter={ { lat: 40.7446790, lng: -73.9485420 } }
                        defaultZoom={ 11 }>
                    </GoogleMapReact>
                </div>
                <input ref="input" type="text"/>;
            </div>
        )
    }
}

export default LocationDetails;

// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// interface IProps {
//     google:any
// }
// const style = {
//     width: '100%',
//     height: '100%'
// }
// export class LocationDetails extends React.Component<IProps> {
//     constructor(props:any){
//         super(props);
//     }

//     onMarkerClick = (e:any) =>{
//         console.log(e);
//     }

//     onInfoWindowClose = (e:any) =>{
//         console.log(e);
//     }

//     render() {
//     return (
//         <div style={{marginLeft:".5%", marginTop:".1%", height: '50px', width: '100px' }}>
//             <Map google={this.props.google} zoom={14}>
//             </Map>
//             {/* <Marker onClick={this.onMarkerClick}
//                     name={'Current location'} />

//             <InfoWindow onClose={this.onInfoWindowClose}>
//                 <div>
//                 <h1>{"this.state.selectedPlace.name"}</h1>
//                 </div>
//             </InfoWindow> */}
//         </div>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: ("AIzaSyBzut5kO7frGAfdrNOlP91UEizpSz8IVVk")
// })(LocationDetails);