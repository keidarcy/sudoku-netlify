import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import produce from 'immer';
import SudokuBoard from './components/SudokuBoard';
import CreateValidSudoku from './libs/sudoku';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = produce({}, () => ({
      sudoku: CreateValidSudoku()
    }));
    this.btnRef = React.createRef();
    this.bgRef = React.createRef();
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

    // hsl(228deg 100% 70%), hsl(150deg 100% 80%), hsl(168deg 100% 50%), hsl(195deg 100% 60%), hsl(120deg 100% 80%), hsl(140deg 100% 70%), hsl(180deg 100% 50%)
    const genColor = () => {
      const hue = (Math.random() * 300) | 0;
      const sign = Math.random() * 2 > 1 ? 1 : -1;

      const genOne = () => {
        const oneHue = hue * ((sign * Math.random()) / 1.5 + 1);
        const lightness = (100 - Math.random() * 30) | 0;
        return `hsl(${oneHue}deg 100% ${lightness}%)`;
      };
      let res = '';
      for (let i = 0; i < 7; i++) {
        res += genOne();
        if (i < 6) {
          res += ',';
        }
      }
      return res;
    };
    this.btnRef.current.style.setProperty('--tesla-blur', Math.random() * 100);
    this.bgRef.current.style.setProperty('--voronoi-cell-colors', genColor());
    this.bgRef.current.style.setProperty(
      '--voronoi-number-of-cells',
      (30 - Math.random() * 20) | 0
    );

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
        <div ref={this.bgRef} className="main">
          <SudokuBoard sudoku={this.state.sudoku} onChange={this.handleChange} />
          <button ref={this.btnRef} onClick={this.solveSudoku} className="tesla solve">
            solve
          </button>
        </div>
      </div>
    );
  }
}

export default App;
