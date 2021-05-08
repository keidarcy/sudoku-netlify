import React, { Component } from 'react';
import generator from 'sudoku';
import './App.css';
import logo from './logo.svg';
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
      const value = Number.isInteger(raw[i * 9 + j]) ? raw[i * 9 + j] + 1 : null;
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

  solveSudoku = () => {
    const board = this.state.sudoku.rows.map(({ cols }) => cols.map((col) => col.value));

    const isValid = (board, row, col, num) => {
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) return false;
        if (board[i][col] === num) return false;
        if (
          board[3 * ((row / 3) | 0) + ((i / 3) | 0)][3 * ((col / 3) | 0) + (i % 3)] ===
          num
        )
          return false;
      }
      return true;
    };

    const dfs = (board) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === null) {
            for (let num = 1; num <= 9; num++) {
              if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (dfs(board)) return true;
                board[row][col] = null;
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    dfs(board);

    this.setState(
      produce((state) => {
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            state.sudoku.rows[row].cols[col].value = board[row][col];
          }
        }
      })
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header static space">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <SudokuBoard sudoku={this.state.sudoku} onChange={this.handleChange} />
        <button
          onClick={this.solveSudoku}
          className="tesla solve fill-flat mdc-button mdc-button--unelevated"
        >
          solve
        </button>
      </div>
    );
  }
}

export default App;
