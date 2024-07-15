import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'

const Result = () => {

    const finalClicik = () => {
        localStorage.setItem('ed-9-result', "final");
    }

    const sf1Clicik = () => {
        localStorage.setItem('ed-9-result', "sf1");
    }

    const sf2Clicik = () => {
        localStorage.setItem('ed-9-result', "sf2");
    }

    return (
        <ul>
            <li>
                <NavLink to={'/tvef-odds/ed-9-result-final'} onClick={finalClicik}>Final Result</NavLink>
            </li>
            <li>
                <NavLink to={'/tvef-odds/ed-9-result-sf1'} onClick={sf1Clicik}>Semi Final 1 Result</NavLink>
            </li>
            <li>
                <NavLink to={'/tvef-odds/ed-9-result-sf2'} onClick={sf2Clicik}>Semi Final 2 Result</NavLink>
            </li>
        </ul>
    )
}

export default Result