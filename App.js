import React from 'react'
import AppNavigation from '@navigation/AppNavigation'
import { UsuarioProvider } from '@context/UsuarioContext'
import NavigationService from '@components/NavigationService';


function App(){
  return (
    <UsuarioProvider>
      <AppNavigation
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </UsuarioProvider>
  )
}

export default App