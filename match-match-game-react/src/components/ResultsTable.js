import React from 'react'
import './ResultsTable.css'

function ResultsTable (props) {
    return (
        <div className="game-results">
            <table className="table-results">
                <thead>
                <tr>
                    <th className="table-results__cell table__cell_head">Player name</th>
                    <th className="table-results__cell table__cell_head">Player email</th>
                    <th className="table-results__cell table__cell_head">Time</th>

                </tr>
                </thead>
                <tbody>
                {props.records.map((record, i) => (
                    <tr className="table-results__row" key={i}>
                        <td className="table-results__cell">{record.username}</td>
                        <td className="table-results__cell">{record.email}</td>
                        <td className="table-results__cell">{record.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export { ResultsTable }
