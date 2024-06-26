import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import './Head.css'
import More from '../More/More'

const Head = () => {
    return (
        <div className='head'>
            <div>
                <h1 style={{ textAlign: 'center' }}>ODDS</h1>
                <h1 style={{ textAlign: 'center' }}>The Voice Of EuroFans</h1>
                <ul>
                    <li><NavLink to={'/tvef-odds/'}>Odds</NavLink></li>
                    <li><NavLink to={'/tvef-odds/ed-9-result-final'}>Result</NavLink></li>
                    <li><NavLink to={'/tvef-odds/more'}>More</NavLink></li>
                </ul>
                <Routes>
                    <Route path='/tvef-odds/more' element={<More />} />
                </Routes>
            </div>
        </div>
    )
}

export default Head