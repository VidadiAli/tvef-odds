import React from 'react'
import { NavLink } from 'react-router-dom'
import '../ContestHeadStyle/Contests.css'

const Contest8 = () => {
    return (
        <div className='head-box'>
            <h2>Edition 8</h2>
            <ul>
                <li>
                    <NavLink to={'/tvef-odds/edition-8-final'}>Final</NavLink>
                </li>
                <li>
                    <NavLink to={'/tvef-odds/edition-8-sf-1'}>Semi Final 1</NavLink>
                </li>
                <li>
                    <NavLink to={'/tvef-odds/edition-8-sf-2'}>Semi Final 2</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Contest8