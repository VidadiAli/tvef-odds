import './App.css'
import Head from './Head/Head'
import { Route, Routes } from 'react-router-dom'

import ResultFinal from './Result/ResultFinal'

import Final from './Contest9/Final'
import SF1 from './Contest9/SF1'
import SF2 from './Contest9/SF2'
import Juri from './Contest9/Juri'
import Tele from './Contest9/Tele'

import Contest8 from './Contest8/Contest8'

import FinalSeven from './Contest7/FinalSeven'
import SF1Seven from './Contest7/SF1Seven'
import SF2Seven from './Contest7/SF2Seven'
import FinalEight from './Contest8/FinalEight'
import SF1Eight from './Contest8/SF1Eight'
import SF2Eight from './Contest8/SF2Eight'


import ResultSf1 from './Result/ResultSf1'
import ResultSf2 from './Result/ResultSf2'




function App() {

  return (
    <section className='main-section'>

      <Head />

      <Routes >
        <Route path='/tvef-odds/ed-9-result-final' element={<ResultFinal />} />

        <Route path='/tvef-odds/' element={<Final />} />
        <Route path='/tvef-odds/semi-final-1' element={<SF1 />} />
        <Route path='/tvef-odds/semi-final-2' element={<SF2 />} />
        <Route path='/tvef-odds/juri' element={<Juri />} />
        <Route path='/tvef-odds/tele' element={<Tele />} />

        <Route path='/tvef-odds/edition-7-final' element={<FinalSeven />} />
        <Route path='/tvef-odds/edition-7-sf-1' element={<SF1Seven />} />
        <Route path='/tvef-odds/edition-7-sf-2' element={<SF2Seven />} />


        <Route path='/tvef-odds/edition-8-final' element={<FinalEight />} />
        <Route path='/tvef-odds/edition-8-sf-1' element={<SF1Eight />} />
        <Route path='/tvef-odds/edition-8-sf-2' element={<SF2Eight />} />


        <Route path='/tvef-odds/ed-9-result-sf1' element={<ResultSf1 />} />

        <Route path='/tvef-odds/ed-9-result-sf2' element={<ResultSf2 />} />

      </Routes>

    </section>
  )
}

export default App
