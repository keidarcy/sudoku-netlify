import React from 'react'

export const SudokuField = ({field}) => {
  return (
    <>
      <input type="text" className="field" value={field.value} readOnly={field.readOnly} />
    </>
  )
}
