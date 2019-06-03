import React, { ReactNode } from "react";
// // import { compose, withProps } from "recompose";
// // import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
// // import PropTypes from 'prop-types';

// // interface IMapProp{
// //     isMarkerShown: boolean;
// //     onMarkerClick: Function;
// //     children?: ReactNode;
// // }

// // const MyMapComponent: React.ComponentClass<any, any> = compose(
// //   withProps({
// //     googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
// //     loadingElement: <div style={{ height: `100%` }} />,
// //     containerElement: <div style={{ height: `400px` }} />,
// //     mapElement: <div style={{ height: `100%` }} />,
// //   }),
// //   withScriptjs,
// //   withGoogleMap
// // )((props:any) =>
// //   <GoogleMap
// //     defaultZoom={6}
// //     defaultCenter={{ lat: 20.5937, lng: 78.9629 }}
// //   >
// //     {props.isMarkerShown && <Marker position={{ lat: 20.5937, lng: 78.9629 }} onClick={props.onMarkerClick} />}
// //   </GoogleMap>
// // )

// interface IPlace {
//      geometry: { 
//         viewport: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral; 
//         location: google.maps.LatLng | google.maps.LatLngLiteral; 
//     }; 
// }

// declare global {
//     interface Window {
//         google: any
//     }
// }

// const _ = require("lodash");
// const { compose, withProps, lifecycle } = require("recompose");
// const {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } = require("react-google-maps");
// const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

// const MapWithASearchBox: React.ComponentClass<any, any> = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAQgEocfa0-KiJyKq33KjO17LHg8x2Mg0M&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   lifecycle({
//     componentWillMount() {
//       const refs:any = {}

//       this.setState({
//         bounds: null,
//         center: {
//             lat: 20.5937, lng: 78.9629 
//         },
//         markers: [],
//         onMapMounted: (ref: any) => {
//           refs.map = ref;
//         },
//         onBoundsChanged: () => {
//           this.setState({
//             bounds: refs.map.getBounds(),
//             center: refs.map.getCenter(),
//           })
//         },
//         onSearchBoxMounted: (ref: any) => {
//           refs.searchBox = ref;
//         },
//         onPlacesChanged: () => {
//           const places: any = refs.searchBox.getPlaces();
//           const bounds = new window.google.maps.LatLngBounds();

//           places.forEach((place: IPlace) => {
//             if (place.geometry.viewport) {
//               bounds.union(place.geometry.viewport)
//             } else {
//               bounds.extend(place.geometry.location)
//             }
//           });
//           const nextMarkers = places.map((place: IPlace) => ({
//             position: place.geometry.location,
//           }));
//           const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

//           this.setState({
//             center: nextCenter,
//             markers: nextMarkers,
//           });
//           // refs.map.fitBounds(bounds);
//         },
//       })
//     },
//   }),
//   withScriptjs,
//   withGoogleMap
// )((props: { onMapMounted: any; center: any; onBoundsChanged: any; onSearchBoxMounted: any; bounds: any; onPlacesChanged: any; markers: { map: (arg0: (marker: any, index: any) => JSX.Element) => void; }; }) =>
//   <GoogleMap
//     ref={props.onMapMounted}
//     defaultZoom={6}
//     center={props.center}
//     onBoundsChanged={props.onBoundsChanged}
//   >
//     <SearchBox
//       ref={props.onSearchBoxMounted}
//       bounds={props.bounds}
//       controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
//       onPlacesChanged={props.onPlacesChanged}
//     >
//       <input
//         type="text"
//         placeholder="Customized your placeholder"
//         style={{
//           boxSizing: `border-box`,
//           border: `1px solid transparent`,
//           width: `240px`,
//           height: `32px`,
//           marginTop: `27px`,
//           padding: `0 12px`,
//           borderRadius: `3px`,
//           boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
//           fontSize: `14px`,
//           outline: `none`,
//           textOverflow: `ellipses`,
//         }}
//       />
//     </SearchBox>
//     {props.markers.map((marker:any, index:any) =>
//       <Marker key={index} position={marker.position} />
//     )}
//   </GoogleMap>
// );

// class MyFancyComponent extends React.Component {
//   state = {
//     isMarkerShown: false,
//   }

//   componentDidMount() {
//     //this.delayedShowMarker()
//   }

//   delayedShowMarker = () => {
//     setTimeout(() => {
//       this.setState({ isMarkerShown: true })
//     }, 3000)
//   }

//   handleMarkerClick = () => {
//     this.setState({ isMarkerShown: false })
//     this.delayedShowMarker()
//   }

//   render() {
//     return (
//     //   <MyMapComponent
//     //     isMarkerShown={this.state.isMarkerShown}
//     //     onMarkerClick={this.handleMarkerClick}
//     //   />
//         <MapWithASearchBox/>
//     )
//   }
// }

// export default MyFancyComponent;