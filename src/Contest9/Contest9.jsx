import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Final from './Final'
import SF1 from './SF1'
import SF2 from './SF2'
import Tele from './Tele'
import Juri from './Juri'

const Contest9 = () => {
    return (
        <>
            <Routes >
                <Route path='/tvef-odds/' element={<Final />} />
                <Route path='/tvef-odds/semi-final-1' element={<SF1 />} />
                <Route path='/tvef-odds/semi-final-2' element={<SF2 />} />
                <Route path='/tvef-odds/tele' element={<Tele />} />
                <Route path='/tvef-odds/juri' element={<Juri />} />
            </Routes>
        </>
    )
}

export default Contest9