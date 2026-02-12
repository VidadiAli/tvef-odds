import React from 'react'
import { FaArrowUp, FaArrowDown, FaYoutube } from "react-icons/fa"

const Odds = ({ finalData, pointsData, leader, listOfUp, listOfDown, total, edition }) => {
    let counts = 0

    return (
        <div className='final'>
            <h2>Who will be winner of TVEF Edition {`${edition}`}?</h2>
            <dir>
                <span>Bookmakers have predicted</span>
                <h2>{leader}</h2>
            </dir>

            <dir className="stop-odd">
                <div>
                    <h4>Closed event</h4>
                    <span>The odds will not be updated</span>
                </div>
            </dir>

            <div className='box-main'>
                {finalData && finalData.map((e) => {
                    if (e.result) {
                        counts++
                        return (
                            <div key={e.id} className='box'>
                                <span className='arrow'>
                                    {counts}
                                    {listOfDown.includes(e.id) ? <FaArrowDown className='arrows arrow-down' /> : ''}
                                    {listOfUp.includes(e.id) ? <FaArrowUp className='arrows arrow-up' /> : ''}
                                </span>
                                <img src={e.flag} alt="" className='box-flag' />
                                <div className='link-box'>
                                    <span>{e.countryName}</span>
                                    <a href={e.youtubeLink} className='youtube-link' target='_blank'>
                                        {e.youtubeLink !== "" ? <FaYoutube /> : ''}
                                    </a>
                                </div>
                                <span>{`${(((total / (e.puan1 + e.puan2))) / finalData.length).toFixed(0) >= 1 ? (((total / (e.puan1 + e.puan2))) / finalData.length).toFixed(0) : '<1'}%`}</span>
                                <span>{e.puan1}</span>
                                <span>{e.puan2}</span>
                                <span>{e.puan1 + 0.5}</span>
                                <span>{((e.puan1 + e.puan2 / 2).toFixed(1)).endsWith(0) ? (e.puan1 + e.puan2 / 2).toFixed() : (e.puan1 + e.puan2 / 2).toFixed(1)}</span>
                                <span>{(((e.puan1 + e.puan2) / 2).toFixed(1)).endsWith(0) ? ((e.puan1 + e.puan2) / 2).toFixed() : ((e.puan1 + e.puan2) / 2).toFixed(1)}</span>
                            </div>
                        )
                    }
                })}
            </div>

            <dir className="nq">
                <h1>Not Qualify</h1>
                <div>
                    {finalData && finalData.map((e) => {
                        if (!e.result) {
                            return (
                                <div key={e.id}>
                                    <img src={e.flag} alt={`flag of ${e.countryName}`} />
                                    {innerWidth > 500 ? <span>{e.countryName} - </span> : <span>{e.countryName}</span>}
                                    <span>{e.singerName}</span>
                                </div>
                            )
                        }
                    })}
                </div>
            </dir>
        </div>
    )
}

export default Odds
