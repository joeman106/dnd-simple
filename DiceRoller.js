const modifiers = [
  "d4modifier",
  "d6modifier",
  "d8modifier",
  "d10modifier",
  "d12modifier",
  "d20modifier",
];

//Average amount of time the dice spends rolling, will vary just like real dice.
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

let rollsArray = []; //Array to store previous rolls
const coinFaces = ["Heads!", "Tails!"]; //helpful in implementing coin flipping logic

document.getElementById("display").innerHTML = "0"; //placeholder until roll is made

//simple function to add a delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function rollDice(diceValue, diceId) {

  var rolltimeValueFromSlider =
    document.getElementById("rolltime-slider").value;
  console.log(rolltimeValueFromSlider);

  let currentRoll = 0; //keep track of the roll we are on ensuring it isn't below min roll

  let modifier = 0; //default modifier is 0
  const modifierElement = document.getElementById(diceId);

  if (modifierElement && modifierElement.value != "") {
    modifier = parseInt(modifierElement.value);
  }

  let filteredDiceID = diceId.replace(/[^0-9]/g, ""); //Filter just the number out of the id value
  var outputString = //format the output string
    "D" + filteredDiceID.toString() + " + " + modifier.toString() + ":";

  document.getElementById("rolls-array").innerHTML = outputString;

  let rolls = rolltimes[diceValue];

  //roll until specified rolls are completed, values given by the user inputted slider value and the specific dice
  while (currentRoll !== Math.floor((rolls * rolltimeValueFromSlider) ^ 1.5)) {
    var random = Math.floor(Math.random() * diceValue + 1); //random is a var so it can be used outside the scope of the loop

    if (diceValue == 2 && random == 1) {
      //Could have used ternary, but would be too bulky. This is the coinflipping logic
      document.getElementById("display").innerHTML = coinFaces[0];
    } else if (diceValue == 2 && random == 2) {
      document.getElementById("display").innerHTML = coinFaces[1];
    } else {
      document.getElementById("display").innerHTML =
        modifier != 0 ? random + "+" + modifier : random; //no need to display "+0" so I just emit that part if modifier = 0
    }
    await delay(calculateDelayReg(currentRoll));

    currentRoll++;
  }

  var final = random + modifier;
  for (let i = 0; i < 3; i++) {
    document.getElementById("display").innerHTML = final;
    await delay(500);
    document.getElementById("display").innerHTML = "";
    await delay(500);
  }

  document.getElementById("display").innerHTML = final;
  storeRoll(final, diceId, modifier);
}

function calculateDelayReg(currentRoll) {
  return 30;
  //Todo: calculate the delay based on oscillating decay function,
}

function calculateDelayExponentialDecay(currentRoll) {}

async function attributeGenerator() {
  /**
   * TODO: Roller function that rolls 4
   * d6 and produces the summation of the top
   * 3 rolls, for character creation attributes
   */
}

function storeRoll(roll, diceID, modifier) {
  let filteredDiceID = diceID.replace(/[^0-9]/g, ''); //Filter just the number out of the id value
  var outputString = //format the output string
    "D" + filteredDiceID.toString() + " + " + modifier.toString() + ": " + roll.toString();
  document.getElementById("rolls-array").innerHTML = outputString; //display on the scroll
}
