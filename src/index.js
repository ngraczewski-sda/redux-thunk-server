const express = require("express");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const app = express();
const port = 3000;

app.use(cors(corsOptions));
app.use(express.json());

const messages = [];

app.get("/messages", (req, res) => {
  res.status(200).json(messages);
});

app.post("/messages", (req, res) => {
  console.log({ req });
  const message = req.body;

  if (!message) {
    res.status(400).json({
      error: "Brakuje body.",
    });
  }

  if (!message.content) {
    res.status(400).json({
      error: "Brakuje pola 'content'.",
    });
    return;
  }

  if (!message.user) {
    res.status(400).json({
      error: "Brakuje pola 'user'.",
    });
    return;
  }

  const newMessage = {
    user: message.user,
    content: message.content,
  };
  messages.push(newMessage);

  res.status(201).json(newMessage);
});

app.all("/*", (req, res) => {
  res.status(404).json({
    error: "Dobry serwer, zły endpoint",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
