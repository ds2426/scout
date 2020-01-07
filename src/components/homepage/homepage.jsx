import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from '../header';
import './homepage.scss';

export const Homepage = (props) => {
  return (
    <>
     <Header />
     <Container className="homepage-copy">
       <Container>
           <h1>Welcome to Scout warehouse managment!</h1>
           <p>Use the navigation in the header to start adding inventory</p>
       </Container>
      </Container>
    </>
  );
}
