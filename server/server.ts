import { connectDB } from "@config/mongoose.js";
import { app, PORT } from "./app.js";

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
