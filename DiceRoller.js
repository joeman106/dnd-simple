const modifiers = [
  "d4modifier",
  "d6modifier",
  "d8modifier",
  "d10modifier",
  "d12modifier",
  "d20modifier",
];

const rollTime = 10 //make roll time a constant, and have every dice be a multiple of it for easy modification.
//Average amount of time the dice spends rolling, will vary just like real dice.
const rolltimes = {
  2: 4 * rollTime,
  4: 2 * rollTime,
  6: 5 * rollTime,
  8: 4 * rollTime,
  10: 5 * rollTime,
  12: 7 * rollTime,
  20: 8 * rollTime,
  100: 10 * rollTime,
};

let rollsArray = []; //Array to store previous rolls
const coinFaces = ["Heads!", "Tails!"]; //helpful in implementing coin flipping logic

document.getElementById("display").innerHTML = "0"; //placeholder until roll is made


//simple function to add a delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function rollDice(diceValue, diceId) {
  let currentRoll = 0; //keep track of the roll we are on ensuring it isn't below min roll

  let modifier = 0; //default modifier is 0
  const modifierElement = document.getElementById(diceId);

  if (modifierElement && modifierElement.value != "") {
    modifier = parseInt(modifierElement.value);
  }

  //minrolls based off of how big the dice is, bigger die have higher minroll time
  let minRolls = Math.floor(rolltimes[diceValue] / 1.5); //if it isn't a whole num when divided, it will roll forever. Learned the hard way
  let avgRolls = rolltimes[diceValue];
  let maxrolls = Math.floor(rolltimes[diceValue] * 1.5);

  //The average time will be the rolltime specified above, but the roll time will vary based on when the random target is found
  //The function will continue while the specified minroll and maxroll have not been reached, checked by comparing to currentroll
  while (
    Math.floor(Math.random() * avgRolls + 1) !== avgRolls ||
    currentRoll < minRolls ||
    currentRoll === maxrolls
  ) {
    let random = Math.floor(Math.random() * diceValue + 1) + modifier;

    if (diceValue == 2 && random == 1) {
      //Could have used ternary, but would be too bulky. This is the coinflipping logic
      document.getElementById("display").innerHTML = coinFaces[0];
    } else if (diceValue == 2 && random == 2) {
      document.getElementById("display").innerHTML = coinFaces[1];
    } else {
      document.getElementById("display").innerHTML = random;
    }
    await delay(15);

    currentRoll++;
  }
}

function calculateDelay(diceValue, currentTime) {
  //Todo: calculate the delay based on oscillating decay function,
}

async function attributeGenerator() {
  /**
   * TODO: Roller function that rolls 4
   * d6 and produces the summation of the top
   * 3 rolls, for character creation attributes
   */
}

function storeRoll(roll) {
  document.getElementById("rolls-array").innerHTML = roll;

  /** 
  rollsArray.push[roll];
  console.log(rollsArray);
  document.getElementById("rolls-array").innerHTML = rollsArray.join("\n");
  console.log(roll);
  */
}
