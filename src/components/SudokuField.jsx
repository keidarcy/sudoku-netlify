import React from 'react'

export const SudokuField = ({field, onChange}) => {
  const handleChange = (e) => {
    const value = Number(e.target.value);
    onChange({row: field.row, col: field.col, value})
  }
  return (
    <>
      <input type="text" className="field" value={field.value || ''} onChange={handleChange} readOnly={field.readOnly} />
    </>
  )
}
