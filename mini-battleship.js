var rs = require("readline-sync");
// array that will be the board
let seaBoard = [];
// array of ships
let hit = [];
let used = [];
//play again
let playAgain = true;

while (playAgain === true) {
  // creates the board of the size of num, makes a square every time
  function board(num) {
    for (let i = 0; i < num; i++) {
      let tiles = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      let emptyArray = [];
      for (let j = 1; j <= num; j++) {
        let tile = tiles[i] + j;
        emptyArray.push(tile);
      }
      seaBoard.push(emptyArray);
    }
  }
  board(10);

  console.table(seaBoard);

  //generates random tiles to place ships
  let arrayOfShips = [];
  function placeShips(numOfBoats) {
    for (let i = 1; i <= numOfBoats; i++) {
      let boat =
        seaBoard[Math.floor(Math.random() * 10)][
          Math.floor(Math.random() * 10)
        ];
      arrayOfShips.push(boat);
    }
  }
  placeShips(2);

  console.log(arrayOfShips);

  while (arrayOfShips.length !== 0) {
    let chooseTile = rs.question("Enter a location to strike ie 'A2'   ");
    if (arrayOfShips.includes(chooseTile)) {
      hit.push(chooseTile);
      used.push(chooseTile);
      arrayOfShips = arrayOfShips.filter((item) => item !== chooseTile);
      let remaining = arrayOfShips.length;
      console.log(`Hit! You've sunk a ship, there's ${remaining} remaining!`);
    } else if (used.includes(chooseTile)) {
      console.log("You already used that one");
    } else {
      used.push(chooseTile);
      console.log("Pfff that's a miss!");
    }
  }

  console.log("congrats");
  let wannaPlayAgain = rs.question("Would you like to play again? (Y/N) ");
  if (wannaPlayAgain === "Y") {
    playAgain = true;
  } else {
    playAgain = false;
    console.log("See you soon");
  }
}
