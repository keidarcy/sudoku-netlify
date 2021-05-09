import React from 'react';
import { SudokuField } from './SudokuField'

const SudokuBoard = ({sudoku, onChange}) => {
  return (
      <div className="game">
        <div className="board">
          {sudoku.rows.map(row => (
            <div key={row.index + '+row'}>
              {row.cols.map(field => <SudokuField key={`${row.index}+${field.col}`} field={field} onChange={onChange} />)}
          </div>
        ))}
        </div>
      </div>
  )
}

export default SudokuBoard