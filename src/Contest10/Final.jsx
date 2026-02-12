import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Contest10 from './Contest10'
import { edition10 } from '../JsFiles/Odds10'
import Odds from '../Pages/Odds'
import Participants from '../Pages/Participants'

const Final = () => {
    const [finalData, setFinalData] = useState([])
    const [pointsData, setPointsData] = useState([])
    const [waitClass, setWaitClass] = useState('')

    let counts = 0

    const callData = async () => {
        setWaitClass('wait-vote-adding')
        const data = edition10
        setFinalData(data.final)
        setWaitClass('')

        data.final.forEach(el => pointsData.push(el.puan1 + el.puan2))
        setPointsData(pointsData)
    }

    useEffect(() => {
        callData()
    }, [])

    let amount = 0, mainIndex = 0, n = pointsData.length, leader
    for (let j = 0; j < pointsData.length; j++) {
        for (let i = 0; i < n; i++) {
            if (pointsData[i] > amount) {
                mainIndex = i
                amount = pointsData[i]
            }
        }

        let changePoints = pointsData[n - 1]
        pointsData[n - 1] = pointsData[mainIndex]
        pointsData[mainIndex] = changePoints

        let changeFinal = finalData[n - 1]
        finalData[n - 1] = finalData[mainIndex]
        finalData[mainIndex] = changeFinal

        leader = finalData[0].countryName

        n--
        mainIndex = 0
        amount = 0
    }

    let total = pointsData.reduce((a, b) => a + b, 0)

    let indexArray = [], listOfUp = [], listOfDown = []
    finalData.forEach(e => indexArray.push(e.id))

    if (localStorage.getItem('indexArrayOfFinal')) {
        const localArray = localStorage.getItem('indexArrayOfFinal').split(',')
        indexArray.forEach(e => {
            if (indexArray.indexOf(e) < localArray.indexOf(e)) listOfUp.push(e)
            else if (indexArray.indexOf(e) > localArray.indexOf(e)) listOfDown.push(e)
        })
    }

    let indexArrayForLocal = []
    finalData.forEach(e => {
        indexArrayForLocal.push(e.id)
        localStorage.setItem('indexArrayOfFinal', indexArrayForLocal)
    })

    return (
        <>
            <Contest10 />
            <div className='contest-participants'>
                <div className={`wait-vote ${waitClass}`}>
                    <button>please wait ...</button>
                </div>

                <Odds
                    finalData={finalData}
                    pointsData={pointsData}
                    leader={leader}
                    listOfUp={listOfUp}
                    listOfDown={listOfDown}
                    total={total}
                    edition={10}
                />

                <Participants finalData={finalData} />
            </div>
        </>
    )
}

export default Final
