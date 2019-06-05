import React, { Component } from 'react'
import { Table, Card, Modal } from 'react-bootstrap';
import { IAppState } from 'store';
import { connect } from 'react-redux';
import { IACServiceState } from './BookingDetails';
import { Button } from 'react-bootstrap';
import { updateLocationAcService } from 'action/acService';
import { Link } from 'react-router-dom';

class ListBookings extends React.Component<any> {

    state={
        show:false,
        selectedRow: undefined
    }


    handleClose = () => {
        this.setState({ show: false });
    }

    removeBookingHandler = () =>{
        this.handleClose();
        let bookings = this.props.acBookings.Bookings.filter((booking:IACServiceState)=> {
            if(booking.s_no === this.state.selectedRow){
                return false;
            }
            return true;
        });
        this.props.updateLocationAcService(bookings);
    }

    handleShow =(e:any,s_no:number) => {
        this.setState({ show: true, selectedRow: s_no });

    }

    render() {
        let tableBody = this.props.acBookings.Bookings.map((booking:IACServiceState,index:number)=>(
            <tr key={index}>
                <td >{index+1}</td>
                <td >{booking.serviceType}</td>
                <td >{booking.additionalAdd}</td>
                <td >{booking.location.properties.address}</td>
                <td >{booking.startDate.toDateString()}</td>
                <td >{booking.startTime}</td>
                <td ><Button>Update</Button><br/><Button onClick={(e:any)=>this.handleShow(e,booking.s_no)} variant="danger">Cancel Booking</Button></td>
            </tr>
        ));
        return (
            <div>
                <Card >
                    <Card.Header>
                        <h4 style={{float:"left"}}>Your Bookings</h4> 
                        <Link className="btn btn-primary" style={{width:"12%", float:"right"}} to="/acservice/0">+ More bookings</Link>
                    </Card.Header>
                    <Card.Body>
                    <Table striped bordered hover variant="dark" className="text-align-center">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Service Type</th>
                            <th>Address</th>
                            <th>Area</th>
                            <th>Date</th>
                            <th>Requested Time</th>
                            <th>Update/Cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure ?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You want to delete this booking!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                        No
                        </Button>
                        <Button variant="primary" onClick={this.removeBookingHandler}>
                        Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state:IAppState)=>({
    acBookings: state.serviceState
});

export default connect(mapStateToProps,{ updateLocationAcService })(ListBookings);
