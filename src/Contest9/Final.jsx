import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { mainUrl } from '../Data/Data'
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

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

    if (!localStorage.getItem('indexArrayOfFinal')) indexArray = [];
    else {
        const localArrayFinal = localStorage.getItem('indexArrayOfFinal').split(',')
        console.log(indexArray)
        console.log(localArrayFinal)
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
        localStorage.setItem('indexArrayOfFinal', indexArrayForLocal);
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
                            <span className='arrow'>{index + 1}
                                {listOfDown.includes(e.id) ? <FaArrowDown className='arrows arrow-down' /> : ''}

                                {listOfUp.includes(e.id) ? <FaArrowUp className='arrows arrow-up' /> : ''}
                            </span>
                            <img src={e.flag} alt="" />
                            <div>
                                <span>{e.countryName} - </span>
                                <span> {e.singerName}</span>
                            </div>
                            <span>{`${(((total / (e.puan1 + e.puan2))) / finalData.length).toFixed(0) >= 1 ? (((total / (e.puan1 + e.puan2))) / finalData.length).toFixed(0) : '>1'}%`}</span>
                            <span>{e.puan1}</span>
                            <span>{e.puan2}</span>
                            <span>{e.puan1 + 0.5}</span>
                            <span>{((e.puan1 + e.puan2 / 2).toFixed(1)).endsWith(0) ? (e.puan1 + e.puan2 / 2).toFixed() : (e.puan1 + e.puan2 / 2).toFixed(1)}</span>
                            <span>{(((e.puan1 + e.puan2) / 2).toFixed(1)).endsWith(0) ? ((e.puan1 + e.puan2) / 2).toFixed() : ((e.puan1 + e.puan2) / 2).toFixed(1)}</span>
                        </div>
                    }
                })
            }
        </div>
    )
}

export default Final