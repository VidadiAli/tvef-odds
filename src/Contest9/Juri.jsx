import React, { useEffect, useState } from 'react'
import Contest9 from './Contest9'
import { mainScoreBoard } from '../JsFiles/MainJs'
import Odds from '../Pages/Odds'
import Participants from '../Pages/Participants'

const Juri = () => {
    const [finalData, setFinalData] = useState([])
    const [pointsData, setPointsData] = useState([])
    const [waitClass, setWaitClass] = useState('')

    const callData = async () => {
        const data = mainScoreBoard
        setFinalData(data.juri)
        data.juri.forEach((el) => pointsData.push(el.puan1 + el.puan2))
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

        let changeElement1 = pointsData[n - 1]
        pointsData[n - 1] = pointsData[mainIndex]
        pointsData[mainIndex] = changeElement1

        let changeElement2 = finalData[n - 1]
        finalData[n - 1] = finalData[mainIndex]
        finalData[mainIndex] = changeElement2

        leader = finalData[0].countryName
        n--
        mainIndex = 0
        amount = 0
    }

    let total = pointsData.reduce((a, b) => a + b, 0)

    let indexArray = [], listOfUp = [], listOfDown = []
    finalData.forEach((e) => indexArray.push(e.id))

    if (!localStorage.getItem('indexArrayOfJuri')) indexArray = []
    else {
        const localArrayFinal = localStorage.getItem('indexArrayOfJuri').split(',')
        indexArray.forEach((e) => {
            if (indexArray.indexOf(e) < localArrayFinal.indexOf(e)) listOfUp.push(e)
            else if (indexArray.indexOf(e) > localArrayFinal.indexOf(e)) listOfDown.push(e)
        })
    }

    let indexArrayForLocal = []
    finalData.forEach((e) => {
        indexArrayForLocal.push(e.id)
        localStorage.setItem('indexArrayOfJuri', indexArrayForLocal)
    })

    return (
        <>
            <Contest9 />
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
                    edition={9}
                />

                <Participants finalData={finalData} />
            </div>
        </>
    )
}

export default Juri
