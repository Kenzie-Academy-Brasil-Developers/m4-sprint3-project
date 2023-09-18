import { app } from "./app";
import { connectDatabase } from "./database/database";

const PORT = 3000;

app.listen(PORT, async () => {
    await connectDatabase();
    console.log(`API started sucessfully on PORT ${PORT}`);
})