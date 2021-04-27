import React, { Component } from 'react';
import generator from 'sudoku';
import './App.css';
import produce from 'immer';
import SudokuBoard from './components/SudokuBoard';

window.generator = generator;

/**
 * Generates a sudoku with the structure
 *
 * {rows: [{index: 0, cols: [{row: 0, col: 0, value:1, readonly: true}, ...]}, ...]}
 *
 */
function generatorSudoku() {
  const raw = generator.makepuzzle();
  console.log(raw);

  const result = { rows: [] };

  for (let i = 0; i < 9; i++) {
    const row = { cols: [], index: i };
    for (let j = 0; j < 9; j++) {
      const value = raw[i * 9 + j];
      const col = {
        row: i,
        col: j,
        value,
        readOnly: value !== null
      };
      row.cols.push(col);
    }
    result.rows.push(row);
  }
  console.log(result);

  return result;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = produce({}, () => ({
      sudoku: generatorSudoku()
    }));
  }

  handleChange = (e) => {
    this.setState(
      produce((state) => {
        state.sudoku.rows[e.row].cols[e.col].value = e.value;
      })
    );
  };

  solveSudoku = () => {};

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sudoku</h1>
        </header>
        <SudokuBoard sudoku={this.state.sudoku} onChange={this.handleChange} />
        <button onClick={this.solveSudoku}>solve</button>
      </div>
    );
  }
}

export default App;
