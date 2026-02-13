import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Contest8 from './Contest8';
import { mainUrl8 } from '../Data/Data'
import SemiOdds from '../Pages/SemiOdds';

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
            <SemiOdds finalData={finalData} listOfDown={listOfDown} listOfUp={listOfUp}
                waitClass={waitClass} leader1={leader1} leader2={leader2} leader3={leader3} edition={8} sf={1} />
        </>
    )
}

export default SF1Eight
