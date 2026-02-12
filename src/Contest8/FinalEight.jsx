import React, { useEffect, useState } from 'react'
import Contest8 from './Contest8'
import Odds from '../Pages/Odds'
import Participants from '../Pages/Participants'
import axios from 'axios'
import { mainUrl8 } from '../Data/Data'

const FinalEight = () => {
    const [finalData, setFinalData] = useState([])
    const [pointsData, setPointsData] = useState([])
    const [waitClass, setWaitClass] = useState('')
    let counts = 0

    const callData = async () => {
        setWaitClass('wait-vote-adding')
        const data = (await axios.get(`${mainUrl8}final`)).data
        setFinalData(data)
        setWaitClass('')
        data.forEach(el => pointsData.push(el.puan1 + el.puan2))
        setPointsData([...pointsData])
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
        [pointsData[n - 1], pointsData[mainIndex]] = [pointsData[mainIndex], pointsData[n - 1]]
        [finalData[n - 1], finalData[mainIndex]] = [finalData[mainIndex], finalData[n - 1]]
        leader = finalData[0]?.countryName
        n--
        mainIndex = 0
        amount = 0
    }

    const total = pointsData.reduce((a, b) => a + b, 0)

    const indexArray = finalData.map(e => e.id)
    const listOfUp = [], listOfDown = []
    if (localStorage.getItem('indexArrayOfFinal')) {
        const localArrayFinal = localStorage.getItem('indexArrayOfFinal').split(',')
        indexArray.forEach(e => {
            if (indexArray.indexOf(e) < localArrayFinal.indexOf(e)) listOfUp.push(e)
            else if (indexArray.indexOf(e) > localArrayFinal.indexOf(e)) listOfDown.push(e)
        })
    }
    localStorage.setItem('indexArrayOfFinal', indexArray)

    return (
        <>
            <Contest8 />
            <div className='contest-participants'>
                <div className={`wait-vote ${waitClass}`}><button>please wait ...</button></div>

                <Odds
                    finalData={finalData}
                    pointsData={pointsData}
                    leader={leader}
                    listOfUp={listOfUp}
                    listOfDown={listOfDown}
                    total={total}
                    edition={8}
                />

                <Participants finalData={finalData} />
            </div>
        </>
    )
}

export default FinalEight
