// app.js
const express = require("express");
const app = express();

app.use(express.json());

// VULNERABLE: dynamic evaluation of user-provided code
app.post("/run", (req, res) => {
  const userCode = req.body.code;

  try {
    // Both eval and new Function are dangerous on untrusted input
    const result = eval(userCode); // or: new Function(userCode)();
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Listening on port 3000"));
