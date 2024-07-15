import React from 'react'
import { NavLink } from 'react-router-dom'
import '../ContestHeadStyle/Contests.css'

const Contest7 = () => {
    return (
        <div className='head-box'>
            <h2>Edition 7</h2>
            <ul>
                <li>
                    <NavLink to={'/tvef-odds/edition-7-final'}>Final</NavLink>
                </li>
                <li>
                    <NavLink to={'/tvef-odds/edition-7-sf-1'}>Semi Final 1</NavLink>
                </li>
                <li>
                    <NavLink to={'/tvef-odds/edition-7-sf-2'}>Semi Final 2</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Contest7