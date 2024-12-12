import React from 'react'
import { NavLink } from 'react-router-dom'
import '../ContestHeadStyle/Contests.css'

const Contest10 = () => {
    return (
        <div className='head-box'>
            <h2>Edition 10</h2>
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
                {/* <li>
                    <NavLink to={'/tvef-odds/juri'}>Jury</NavLink>
                </li>
                <li>
                    <NavLink to={'/tvef-odds/tele'}>Tele</NavLink>
                </li> */}
            </ul>
        </div>
    )
}

export default Contest10