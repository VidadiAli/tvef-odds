import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTrophy, FaStar, FaBroadcastTower } from "react-icons/fa"
import '../ContestHeadStyle/Contests.css'

const Contest8 = () => {
    return (
        <div className='contest-head'>
            <div className='contest-title'>
                <FaTrophy className='contest-icon' />
                <h2>Edition 8</h2>
            </div>

            <ul className='contest-nav'>
                <li>
                    <NavLink to={'/tvef-odds/edition-8-final'}>
                        <FaStar /> Final
                    </NavLink>
                </li>

                <li>
                    <NavLink to={'/tvef-odds/edition-8-sf-1'}>
                        <FaBroadcastTower /> Semi Final 1
                    </NavLink>
                </li>

                <li>
                    <NavLink to={'/tvef-odds/edition-8-sf-2'}>
                        <FaBroadcastTower /> Semi Final 2
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Contest8
