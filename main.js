'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  guess - guess.trim().toLowerCase()

  let solutionArray = []
  solutionArray = solution.split("")
  let guessArray = []
  guessArray = guess.slice("")

// create a variable correctLetterLocations and set to 0
let correctLetterLocations = 0

 for (let i=0; i < solutionArray.length; i++){

 if (solutionArray[i] === guessArray[i]) {
  correctLetterLocations++
   solutionArray[i] = null;
 }

}

 let correctLetter = 0

 for (let i=0; i< solutionArray.length; i++){
    let targetIndex = solutionArray.indexOf(guessArray[i])

 if (targetIndex > -1) {

  correctLetter++
  solutionArray[i] = null;
 }
}

let hint = correctLetterLocations + "" + correctLetter

console.log(hint)

return hint

}

const mastermind = (guess) => {
  solution = 'abcd'; 
  let hint = generateHint(guess)

  
  
  
  
  if (guess === solution) {
    console.log("Guessed it!")
  }

  else {
  }

  board.push(guess+""+ hint)
  
  if (board.length >10) {
  console.log ('Ran outta turns! The solution was' + solution)
  return 'Ran outta turns! The solution was' + solution
}
}

const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}