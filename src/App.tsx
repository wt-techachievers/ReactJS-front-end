import React from 'react';
import './App.css';
import {Route,BrowserRouter, Link} from 'react-router-dom';
import Registration from "./components/Registration";
import LocationDetails from './components/ACService/LocationDetails';
// import MyFancyComponent from './components/ACService/MapComponent';
import BookingDetails from './components/ACService/BookingDetails';
import NavLink from 'react-bootstrap/NavLink';

const App: React.FC = () => {
  return (
    <div >
      {/* <Registration/> */}
      
      {/* <BookingDetails/> */}
      <BrowserRouter>
        <Link to="/acservice">Click here to move forward</Link>
        <Route exact path="/registration" component={Registration}></Route>
        <Route exact path="/acservice" component={BookingDetails}></Route>
        <Route path="/acservice/location" component={LocationDetails}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
