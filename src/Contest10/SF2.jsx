import React, { useEffect, useState } from 'react'
import Contest10 from './Contest10'
import { edition10 } from '../JsFiles/Odds10'
import SemiOdds from '../Pages/SemiOdds'

const SF2 = () => {
    const [finalData, setFinalData] = useState([])
    const [waitClass, setWaitClass] = useState('')

    const callData = async () => {
        setWaitClass('wait-vote-adding')
        const data = edition10

        const tempFinal = [...data.sf2]
        tempFinal.sort((b, a) => (b.puan1 + b.puan2) - (a.puan1 + a.puan2))

        setFinalData(tempFinal)
        setWaitClass('')
    }

    useEffect(() => {
        callData()
    }, [])

    const leader1 = finalData[0]?.countryName
    const leader2 = finalData[1]?.countryName
    const leader3 = finalData[2]?.countryName

    const indexArray = finalData.map(e => e.id)
    const listOfUp = []
    const listOfDown = []

    if (localStorage.getItem('indexArrayOfSf2')) {
        const localArrayFinal = localStorage.getItem('indexArrayOfSf2').split(',')
        indexArray.forEach(e => {
            if (indexArray.indexOf(e) < localArrayFinal.indexOf(e)) listOfUp.push(e)
            else if (indexArray.indexOf(e) > localArrayFinal.indexOf(e)) listOfDown.push(e)
        })
    }

    localStorage.setItem('indexArrayOfSf2', indexArray)

    return (
        <>
            <Contest10 />
            <SemiOdds
                finalData={finalData}
                listOfDown={listOfDown}
                listOfUp={listOfUp}
                waitClass={waitClass}
                leader1={leader1}
                leader2={leader2}
                leader3={leader3}
                edition={10}
                sf={2}
            />
        </>
    )
}

export default SF2
