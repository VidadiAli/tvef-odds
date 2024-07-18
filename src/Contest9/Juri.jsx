import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { mainUrl } from '../Data/Data'
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Contest9 from './Contest9';
import { mainScoreBoard } from '../JsFiles/MainJs';

const Juri = () => {
    const [finalData, setFinalData] = useState([]);
    const [pointsData, setPointsData] = useState([]);

    const callData = async () => {
        //const data = (await axios.get(`${mainUrl}edition9`)).data;
        const data = mainScoreBoard;
        setFinalData(data.juri);

        data.juri.forEach((element) => {

            pointsData.push(element.puan1 + element.puan2);
            setPointsData(pointsData)

        });
    }


    useEffect(() => {
        callData();
    }, []);



    let amount = 0, mainIndex = 0, n = pointsData.length, leader;
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

        leader = finalData[0].countryName;

        n--;
        mainIndex = 0
        amount = 0
    };


    let total = 0;
    pointsData.forEach((e) => {
        total += e;
    });


    let indexArray = [], listOfUp = [], listOfDown = [];
    finalData && finalData.forEach((e) => {
        indexArray.push(e.id);
    });

    if (!localStorage.getItem('indexArrayOfJuri')) indexArray = [];
    else {
        const localArrayFinal = localStorage.getItem('indexArrayOfJuri').split(',')

        indexArray && indexArray.forEach((e) => {
            if (indexArray.indexOf(e) < localArrayFinal.indexOf(e)) {
                listOfUp.push(e);
            }
            else if (indexArray.indexOf(e) > localArrayFinal.indexOf(e)) {
                listOfDown.push(e)
            }
            else {
                finalData[indexArray.indexOf(e)].countryName = finalData[indexArray.indexOf(e)].countryName;
            }
        })
    }

    let indexArrayForLocal = [];
    finalData && finalData.forEach((e) => {
        indexArrayForLocal.push(e.id);
        localStorage.setItem('indexArrayOfJuri', indexArrayForLocal);
    });


    let counts = 0;

    return (
        <>
            <Contest9 />
            <div className='contest-participants'>
                <div className='final'>
                    <h2>Who will be winner of Jury?</h2>
                    <dir>
                        <span>Bookmakers have predicted</span>
                        <h2> {leader}</h2>
                    </dir>
                    <dir className="stop-odd">
                        <div>
                            <h4>Closed event</h4>
                            <span>The odds will not be updated</span>
                        </div>
                    </dir>
                    {
                        finalData && finalData.map((e) => {
                            if (e.result) {
                                { counts++ }
                                return <div key={e.id} className='box'>
                                    <span className='arrow'>{counts}
                                        {listOfDown.includes(e.id) ? <FaArrowDown className='arrows arrow-down' /> : ''}

                                        {listOfUp.includes(e.id) ? <FaArrowUp className='arrows arrow-up' /> : ''}
                                    </span>
                                    <img src={e.flag} alt="" />
                                    <div>
                                        <span>{e.countryName}</span>
                                        <a href={e.youtubeLink} className='youtube-link' target='_blank'>{e.youtubeLink != "" ? <FaYoutube /> : ''}</a>
                                    </div>
                                    <span>{`${(((total / (e.puan1 + e.puan2))) / finalData.length).toFixed(0) >= 1 ? (((total / (e.puan1 + e.puan2))) / finalData.length).toFixed(0) : '<1'}%`}</span>
                                    <span>{e.puan1}</span>
                                    <span>{e.puan1 + 0.5}</span>
                                    <span>{((e.puan1 / 2).toFixed(1)).endsWith(0) ? (e.puan1 / 2).toFixed() : (e.puan1 / 2).toFixed(1)}</span>
                                    <span>{((e.puan1 / 2).toFixed(1)).endsWith(0) ? (e.puan1 / 2).toFixed() : (e.puan1 / 2).toFixed(1)}</span>
                                </div>
                            }
                        })
                    }
                    <dir className="nq">
                        <h1>Not Qualify</h1>
                        <div>
                            {
                                finalData && finalData.map((e) => {
                                    if (!e.result) {
                                        return <div key={e.id}>
                                            <img src={e.flag} alt={`flag of ${e.countryName}`} />
                                            {innerWidth > 500 ? <span>{e.countryName} - </span> : <span>{e.countryName}</span>}
                                            <span>{e.singerName}</span>
                                        </div>
                                    }
                                })
                            }
                        </div>
                    </dir>
                </div>
                <div className='participants'>
                    {
                        finalData && finalData.map((e) => {
                            if (e.result && e.youtubeLink != "") {
                                return <div key={e.id} className='part-box'>
                                    <span>{e.countryName}</span>
                                    <div className='text-box'>
                                        <span>{e.singerName}</span>
                                    </div>
                                    <div className='iframe-box'>
                                        <div>
                                            <iframe src={`${e.youtubeLink.slice(0, 24)}embed/${e.youtubeLink.slice(e.youtubeLink.length - 11, e.youtubeLink.length)}`} ></iframe>
                                        </div>
                                    </div>
                                </div>
                            }
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Juri