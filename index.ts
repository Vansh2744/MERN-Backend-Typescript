import { app } from "./src/app";
import { connectToDatabase } from "./src/database/db";


app.listen(3000, async () => {
  console.log("running on port : http://localhost:3000");
  await connectToDatabase();
});
