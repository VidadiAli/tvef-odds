import React from 'react'
import { NavLink } from 'react-router-dom'
import './More.css'

const More = () => {
    return (
        <div className='more-element'>
            <NavLink to={'/tvef-odds/'}>The Voice Of EuroFans - Edition 9</NavLink>
            <NavLink to={'/tvef-odds/edition-8-final'}>The Voice Of EuroFans - Edition 8</NavLink>
            <NavLink to={'/tvef-odds/edition-7-final'}>The Voice Of EuroFans - Edition 7</NavLink>
        </div>
    )
}

export default More