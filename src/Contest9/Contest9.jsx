import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTrophy, FaStar, FaBroadcastTower, FaUsers } from "react-icons/fa"
import '../ContestHeadStyle/Contests.css'

const Contest9 = () => {
    return (
        <div className='contest-head'>
            <div className='contest-title'>
                <FaTrophy className='contest-icon' />
                <h2>Edition 9</h2>
            </div>

            <ul className='contest-nav'>
                <li>
                    <NavLink to={'/tvef-odds/edition-9-final'}>
                        <FaStar /> Final
                    </NavLink>
                </li>

                <li>
                    <NavLink to={'/tvef-odds/semi-final-1-ed-9'}>
                        <FaBroadcastTower /> Semi Final 1
                    </NavLink>
                </li>

                <li>
                    <NavLink to={'/tvef-odds/semi-final-2-ed-9'}>
                        <FaBroadcastTower /> Semi Final 2
                    </NavLink>
                </li>

                <li>
                    <NavLink to={'/tvef-odds/juri-ed-9'}>
                        <FaUsers /> Jury
                    </NavLink>
                </li>

                <li>
                    <NavLink to={'/tvef-odds/tele-ed-9'}>
                        <FaUsers /> Tele
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Contest9
