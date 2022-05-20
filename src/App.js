import React from 'react'
import Users from './components/Users'

import GlobalContextProvider from './context/GlobalContext';


function App() {

  return (    
    <GlobalContextProvider>                      
        <Users key='usersList'/>      
    </GlobalContextProvider>
  );
}

export default App;
