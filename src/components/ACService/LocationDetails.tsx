import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import MapGL from 'react-map-gl'
import { Card, Row, Col, Button, Form, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import { updateLocationAcService } from 'action/acService';
import { IACServiceState } from './BookingDetails';
import {circle, inside, point} from '@turf/turf';
import {IServiceProviderInfo} from '../../reducer/acService';
import Rating from 'react-rating';

declare global{
    interface Window{
        mapboxgl:any;
        MapboxGeocoder:any;
    }
}


class LocationDetails extends React.Component<any> {
    state = {
        viewport: {
            width: 1400,
            height: 300,
            latitude: 20.5937,
            longitude: 78.9629,
            zoom: 5
        },
        searchResult: {},
        address: "",
        bookingAreas: [],
        searchResultError: false
    }
    
    mapRef = React.createRef<MapGL>()
    
    componentDidMount() {
        let self = this;
        window.mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbnRhbnNvbmkxIiwiYSI6ImNqdmMxOHh1MzFkeWk0NG15bWJlbDYwN2sifQ.MT1hxtqXFw4QAXZ8MyfzCQ';
        var map = new window.mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [78.9629, 20.5937],
        zoom: 4
        });
        
        var geocoder = new window.MapboxGeocoder({
        accessToken: window.mapboxgl.accessToken,
        types: 'poi',
        // see https://docs.mapbox.com/api/search/#geocoding-response-object for information about the schema of each response feature
        render: function(item:any) {
        // extract the item's maki icon or use a default
        var maki = item.properties.maki || 'marker';
        return "<div class='geocoder-dropdown-item'><img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/" + maki + "-15.svg'><span class='geocoder-dropdown-text'>" + item.text + "</span></div>";
        },
        mapboxgl: window.mapboxgl
        });
        map.addControl(geocoder);


        geocoder.on('result', function(e:any) {
            self.setState({searchResult:e.result});
            var options:any = {steps: 10, units: 'kilometers', properties: {foo: 'bar'}};
            let filteredArea = self.props.acBookings.ServiceProviderInfo.filter((splocation:IServiceProviderInfo)=>{
                var dcircle = circle(splocation.coordinates, 5, options);
                let searchResults:any = self.state.searchResult;
                return inside(point(searchResults.geometry.coordinates),dcircle);
            });

            self.setState({
                bookingAreas: filteredArea
            });
        });
    }

    textHandler=(e:any)=>{
        this.setState({[e.target.name]: e.target.value} as any);
    }

    setLocation=()=>{
        let s_no:number = +this.props.location.pathname.split("/").slice(-1)[0];
        let bookings = this.props.acBookings.Bookings.map((booking:IACServiceState)=> {
            if(booking.s_no === s_no){
                if(Object.entries(this.state.searchResult).length === 0 && this.state.searchResult.constructor === Object){
                    booking.location = this.state.viewport;
                }else{
                    booking.location = this.state.searchResult;
                }
                booking.additionalAdd = this.state.address;
                booking.bookingAreas = this.state.bookingAreas;
            }
            return booking;
        });
        this.props.updateLocationAcService(bookings);
    }

    submit = async()=>{
        if(Object.entries(this.state.searchResult).length === 0 && this.state.searchResult.constructor === Object){
            await this.setState({searchResultError: true});
        }else{
            await this.setState({searchResultError: false});
        }
        if(!this.state.searchResultError){
            this.setLocation();
            console.log(this.state.bookingAreas);
            this.props.history.push("/");
        }
    }

    previous =()=>{
        this.setLocation();
        this.props.history.push("/acservice/0");
    }

    handleViewportChange = (viewport:any) => {
        this.setState({
          viewport: { ...this.state.viewport, ...viewport }
        })
    }
    
    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    handleGeocoderViewportChange = (viewport:any) => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };
        return this.handleViewportChange({
          ...viewport,
          ...geocoderDefaultOverrides
        })
    }
    
    render() {
        return (
            <div>
                {/* <Card >
                    <Card.Header>
                        <h4>Your Location</h4>
                    </Card.Header>
                    <Card.Body>
                        <Card>
                            <Card.Body >
                            <MapGL
                                ref={this.mapRef}
                                {...this.state.viewport}
                                onViewportChange={this.handleViewportChange}
                                mapboxApiAccessToken={"pk.eyJ1IjoiY2hpbnRhbnNvbmkxIiwiYSI6ImNqdmMxOHh1MzFkeWk0NG15bWJlbDYwN2sifQ.MT1hxtqXFw4QAXZ8MyfzCQ"}
                            >
                                <Marker latitude={this.state.viewport.latitude} longitude={this.state.viewport.longitude} offsetLeft={-20} offsetTop={-10} >
                                <img style={{width:"50px",height:"50px"}} src="http://www.iconninja.com/files/827/534/352/map-marker-icon.png"></img>
                                </Marker>
                                <Geocoder
                                    mapRef={this.mapRef}
                                    onViewportChange={this.handleGeocoderViewportChange}
                                    mapboxApiAccessToken={"pk.eyJ1IjoiY2hpbnRhbnNvbmkxIiwiYSI6ImNqdmMxOHh1MzFkeWk0NG15bWJlbDYwN2sifQ.MT1hxtqXFw4QAXZ8MyfzCQ"}
                                />
                            </MapGL>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header className="text-primary">
                                <h3>Address</h3>
                            </Card.Header>
                            <Card.Body>
                                <Form.Control 
                                name="address"
                                onChange = {this.textHandler}
                                as="textarea" rows="3"
                                />        
                            </Card.Body>
                        </Card>
                        <Row>
                            <Col lg="2">
                                <Form.Label>Price</Form.Label>
                            </Col>
                            <Col lg="2">
                                <Form.Label >60.00</Form.Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="2">
                                <Button 
                                variant="dark"
                                size="lg"
                                onClick={this.previous}>Back</Button>
                            </Col>
                            <Col lg="2">
                                <Button 
                                variant="primary"
                                size="lg"
                                onClick={this.submit}>Next</Button>
                            </Col>
                        </Row>
                        
                    </Card.Body>
                </Card> */}
                <Card >
                    <Card.Header>
                        <h4>Your Location</h4>
                    </Card.Header>
                    <Card.Body>
                        <Card>
                            <Card.Body style={{width:"600px",height:"300px"}}>
                                <div id='map'></div>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                {
                                    this.state.searchResultError && 
                                    <Form.Control.Feedback style={{display:"block"}} type="invalid">
                                        Please Search your nearby location.
                                    </Form.Control.Feedback>
                                }
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header className="text-primary">
                                <h3>Your Address</h3>
                            </Card.Header>
                            <Card.Body>
                                <Form.Control 
                                name="address"
                                onChange = {this.textHandler}
                                as="textarea" rows="3"
                                />        
                            </Card.Body>
                        </Card>
                        <Card >
                            <Card.Header>
                                <h4>Area Service Provider Info</h4>
                            </Card.Header>
                            <Card.Body>
                                <Table striped bordered hover className="text-align-center">
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th>Area Name</th>
                                        <th>Rating</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.bookingAreas.length > 0 && this.state.bookingAreas.map((area:any,index)=>(
                                            <tr key={index}>
                                                <td>{index +1}</td>
                                                <td>{area.area}</td>
                                                <td><Rating
                                                        initialRating={area.rating}
                                                        readonly={true}
                                                        emptySymbol="far fa-star"
                                                        fullSymbol="fas fa-star"
                                                        fractions={5}
                                                        />
                                                    <Form.Label>{"("+area.rating+")"}</Form.Label>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>    
                        <Row>
                            <Col lg="2">
                                <Form.Label>Price</Form.Label>
                            </Col>
                            <Col lg="2">
                                <Form.Label >60.00</Form.Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="2">
                                <Button 
                                variant="dark"
                                size="lg"
                                onClick={this.previous}>Back</Button>
                            </Col>
                            <Col lg="2">
                                <Button 
                                variant="primary"
                                size="lg"
                                onClick={this.submit}>Next</Button>
                            </Col>
                        </Row>
                        
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state:IAppState)=>({
    acBookings: state.serviceState
});

export default connect(mapStateToProps,{ updateLocationAcService })(LocationDetails);



