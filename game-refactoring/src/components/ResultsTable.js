import React from 'react'
import './ResultsTable.css'

function ResultsTable (props) {
    return (
        <div className="game-results">
            <table className="table-results">
                <tr className="table-results__row">
                    <th className="table-results__cell table-results__cell_head">Player name</th>
                    <th className="table-results__cell table__cell_head">Defeated monsters</th>
                </tr>
                {props.records.map(record => (
                    <tr className="table-results__row">
                        <td className="table-results__cell">{record.playerName}</td>
                        <td className="table-results__cell">{record.defeatedMonsters}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export { ResultsTable }
