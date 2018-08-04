import React from 'react'
import './Results.css'

function ResultsTable (props) {
    return (
        <div className="game-results">
            <table className="table-results">
                <thead>
                <tr>
                    <th className="table-results__cell table-results__cell_head">Player name</th>
                    <th className="table-results__cell table__cell_head">Player email</th>
                    <th className="table-results__cell table__cell_head">Time</th>

                </tr>
                </thead>
                <tbody>
                {props.records.map((record, i) => (
                    <tr key={i}>
                        <td className="table-results__cell">{record.playerName}</td>
                        <td className="table-results__cell">{record.playerEmail}</td>
                        <td className="table-results__cell">{record.time}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export { ResultsTable }
