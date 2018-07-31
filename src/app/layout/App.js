import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';

class App extends Component {
  render() {
    return (

        <Container className="main">
          <NavBar/>
          <h1>Where.Cash</h1>
         <EventDashboard/>
        </Container>

    );
  }
}

export default App;
