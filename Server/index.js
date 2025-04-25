const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oi6ry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        const db = client.db("taskManager");
        const users = db.collection("users");
        const tasks = db.collection("tasks");

     
        const verifyToken = (req, res, next) => {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).send({ error: 'Unauthorized access' });

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) return res.status(403).send({ error: 'Forbidden access' });
                req.user = decoded;
                next();
            });
        };

        // Register
        app.post("/register", async (req, res) => {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400).send({ error: "Email and password required" });

            const existingUser = await users.findOne({ email });
            if (existingUser) return res.status(409).send({ error: "User already exists" });

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = { email, password: hashedPassword, role: "user", verified: false };

            const result = await users.insertOne(user);
            res.send({ success: true, insertedId: result.insertedId });
        });

       
        app.patch("/verify-email/:email", async (req, res) => {
            const email = req.params.email;
            const result = await users.updateOne({ email }, { $set: { verified: true } });
            res.send({ message: "Email verified", result });
        });

      
        app.post("/login", async (req, res) => {
            const { email, password } = req.body;
            const user = await users.findOne({ email });

            if (!user) return res.status(401).send({ error: "Invalid credentials" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).send({ error: "Invalid credentials" });

            if (!user.verified) return res.status(403).send({ error: "Please verify your email first" });

            const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
            res.send({ token });
        });

     
        app.get("/users", verifyToken, async (req, res) => {
            if (req.user.role !== "admin") return res.status(403).send({ error: "Forbidden" });
            const allUsers = await users.find().toArray();
            res.send(allUsers);
        });

        app.post("/tasks", verifyToken, async (req, res) => {
            const { title, description, dueDate, priority, category } = req.body;
            if (!title || !dueDate || !priority) return res.status(400).send({ error: "Title, due date and priority are required" });

            const task = { title, description, dueDate, priority, category, completed: false, user: req.user.email };
            const result = await tasks.insertOne(task);
            res.send(result);
        });

        
        app.get("/tasks", verifyToken, async (req, res) => {
            const { priority, dueDate, category, search, sortBy = 'dueDate', order = 'asc' } = req.query;
            const filter = { user: req.user.email };

            if (priority) filter.priority = priority;
            if (dueDate) filter.dueDate = dueDate;
            if (category) filter.category = category;
            if (search) filter.title = { $regex: search, $options: "i" };

            const sort = { [sortBy]: order === 'desc' ? -1 : 1 };

            const result = await tasks.find(filter).sort(sort).toArray();
            res.send(result);
        });

     
        app.get("/tasks/:id", verifyToken, async (req, res) => {
            const task = await tasks.findOne({ _id: new ObjectId(req.params.id) });
            if (!task || task.user !== req.user.email) return res.status(403).send({ error: "Forbidden" });
            res.send(task);
        });

        app.put("/tasks/:id", verifyToken, async (req, res) => {
            const task = await tasks.findOne({ _id: new ObjectId(req.params.id) });
            if (!task || task.user !== req.user.email) return res.status(403).send({ error: "Forbidden" });

            const updateData = req.body;
            const result = await tasks.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updateData });
            res.send(result);
        });

        app.delete("/tasks/:id", verifyToken, async (req, res) => {
            const task = await tasks.findOne({ _id: new ObjectId(req.params.id) });
            if (!task || task.user !== req.user.email) return res.status(403).send({ error: "Forbidden" });

            const result = await tasks.deleteOne({ _id: new ObjectId(req.params.id) });
            res.send(result);
        });

    } catch (err) {
        console.error(err);
    }
}

run().catch(console.dir);

// Base route
app.get("/", (req, res) => {
    res.send("Task Management Server is running");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
