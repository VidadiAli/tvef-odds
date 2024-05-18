import { Route, Routes } from 'react-router-dom'
import './App.css'
import Head from './Head/Head'
import Final from './Contest9/Final'
import SF1 from './Contest9/SF1'
import SF2 from './Contest9/SF2'

function App() {

  return (
    <section className='main-section'>

      <Head />

      <Routes >
        <Route path='/tvef-odds/' element={<Final />} />
        <Route path='/tvef-odds/semi-final-1' element={<SF1 />} />
        <Route path='/tvef-odds/semi-final-2' element={<SF2 />} />
      </Routes>

    </section>
  )
}

export default App
