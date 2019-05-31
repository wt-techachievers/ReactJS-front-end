import React, { Component, FormEvent } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";

interface IACServiceState{
    serviceType: string,
    iabTypeProblem:string[],
    iabTypeNoACUnits: string,
    iabTypeBrand: string[],
    buildingType: string,
    startTime: Date,
    startDate: Date,
    //[key: string]: any    
}

class BookingDetails extends React.Component<any,IACServiceState> {

    state={
        serviceType: "",
        iabTypeProblem:[],
        iabTypeNoACUnits: "0",
        iabTypeBrand: [],
        buildingType: "",
        startTime: new Date(),
        startDate: new Date()
    }

    radioHandler = (e:React.FormEvent<HTMLInputElement>) => {
        this.setState({[e.currentTarget.name]: e.currentTarget.value} as any);
    }

    handleDate = (e:any) =>{
        this.setState({startDate: e});
    }

    handleTime = (e:any) =>{
        this.setState({startTime:e.currentTarget.value});
    }

    textHandler = (e:any) =>{
        this.setState({iabTypeNoACUnits:e.currentTarget.value});
    }

    checkBoxHandler = (e:any,key:keyof IACServiceState) =>{
        let newarray = this.state[key] as string[];
        newarray.push(e.target.value);
        this.setState({[key]: newarray} as any);
    }

