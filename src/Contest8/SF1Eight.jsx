import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaArrowUp, FaArrowDown, FaYoutube } from "react-icons/fa";
import Contest8 from './Contest8';
import { mainUrl8 } from '../Data/Data'

const SF1Eight = () => {
    const [finalData, setFinalData] = useState([]);
    const [pointsData, setPointsData] = useState([]);
    const [waitClass, setWaitClass] = useState('');

    const callData = async () => {
        setWaitClass('wait-vote-adding');
        const data = (await axios.get(`${mainUrl8}sf1`)).data;
        setFinalData(data);
        setWaitClass('');

        data.forEach((element) => {
            pointsData.push(element.puan1 + element.puan2);
            setPointsData([...pointsData]);
        });
    }

    useEffect(() => {
        callData();
    }, []);

    let amount = 0, mainIndex = 0, n = pointsData.length, leader1, leader2, leader3;
    for (let j = 0; j < pointsData.length; j++) {
        for (let i = 0; i < n; i++) {
            if (pointsData[i] > amount) {
                mainIndex = i;
                amount = pointsData[i];
            }
        }

        let changeElement1 = pointsData[n - 1]
        pointsData[n - 1] = pointsData[mainIndex]
        pointsData[mainIndex] = changeElement1;

        let changeElement2 = finalData[n - 1]
        finalData[n - 1] = finalData[mainIndex]
        finalData[mainIndex] = changeElement2;

        leader1 = finalData[0].countryName;
        leader2 = finalData[1].countryName;
        leader3 = finalData[2].countryName;

        n--;
        mainIndex = 0
        amount = 0
    };

    let indexArray = [], listOfUp = [], listOfDown = [];
    finalData && finalData.forEach((e) => {
        indexArray.push(e.id);
    });

    if (!localStorage.getItem('indexArrayOfSf1Eight')) indexArray = [];
    else {
        const localArrayFinal = localStorage.getItem('indexArrayOfSf1Eight').split(',')
        indexArray.forEach((e) => {
            if (indexArray.indexOf(e) < localArrayFinal.indexOf(e)) {
                listOfUp.push(e);
            } else if (indexArray.indexOf(e) > localArrayFinal.indexOf(e)) {
                listOfDown.push(e);
            }
        })
    }

    let indexArrayForLocal = [];
    finalData && finalData.forEach((e) => {
        indexArrayForLocal.push(e.id);
        localStorage.setItem('indexArrayOfSf1Eight', indexArrayForLocal);
    });

    return (
        <>
            <Contest8 />
            <div className='contest-participants'>
                <div className={`wait-vote ${waitClass}`}>
                    <button>please wait ...</button>
                </div>
                <div className='final'>
                    <h2>Who will qualify for the Final from Semi-final 1?</h2>
                    <div>
                        <span>Bookmakers have predicted</span>
                        <h2>{leader1}, {leader2}, {leader3}</h2>
                        <span>and 7 others</span>
                    </div>
                    <div className='box-main'>
                        {finalData && finalData.map((e, index) => (
                            <div key={e.id} className='box'>
                                <span className='arrow'>
                                    {index + 1}
                                    {listOfDown.includes(e.id) ? <FaArrowDown className='arrows arrow-down' /> : ''}
                                    {listOfUp.includes(e.id) ? <FaArrowUp className='arrows arrow-up' /> : ''}
                                </span>
                                <img src={e.flag} alt="" className='box-flag'/>
                                <div className='link-box'>
                                    <span>{e.countryName}</span>
                                    <a href={e.youtubeLink} className='youtube-link' target='_blank'>{e.youtubeLink ? <FaYoutube /> : ''}</a>
                                </div>
                                <span>{`${((200 / (e.puan1 + e.puan2))).toFixed(0) <= 98 ? ((200 / (e.puan1 + e.puan2))).toFixed(0) : '98'}%`}</span>
                                <span>{e.puan1}</span>
                                <span>{e.puan2}</span>
                                <span>{((e.puan1 + e.puan2) / 2) < 2 ? ((e.puan1 + e.puan2) / 2 + 0.03).toFixed(2) : (((e.puan1 + e.puan2) / 2).toFixed(1).endsWith(0) ? ((e.puan1 + e.puan2) / 2).toFixed(0) : ((e.puan1 + e.puan2) / 2).toFixed(1))}</span>
                            </div>
                        ))}
                    </div>
                    <div className="nq">
                        <h1>Result of Semi-Final 1</h1>
                        <div>
                            {finalData && finalData.map((e) => e.result === 1 && (
                                <div key={e.id}>
                                    <img src={e.flag} alt={`flag of ${e.countryName}`} />
                                    {innerWidth > 500 ? <span>{e.countryName} - </span> : <span>{e.countryName}</span>}
                                    <span>{e.singerName}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='participants'>
                    {finalData && finalData.map((e) => e.result && e.youtubeLink && (
                        <div key={e.id} className='part-box'>
                            <span>{e.countryName}</span>
                            <div className='text-box'><span>{e.singerName}</span></div>
                            <div className='iframe-box'>
                                <iframe src={`${e.youtubeLink.slice(0, 24)}embed/${e.youtubeLink.slice(-11)}`}></iframe>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SF1Eight
