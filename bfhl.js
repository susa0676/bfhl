const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

function isAlphabet(char) {
  return /^[a-zA-Z]$/.test(char);
}

function reverseAltCaps(str) {
  let reversed = str.split("").reverse().join("");
  return reversed
    .split("")
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

app.post("/bfhl", (req, res) => {
  try {
    const inputArray = req.body.array;

    if (!inputArray || !Array.isArray(inputArray)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid input. 'array' must be an array.",
      });
    }

    let even = [];
    let odd = [];
    let alphabet = [];
    let special = [];
    let sums = 0;

    inputArray.forEach((x) => {
      if (typeof x === "number") {
        if (x % 2 === 0) {
          even.push(x);
        } else {
          odd.push(x);
        }
        sums += x;
      } else if (isAlphabet(x)) {
        alphabet.push(x.toUpperCase());
      } else {
        special.push(x);
      }
    });

    let alp = alphabet.join("");
    let reversealp = reverseAltCaps(alp);

    res.status(200).json({
      is_success: true,
      user_id: "sudharsanan_g_14052005",
      email: "sudharsanan.g2022@vitstudent.ac.in",
      roll_number: "22BIT0676",
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alphabet,
      special_characters: special,
      sum: sums,
      concat_string: reversealp,
    });
  } catch (err) {
    console.error("error processing request", err);
    return res.status(500).json({
      status: "error",
      message: "internal server error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
