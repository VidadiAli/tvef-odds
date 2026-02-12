import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaYoutube } from "react-icons/fa";
import Contest7 from './Contest7'
import Odds from '../Pages/Odds'
import Participants from '../Pages/Participants'
import { mainUrl7 } from '../Data/Data'

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

        const pts = data.map(el => el.puan1 + el.puan2);
        setPointsData(pts);
    }

    useEffect(() => {
        callData();
    }, []);

    let amount = 0, mainIndex = 0, n = pointsData.length, leader;
    const sortedData = [...finalData];
    const sortedPoints = [...pointsData];

    for (let j = 0; j < sortedPoints.length; j++) {
        for (let i = 0; i < n; i++) {
            if (sortedPoints[i] > amount) {
                mainIndex = i;
                amount = sortedPoints[i];
            }
        }

        [sortedPoints[n - 1], sortedPoints[mainIndex]] = [sortedPoints[mainIndex], sortedPoints[n - 1]];
        [sortedData[n - 1], sortedData[mainIndex]] = [sortedData[mainIndex], sortedData[n - 1]];

        leader = sortedData[0]?.countryName;

        n--;
        mainIndex = 0;
        amount = 0;
    }

    const total = sortedPoints.reduce((a, b) => a + b, 0);

    // Qalib və qalib olmayanları ayırmaq
    const winners = sortedData.filter(e => e.result === 1);
    const notQualify = sortedData.filter(e => e.result === 0);

    return (
        <>
            <Contest7 />
            <div className='contest-participants'>
                <div className={`wait-vote ${waitClass}`}>
                    <button>please wait ...</button>
                    <button className='time'>Less than 2 minutes</button>
                </div>

                <Odds
                    finalData={winners}
                    pointsData={pointsData}
                    leader={leader}
                    listOfUp={[]}  
                    listOfDown={[]}
                    total={total}
                    edition={7}
                />

                <Participants finalData={sortedData} />
            </div>
        </>
    )
}

export default FinalSeven
