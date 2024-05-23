import React from 'react'
import { NavLink } from 'react-router-dom'
import './Head.css'

const Head = () => {
    return (
        <div className='head'>
            <h1>ODDS</h1>
            <h1>The Voice Of EuroFans</h1>
            <h2>Edition 9</h2>

            <div>
                <ul>
                    <li>
                        <NavLink to={'/tvef-odds/'}>Final</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/tvef-odds/semi-final-1'}>Semi Final 1</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/tvef-odds/semi-final-2'}>Semi Final 2</NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to={'/tvef-odds/juri'}>Juri</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/tvef-odds/tele'}>Tele</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Head