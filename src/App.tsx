import React from 'react';
import './App.css';
import {Route,BrowserRouter} from 'react-router-dom';
import Registration from "./components/Registration";
import LocationDetails from './components/ACService/LocationDetails';
import BookingDetails from './components/ACService/BookingDetails';
import NavLink from 'react-bootstrap/NavLink';

const App: React.FC = () => {
  return (
    <div >
      {/* <Registration/> */}
      <a href="/acservice">Click here to move forward</a>
      {/* <BookingDetails/> */}
      <BrowserRouter>
        <Route exact path="/acservice" component={BookingDetails}></Route>
        <Route path="/acservice/location" component={LocationDetails}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
