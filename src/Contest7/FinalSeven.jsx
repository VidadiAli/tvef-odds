import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { mainUrl7 } from '../Data/Data'
import { FaYoutube } from "react-icons/fa";
import Contest7 from './Contest7'

const FinalSeven = () => {
    const [finalData, setFinalData] = useState([]);
    const [pointsData, setPointsData] = useState([]);
    const [waitClass, setWaitClass] = useState('');

    let counts = 0;

    const callData = async () => {
        setWaitClass('wait-vote-adding');
        const data = (await axios.get(`${mainUrl7}final`)).data;
        setFinalData(data);

        setWaitClass('');

        data.forEach((element) => {
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


    // let mainTime;
    // useEffect(() => {
    //     let time1Ed7Final = 1, time2Ed7Final = 59;
    //     mainTime = setInterval(() => {
    //         document.getElementsByClassName('time')[0].textContent = `${time1Ed7Final}:${time2Ed7Final}`;
    //         time2Ed7Final -= 1;
    //         if (time2Ed7Final === 0) {
    //             time1Ed7Final -= 1;
    //             time2Ed7Final = 59;
    //         }
    //     }, 1000)

    //     return () => clearInterval(mainTime)
    // })



    return (
        <>
            <Contest7 />
            <div className='contest-participants'>
                <div className={`wait-vote ${waitClass}`}>
                    <button >please wait ...</button>
                    <button className='time'>Less than 2 minutes</button>
                </div>
                <div className='final'>
                    <h2>Who will be winner of TVEF Edition 7?</h2>
                    <dir>
                        <span>Bookmakers have predicted</span>
                        <h2> {leader}</h2>
                    </dir>
                    {
                        finalData && finalData.map((e) => {
                            if (e.result === 1) {
                                { counts++ }
                                return <div key={e.id} className='box'>
                                    <span className='arrow'>{counts}</span>
                                    <img src={e.flag} alt="" />
                                    <div>
                                        <span>{e.countryName} - </span>
                                        <span>{e.singerName}</span>
                                        <a href={e.youtubeLink} className='youtube-link' target='_blank'>{e.youtubeLink != "" ? <FaYoutube /> : ''}</a>
                                    </div>
                                    <span>{`${(((total / (e.puan1 + e.puan2))) / finalData.length).toFixed(0) >= 1 ? (((total / (e.puan1 + e.puan2))) / finalData.length).toFixed(0) : '<1'}%`}</span>
                                    <span>{e.puan1}</span>
                                    <span>{e.puan2}</span>
                                    <span>{e.puan1 + 0.5}</span>
                                    <span>{((e.puan1 + e.puan2 / 2).toFixed(1)).endsWith(0) ? (e.puan1 + e.puan2 / 2).toFixed() : (e.puan1 + e.puan2 / 2).toFixed(1)}</span>
                                    <span>{(((e.puan1 + e.puan2) / 2).toFixed(1)).endsWith(0) ? ((e.puan1 + e.puan2) / 2).toFixed() : ((e.puan1 + e.puan2) / 2).toFixed(1)}</span>
                                </div>
                            }
                        })
                    }

                    <dir className="nq">
                        <h1>Not Qualify</h1>
                        <div>
                            {
                                finalData && finalData.map((e) => {
                                    if (e.result === 0) {
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
            </div >
        </>
    )
}

export default FinalSeven