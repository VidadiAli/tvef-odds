import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { mainUrl } from '../Data/Data'

const Final = () => {
    const [finalData, setFinalData] = useState([]);
    const [pointsData, setPointsData] = useState([]);

    const callData = async () => {
        const data = (await axios.get(`${mainUrl}sf2`)).data;
        setFinalData(data);

        data.forEach((element) => {
            pointsData.push(element.puan1 + element.puan2);
            setPointsData(pointsData)
        });
    }


    useEffect(() => {
        callData();
    }, []);


    console.log(finalData);
    console.log(pointsData)

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

    let total = 0;
    pointsData.forEach((e) => {
        total += e;
    });

    return (
        <div className='final'>
            <h2>Who will qualify for the Final from Semi-final 2?</h2>
            <dir style={{ flexWrap: 'wrap' }}>
                <span>Bookmakers have predicted</span>
                <h2>{leader1}, {leader2}, {leader3}</h2>
                <span>and 7 others</span>
            </dir>
            {
                finalData && finalData.map((e, index) => {
                    if (e.result) {
                        return <div key={e.id}>
                            <span>{index + 1}</span>
                            <img src={e.flag} alt="" />
                            <div>
                                <span>{e.countryName} - </span>
                                <span> {e.singerName}</span>
                            </div>
                            <span>{`${(total / (e.puan1 + e.puan2)).toFixed(0) < 96 ? (total / (e.puan1 + e.puan2)).toFixed(0) : '95'}%`}</span>
                            <span>{e.puan1}</span>
                            <span>{e.puan2}</span>
                        </div>
                    }
                })
            }
        </div>
    )
}

export default Final