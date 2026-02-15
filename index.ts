import { app } from "./src/app";
import { connectToDatabase } from "./src/database/db";
import { Subscription } from "./src/models/subscription.model";
import { User } from "./src/models/user.model";

app.post("/user", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  return res.json({ message: "User created", user });
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const isCorrect = await user?.comparePassword(password);

  if (!isCorrect) {
    throw new Error("Unauthorized user");
  }

  return res.json({ user });
});

app.post("/subscribe", async (req, res) => {
  const {
    name,
    price,
    currency,
    frequency,
    category,
    paymentMethod,
    status,
    startDate,
    renewalDate,
    user,
  } = req.body;

  const subscibe = await Subscription.create({
    name,
    price,
    currency,
    frequency,
    category,
    paymentMethod,
    status,
    startDate,
    renewalDate,
    user,
  });

  return res.json({ subscibe });
});

app.listen(3000, async () => {
  console.log("running on port : http://localhost:3000");
  await connectToDatabase();
});
