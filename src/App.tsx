import React from 'react';
import './App.css';
import {MemoryRouterProps} from 'react-router';
import {Route,BrowserRouter, Link} from 'react-router-dom';
import Registration from "./components/Registration";
import LocationDetails from './components/ACService/LocationDetails';
// import MyFancyComponent from './components/ACService/MapComponent';
import BookingDetails from './components/ACService/BookingDetails';
import NavLink from 'react-bootstrap/NavLink';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import ListBookings from 'components/ACService/ListBookings';

class App extends React.Component {
  render(){
    return (
      <div >
        {/* <Registration/> */}
        
        {/* <BookingDetails/> */}
        <BrowserRouter>
          <Route exact path="/" component={ListBookings}></Route>
          <Route exact path="/registration" component={Registration}></Route>
          <Route exact path="/acservice/:userid" component={BookingDetails}></Route>
          <Route path="/acservice/location" component={LocationDetails}></Route>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state:IAppState)=>({
  auth: state.authState
});

export default connect(mapStateToProps)(App);
