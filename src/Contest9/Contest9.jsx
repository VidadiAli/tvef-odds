import React from 'react'
import { NavLink } from 'react-router-dom'
import '../ContestHeadStyle/Contests.css'

const Contest9 = () => {
    return (
        <div className='head-box'>
            <h2>Edition 9</h2>
            <ul>
                <li>
                    <NavLink to={'/tvef-odds/edition-9-final'}>Final</NavLink>
                </li>
                <li>
                    <NavLink to={'/tvef-odds/semi-final-1-ed-9'}>Semi Final 1</NavLink>
                </li>
                <li>
                    <NavLink to={'/tvef-odds/semi-final-2-ed-9'}>Semi Final 2</NavLink>
                </li>
                <li>
                    <NavLink to={'/tvef-odds/juri-ed-9'}>Jury</NavLink>
                </li>
                <li>
                    <NavLink to={'/tvef-odds/tele-ed-9'}>Tele</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Contest9