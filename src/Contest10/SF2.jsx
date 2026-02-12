import React, { useEffect, useState } from 'react'
import { FaArrowUp, FaArrowDown, FaYoutube } from "react-icons/fa"
import Contest10 from './Contest10'
import { edition10 } from '../JsFiles/Odds10'

const SF2 = () => {
    const [finalData, setFinalData] = useState([])
    const [pointsData, setPointsData] = useState([])
    const [waitClass, setWaitClass] = useState('')

    const callData = async () => {
        setWaitClass('wait-vote-adding')
        const data = edition10
        setFinalData(data.sf2)
        setWaitClass('')
        data.sf2.forEach(el => {
            if (el.result !== -2) pointsData.push(el.puan1 + el.puan2)
        })
        setPointsData([...pointsData])
    }

    useEffect(() => {
        callData()
    }, [])

    let amount = 0, mainIndex = 0, n = pointsData.length
    let leader1, leader2, leader3
    for (let j = 0; j < pointsData.length; j++) {
        for (let i = 0; i < n; i++) {
            if (pointsData[i] > amount) {
                mainIndex = i
                amount = pointsData[i]
            }
        }
        [pointsData[n - 1], pointsData[mainIndex]] = [pointsData[mainIndex], pointsData[n - 1]]
        [finalData[n - 1], finalData[mainIndex]] = [finalData[mainIndex], finalData[n - 1]]
        leader1 = finalData[0]?.countryName
        leader2 = finalData[1]?.countryName
        leader3 = finalData[2]?.countryName
        n--
        mainIndex = 0
        amount = 0
    }

    const indexArray = finalData.map(e => e.id)
    const listOfUp = [], listOfDown = []
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
            <div className='contest-participants'>
                <div className={`wait-vote ${waitClass}`}><button>please wait ...</button></div>
                <div className='final'>
                    <h2>Who will qualify for the Final from Semi-final 2?</h2>
                    <dir>
                        <span>Bookmakers have predicted</span>
                        <h2>{leader1}, {leader2}, {leader3}</h2>
                        <span>and 7 others</span>
                    </dir>
                    <div className='box-main'>
                        {finalData.map((e, index) => e.result !== -2 && (
                            <div key={e.id} className='box'>
                                <span className='arrow'>{index + 1}
                                    {listOfDown.includes(e.id) && <FaArrowDown className='arrows arrow-down' />}
                                    {listOfUp.includes(e.id) && <FaArrowUp className='arrows arrow-up' />}
                                </span>
                                <img src={e.flag} alt="" className='box-flag'/>
                                <div className='link-box' >
                                    <span>{e.countryName}</span>
                                    <a href={e.youtubeLink} className='youtube-link' target='_blank'>
                                        {e.youtubeLink && <FaYoutube />}
                                    </a>
                                </div>
                                <span>{((200 / (e.puan1 + e.puan2)) <= 98 ? (200 / (e.puan1 + e.puan2)).toFixed(0) : '98')}%</span>
                                <span>{e.puan1}</span>
                                <span>{e.puan2}</span>
                                <span>{((e.puan1 + e.puan2)/2 < 2 ? ((e.puan1 + e.puan2)/2 + 0.03).toFixed(2) : ((e.puan1 + e.puan2)/2).toFixed(1))}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='participants'>
                    {finalData.map(e => e.result && e.youtubeLink && (
                        <div key={e.id} className='part-box'>
                            <span>{e.countryName}</span>
                            <div className='text-box'><span>{e.singerName}</span></div>
                            <div className='iframe-box'>
                                <div>
                                    <iframe src={`${e.youtubeLink.slice(0,24)}embed/${e.youtubeLink.slice(-11)}`}></iframe>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SF2
