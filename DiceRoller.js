const modifiers = [
  "d4modifier",
  "d6modifier",
  "d8modifier",
  "d10modifier",
  "d12modifier",
  "d20modifier",
];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function rollDice(diceValue, diceId) {
  let modifier = 0;
  const modifierElement = document.getElementById(diceId);

  if (modifierElement && modifierElement.value != "") {
    modifier = parseInt(modifierElement.value);
  }


  for (let i = 0; i < 30; i++) {
    let random = Math.floor(Math.random() * diceValue + 1) + modifier;
    if (diceValue == 2 && random == 1) {
      document.getElementById("display").innerHTML = "Heads!";
    } else if (diceValue == 2 && random == 2) {
      document.getElementById("display").innerHTML = "Tails!";
    } else {
      document.getElementById("display").innerHTML = random;
    }
    await delay(15);
  }
}
/**
 * TODO: Roller function that rolls 4
 * d6 and produces the summation of the top
 * 3 rolls, for character creation attributes
 */
//async function attributeGenerator(){}

modifiers.forEach((diceId) => {
  const diceValue = parseInt(diceId.replace(/[^0-9]/g, ""));
  rollDice(diceValue, diceId);
});
