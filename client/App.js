import React from 'react'

import Navbar from './components/Navbar'
import Routes from './Routes'

const App = () => {
  const killKaboom = () => {
    console.log(`Location: ${window.location.pathname}`)
    if(window.location.pathname !== "/game"){
    document.getElementsByTagName("CANVAS")[0].remove()
    console.log("Killing Kaboom...")
  }
}
  return (
    <div onClick={killKaboom}>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
