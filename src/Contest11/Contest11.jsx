import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaTrophy, FaStar, FaBroadcastTower } from "react-icons/fa"
import '../ContestHeadStyle/Contests.css'

const Contest11 = () => {
    return (
        <div className='contest-head'>
            <div className='contest-title'>
                <FaTrophy className='contest-icon' />
                <h2>Edition 11</h2>
            </div>

            <ul className='contest-nav'>
                <li>
                    <NavLink to={'/tvef-odds/'}>
                        <FaStar /> Final
                    </NavLink>
                </li>

                <li>
                    <NavLink to={'/tvef-odds/heat-1'}>
                        <FaBroadcastTower /> Heat 1
                    </NavLink>
                </li>

                <li>
                    <NavLink to={'/tvef-odds/heat-2'}>
                        <FaBroadcastTower /> Heat 2
                    </NavLink>
                </li>

                <li>
                    <NavLink to={'/tvef-odds/heat-3'}>
                        <FaBroadcastTower /> Heat 3
                    </NavLink>
                </li>

                <li>
                    <NavLink to={'/tvef-odds/heat-4'}>
                        <FaBroadcastTower /> Heat 4
                    </NavLink>
                </li>

                <li>
                    <NavLink to={'/tvef-odds/heat-5'}>
                        <FaBroadcastTower /> Heat 5
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Contest11