    submit =()=>{
        console.log(this.state);
        this.props.history.push("/acservice/location");
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                        <h3>AC Service</h3>
                    </Card.Header>
                    <Card.Body>
                        <Card>
                        <Card.Header className="text-primary">
                            <h3>Service Type</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form.Check 
                                type={"radio"}
                                id={`acCleaningRadio`}
                                name={'serviceType'}
                                label={`AC Cleaning`}
                                value = {`AC Cleaning`}
                                onChange={this.radioHandler}>
                            </Form.Check>
                            <Form.Check 
                                type={"radio"}
                                name={'serviceType'}
                                id={`acInstallationRadio`}
                                label={`AC Installation`}
                                value={`AC Installation`}
                                onChange={this.radioHandler}>
                            </Form.Check>
                            <Form.Check 
                                type={"radio"}
                                name={'serviceType'}
                                id={`acRepairRadio`}
                                label={`AC Repairing`}
                                value={`AC Repairing`}
                                onChange={this.radioHandler}>
                            </Form.Check>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header className="text-primary">
                            <h3>Information and Building Type</h3>
                        </Card.Header>
                        <Card.Body>
                        <Form.Group>
                            <Form.Label><h5>Tell Us Your Problem</h5></Form.Label>
                            <Form.Check 
                                type={"checkbox"}
                                id={`problemCheckbox1`}
                                name={'iabTypeProblem'}
                                label={`AC is not cold`}
                                value={`AC is not cold`}
                                onChange={(e:any)=>this.checkBoxHandler(e,"iabTypeProblem")}>
                            </Form.Check>
                            <Form.Check 
                                type={"checkbox"}
                                name={'iabTypeProblem'}
                                id={`problemCheckbox2`}
                                label={`AC Smells foul`}
                                value={`AC Smells foul`}
                                onChange={(e:any)=>this.checkBoxHandler(e,"iabTypeProblem")}>
                            </Form.Check>
                            <Form.Check 
                                type={"checkbox"}
                                name={'iabTypeProblem'}
                                id={`problemCheckbox3`}
                                label={`Others`}
                                value={`Others`}
                                onChange={(e:any)=>this.checkBoxHandler(e,"iabTypeProblem")}>
                            </Form.Check>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><h5>No. Of AC Units</h5></Form.Label>
                            <Form.Control
                                type="text"
                                name="iabTypeNoACUnits"
                                value={this.state.iabTypeNoACUnits}
                                onChange={this.textHandler}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><h5>Your AC Brand</h5></Form.Label>
                            <div>
                                <Row>
                                    <Col lg="2">
                                        <Form.Check 
                                            inline 
                                            type={"checkbox"}
                                            id={`brandCheckbox1`}
                                            name={'iabTypeBrand'}
                                            label={`LG`}
                                            value={`LG`}
                                            onChange={(e:any)=>this.checkBoxHandler(e,"iabTypeBrand")}>
                                        </Form.Check>
                                    </Col>
                                    <Col>
                                        <Form.Check 
                                            inline 
                                            type={"checkbox"}
                                            name={'iabTypeBrand'}
                                            id={`brandCheckbox2`}
                                            label={`Panasonic`}
                                            value={`Panasonic`}
                                            onChange={(e:any)=>this.checkBoxHandler(e,"iabTypeBrand")}>
                                        </Form.Check>
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                <Row>
                                    <Col lg="2">
                                        <Form.Check 
                                            inline 
                                            type={"checkbox"}
                                            name={'iabTypeBrand'}
                                            id={`brandCheckbox3`}
                                            label={`Samsung`}
                                            value={`Samsung`}
                                            onChange={(e:any)=>this.checkBoxHandler(e,"iabTypeBrand")}>
                                        </Form.Check>
                                    </Col>
                                    <Col>
                                        <Form.Check 
                                            inline 
                                            type={"checkbox"}
                                            id={`brandCheckbox4`}
                                            name={'iabTypeBrand'}
                                            label={`Sharp`}
                                            value={`Sharp`}
                                            onChange={(e:any)=>this.checkBoxHandler(e,"iabTypeBrand")}>
                                        </Form.Check>
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                <Row>
                                    <Col lg="2">
                                        <Form.Check 
                                            inline 
                                            type={"checkbox"}
                                            name={'iabTypeBrand'}
                                            id={`brandCheckbox5`}
                                            label={`Daikin`}
                                            value={`Daikin`}
                                            onChange={(e:any)=>this.checkBoxHandler(e,"iabTypeBrand")}>
                                        </Form.Check>
                                    </Col>
                                    <Col>
                                        <Form.Check 
                                            inline 
                                            type={"checkbox"}
                                            name={'iabTypeBrand'}
                                            id={`brandCheckbox6`}
                                            label={`Others`}
                                            value={`Others`}
                                            onChange={(e:any)=>this.checkBoxHandler(e,"iabTypeBrand")}>
                                        </Form.Check>
                                    </Col>
                                </Row>    
                            </div>
                        </Form.Group>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header className="text-primary">
                            <h3>Your Building Type</h3>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col lg="2">
                                    <Form.Check 
                                        type={"radio"}
                                        id={`houseRadio`}
                                        name={'buildingType'}
                                        label={`House`}
                                        value={`House`}
                                        onChange= {this.radioHandler}>
                                    </Form.Check>
                                </Col>
                                <Col>
                                    <Form.Check 
                                        type={"radio"}
                                        id={`appartmentRadio`}
                                        name={'buildingType'}
                                        label={`Apartment (+Rp. 25,000)`}
                                        value={`Apartment (+Rp. 25,000)`}
                                        onChange= {this.radioHandler}>
                                    </Form.Check>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="2">
                                    <Form.Check 
                                        type={"radio"}
                                        id={`homeOfficeRadio`}
                                        name={'buildingType'}
                                        label={`Home Office (+Rp. 25,000)`}
                                        value={`Home Office (+Rp. 25,000)`}
                                        onChange= {this.radioHandler}>
                                    </Form.Check>
                                </Col>
                                <Col>
                                    <Form.Check 
                                        type={"radio"}
                                        id={`officeBuildingRadio`}
                                        name={'buildingType'}
                                        label={`Office Building (+Rp. 25,000)`}
                                        value={`Office Building (+Rp. 25,000)`}
                                        onChange= {this.radioHandler}>
                                    </Form.Check>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Header className="text-primary">
                            <h3>When Do You Need Our Service?</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Date</Form.Label>
                                <div>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleDate}
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                    />
                                </div>
                                
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Time</Form.Label>
                                <Form.Control as="select"
                                    onChange = {this.handleTime}>
                                    <option>8:00</option>
                                    <option>9:00</option>
                                    <option>10:00</option>
                                    <option>11:00</option>
                                    <option>12:00</option>
                                    <option>13:00</option>
                                    <option>14:00</option>
                                    <option>15:00</option>
                                    <option>16:00</option>
                                    <option>17:00</option>
                                    <option>18:00</option>
                                    <option>19:00</option>
                                </Form.Control>
                            </Form.Group>
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
                    <Button 
                        variant="primary"
                        size="lg"
                        onClick={this.submit}>Next</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default BookingDetails;