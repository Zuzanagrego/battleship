//you'll need this package: https://www.npmjs.com/package/readline-sync

var rs = require("readline-sync");

//play again for while loop
let playAgain = true;

// array of ships
let arrayOfShips = [
  { name: "1two", units: 2, hits: 0, coordinates: [] },
  { name: "1three", units: 3, hits: 0, coordinates: [] },
  { name: "2three", units: 3, hits: 0, coordinates: [] },
  { name: "1four", units: 4, hits: 0, coordinates: [] },
  { name: "1five", units: 5, hits: 0, coordinates: [] },
];
let numShips = 5;

// arrays to put ships in
let used = [];
let toBeDestroyed = [];

//if you want bigger than 10 add letters to tiles array
let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

while (playAgain) {
  //loop until all ships are placed
  for (let a = 0; a < numShips; a++) {
    //make sure it doesn't go outside the board
    let boatSize = 10 - arrayOfShips[a].units;
    //coordinates
    let row, col;

    //loop until each ship is placed
    while (arrayOfShips[a].coordinates.length < 1) {
      // for help
      let boat = [];
      //chooses random direction
      let randomDirection = Math.floor(Math.random() * 2);

      //if vertically
      if (randomDirection === 0) {
        col = Math.floor(Math.random() * 10 + 1);
        //chooses number and makes sure it doesn't go out of board
        startRow = letters[Math.floor(Math.random() * boatSize + 1)];
        let tellMeNum = letters.indexOf(startRow);
        //prolong the ship and add each to an array
        for (let c = 0; c < arrayOfShips[a].units; c++) {
          let startRow = letters[tellMeNum + parseInt(c)];
          let generatedCoordinates = startRow + col;
          boat.push(generatedCoordinates);
        }
      }

      //if horizontally
      if (randomDirection === 1) {
        //chooses letter and makes sure it doesn't go out of board
        row = letters[Math.floor(Math.random() * 10 + 1)];
        col = Math.floor(Math.random() * boatSize + 1);
        //prolong the ship and add each to an array
        for (let c = 0; c < arrayOfShips[a].units; c++) {
          let generatedCoordinates = row + (col + parseInt(c));
          boat.push(generatedCoordinates);
        }
      }

      let taken = boat.some((item) => toBeDestroyed.includes(item));
      //if not taken add it

      if (!taken) {
        arrayOfShips[a].coordinates.push(...boat);
        toBeDestroyed.push(...boat);
      }
    }
  }

  //game starts

  while (numShips > 0) {
    let chooseTile = rs.question("Enter a location to strike ie 'A2'   ");

    if (used.includes(chooseTile)) {
      console.log(
        "Sweetie, you've already used this one, pay attention, this is war!"
      );
    } else if (toBeDestroyed.includes(chooseTile)) {
      for (let e = 0; e < arrayOfShips.length; e++) {
        if (arrayOfShips[e].coordinates.includes(chooseTile)) {
          if (
            parseInt(arrayOfShips[e].hits) ===
            parseInt(arrayOfShips[e].units) - 1
          ) {
            used.push(chooseTile);
            numShips -= 1;
            console.log(
              "You've sunk a ship, amazing! There's only " +
                numShips +
                " remaining!"
            );
          } else {
            arrayOfShips[e].hits += 1;
            used.push(chooseTile);
            console.log("That's a hit! Good job!");
          }
        }
      }
    } else {
      used.push(chooseTile);
      console.log("Sorry, baby, that's a miss");
    }
  }
  let ask = rs.question("Wanna play again? Y/N");
  if (ask === "N") {
    playAgain = false;
  }
}
