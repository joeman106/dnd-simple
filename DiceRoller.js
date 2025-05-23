const modifiers = [
  "d4modifier",
  "d6modifier",
  "d8modifier",
  "d10modifier",
  "d12modifier",
  "d20modifier",
];

/**
Average amount of time the dice spends rolling, will vary just like real dice.
roll time calculated from "sides" on the dice rolled, dice with more sides will roll
faster.

Roll time also can be adjusted by the user via slider, mimicking dice materials.

*/
const rolltimes = {
  2: 8,
  4: 4,
  6: 8,
  8: 8,
  10: 10,
  12: 12,
  20: 14,
  100: 20,
};

let rollsArray = []; //Array to store previous rolls for display
const coinFaces = ["Heads!", "Tails!"]; //"D2" is just a coin toss

document.getElementById("display").innerHTML = "0"; //placeholder until roll is made

//simple function to add a delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function rollDice(diceValue, diceId) {
  var rolltimeValueFromSlider = //get the desired rolltime from user in slider
    document.getElementById("rolltime-slider").value;

  let currentRoll = 0; //keep track of the roll we are on ensuring it isn't below min roll

  let modifier = 0; //default modifier is 0
  const modifierElement = document.getElementById(diceId); //tracks the modifier that will be checked since all die have their own

  if (modifierElement && modifierElement.value != "") {
    modifier = parseInt(modifierElement.value); //get the modifier from frontend
  }

  let filteredDiceID = diceId.replace(/[^0-9]/g, ""); //Filter just the number out of the id value
  var outputString = //format the output string
    "D" + filteredDiceID.toString() + " + " + modifier.toString() + ":";

  document.getElementById("rolls-array").innerHTML = outputString; //display first part of output string

  let rolls = rolltimes[diceValue]; //find amount of "rolls" (randoms calculated) before die is finished

  //roll until specified rolls are completed, values given by the user inputted slider value and the specific dice
  while (currentRoll !== Math.floor((rolls * rolltimeValueFromSlider) ^ 1.5)) {
    //varies with slight exponential, otherwise variation isn't noticable
    var random = Math.floor(Math.random() * diceValue + 1); //random is a var so it can be used outside the scope of the loop (comment is mostly for me to remember the difference between "var" and "let" lol)

    if (diceValue == 2 && random == 1) {
      //Could have used ternary, but would be too bulky. This is the coinflipping logic
      document.getElementById("display").innerHTML = coinFaces[0]; //Heads if random is 1
    } else if (diceValue == 2 && random == 2) {
      document.getElementById("display").innerHTML = coinFaces[1]; //Tails if random is 2
    } else {
      document.getElementById("display").innerHTML =
        modifier != 0 ? random + "+" + modifier : random; //no need to display "+0" so I just emit that part if modifier = 0
    }
    await delay(calculateDelayReg(currentRoll)); //delay varies based on time dice has been rolling, to mimic decay via friction of real dice

    currentRoll++;
  }

  var final = random + modifier;
  for (let i = 0; i < 3; i++) {
    //make the final random blink 3 times for half a second before settling
    document.getElementById("display").innerHTML = final;
    await delay(500);
    document.getElementById("display").innerHTML = "";
    await delay(500);
  }

  document.getElementById("display").innerHTML = final;
  storeRoll(final, diceId, modifier); //store the roll on the scroll
}

function calculateDelayReg(currentRoll) {
  return 30;
}

function calculateDelayExponentialDecay(currentRoll) {
  //Todo: calculate the delay based on oscillating decay function,
}

async function attributeGenerator() {
  /**
   * TODO: Roller function that rolls 4
   * d6 and produces the summation of the top
   * 3 rolls, for character creation attributes
   */
}

function storeRoll(roll, diceID, modifier) {
  let filteredDiceID = diceID.replace(/[^0-9]/g, ""); //Filter just the number out of the id value
  var outputString = //format the output string
    "D" +
    filteredDiceID.toString() +
    " + " +
    modifier.toString() +
    ": " +
    roll.toString();
  document.getElementById("rolls-array").innerHTML = outputString; //display on the scroll
}
