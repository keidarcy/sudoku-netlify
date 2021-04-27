import React from 'react';
import { SudokuField } from './SudokuField'

const SudokuBoard = ({sudoku}) => {
  return (
    <>
      <pre>
        {sudoku.rows.map(row => (
          <div key={row.index + '+row'}>
            {row.cols.map(field => <SudokuField key={`${row.index}+${field.col}`} field={field} />)}
        </div>
      ))}
      </pre>
    </>

  )
  
}

export default SudokuBoard