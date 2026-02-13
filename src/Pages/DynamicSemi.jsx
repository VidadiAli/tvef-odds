import React, { useEffect, useState } from 'react'
import Contest11 from '../Contest11/Contest11'
import { edition11 } from '../JsFiles/Odds10'
import SemiOdds from '../Pages/SemiOdds'

const DynamicSemi = ({ edition, sf }) => {

    const [finalData, setFinalData] = useState([])
    const [waitClass, setWaitClass] = useState('')
    const [listOfUp, setListOfUp] = useState([])
    const [listOfDown, setListOfDown] = useState([])

    const editions = {
        11: edition11
    }

    const Contests = {
        11: Contest11
    }

    const ContestComponent = Contests[edition]

    useEffect(() => {
        const callData = () => {

            setWaitClass('wait-vote-adding')

            const data = editions[edition]
            const semiKey = `sf${sf}`
            if (!data || !data[semiKey]) return

            let tempFinal = data[semiKey].map(e => ({ ...e }))

            tempFinal.sort((a, b) => {
                const aTotal = a.result !== -2 ? parseFloat(a.puan1) + parseFloat(a.puan2) : -1
                const bTotal = b.result !== -2 ? parseFloat(b.puan1) + parseFloat(b.puan2) : -1
                return aTotal - bTotal
            })

            const storageKey = `indexArrayOfSf${sf}_${edition}`
            const newIndexArray = tempFinal.map(e => e.id)

            let up = []
            let down = []

            const oldData = localStorage.getItem(storageKey)
            if (oldData) {
                const oldArray = oldData.split(',')
                newIndexArray.forEach((id, newIndex) => {
                    const oldIndex = oldArray.indexOf(id.toString())
                    if (oldIndex !== -1) {
                        if (newIndex < oldIndex) up.push(id)
                        else if (newIndex > oldIndex) down.push(id)
                    }
                })
            }

            localStorage.setItem(storageKey, newIndexArray)

            setFinalData(tempFinal)
            setListOfUp(up)
            setListOfDown(down)
            setWaitClass('')
        }

        callData()
    }, [edition, sf])

    const leader1 = finalData[0]?.countryName
    const leader2 = finalData[1]?.countryName
    const leader3 = finalData[2]?.countryName

    return (
        <>
            <ContestComponent />

            <SemiOdds
                finalData={finalData}
                listOfDown={listOfDown}
                listOfUp={listOfUp}
                waitClass={waitClass}
                leader1={leader1}
                leader2={leader2}
                leader3={leader3}
                edition={edition}
                sf={sf}
            />
        </>
    )
}

export default DynamicSemi
