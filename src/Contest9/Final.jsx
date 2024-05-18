import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { mainUrl } from '../Data/Data'

const Final = () => {
    const [finalData, setFinalData] = useState([]);
    const [pointsData, setPointsData] = useState([]);

    const callData = async () => {
        const data = (await axios.get(`${mainUrl}final`)).data;
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

    return (
        <div className='final'>
            <h2>Who will be winner of TVEF Edition 9?</h2>
            <dir>
                <span>Bookmakers have predicted</span>
                <h2> {leader}</h2>
            </dir>
            {
                finalData && finalData.map((e, index) => {
                    if (e.result) {
                        return <div key={e.id} className='box'>
                            <span>{index + 1}</span>
                            <img src={e.flag} alt="" />
                            <div>
                                <span>{e.countryName} - </span>
                                <span> {e.singerName}</span>
                            </div>
                            <span>{`${(((total / (e.puan1 + e.puan2))) / finalData.length).toFixed(0) >= 1 ? (((total / (e.puan1 + e.puan2))) / finalData.length).toFixed(0) : '>1'}%`}</span>
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