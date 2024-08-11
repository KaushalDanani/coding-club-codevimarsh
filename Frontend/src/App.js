import {React,useState,useEffect} from 'react';
import { UserProvider } from './store/userContext.js';
import PageLinks from './PageLinks.js'
import VantaBackground from './vantaBackground.js';

function App() {

  return (
    <>
      <VantaBackground />
      <UserProvider>
        <PageLinks />
      </UserProvider>
    </>
  );
}

export default App;
