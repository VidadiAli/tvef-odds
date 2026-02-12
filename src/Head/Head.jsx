import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { FaMicrophoneAlt, FaFire } from "react-icons/fa";
import './Head.css'
import More from '../More/More'

const Head = () => {
    return (
        <div className='head'>
            <div className='head-container'>

                <div className='logo'>
                    <FaMicrophoneAlt className='logo-icon' />
                    <h1>ODDS</h1>
                </div>

                <p className='subtitle'>
                    <FaFire className='fire-icon' />
                    The Voice Of EuroFans
                </p>

                <ul className='nav-menu'>
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
