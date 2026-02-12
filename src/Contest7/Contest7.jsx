import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTrophy, FaStar, FaBroadcastTower } from "react-icons/fa"
import '../ContestHeadStyle/Contests.css'

const Contest7 = () => {
    return (
        <div className='contest-head'>
            <div className='contest-title'>
                <FaTrophy className='contest-icon' />
                <h2>Edition 7</h2>
            </div>

            <ul className='contest-nav'>
                <li>
                    <NavLink to={'/tvef-odds/edition-7-final'}>
                        <FaStar /> Final
                    </NavLink>
                </li>

                <li>
                    <NavLink to={'/tvef-odds/edition-7-sf-1'}>
                        <FaBroadcastTower /> Semi Final 1
                    </NavLink>
                </li>

                <li>
                    <NavLink to={'/tvef-odds/edition-7-sf-2'}>
                        <FaBroadcastTower /> Semi Final 2
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Contest7
