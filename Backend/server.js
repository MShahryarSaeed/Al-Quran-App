// server.js
import express from 'express';  
import mongoose from 'mongoose';  
import cors from 'cors';  
import bodyParser from 'body-parser';  
import bookmarksRoutes from './modules/Bookmarks/bookmarks.routes.js';
import requestIp from 'request-ip';
import dotenv from 'dotenv';
dotenv.config();

const app = express();  
const PORT = process.env.PORT || 5000;  

app.use(cors());  
app.use(express.json());
app.use(bodyParser.json());  
app.use(requestIp.mw())


// Connection
mongoose.connect(process.env.MONGODB_URI, {})
.then(()=>console.log('Connected to MongoDB Successfully'))
.catch((error)=>console.log('Error While connecting to Database'));


// Routes
app.use("/api/quran/bookmarks",bookmarksRoutes);





app.post('/api/bookmarks', async (req, res) => {  
    const { userId, surah, ayah } = req.body;  
    const bookmark = new Bookmark({ userId, surah, ayah });  
    await bookmark.save();  
    res.status(201).send(bookmark);  
});  

app.get('/api/bookmarks/:userId', async (req, res) => {  
    const bookmarks = await Bookmark.find({ userId: req.params.userId });  
    res.send(bookmarks);  
});  

app.delete('/api/bookmarks/:id', async (req, res) => {  
    await Bookmark.findByIdAndDelete(req.params.id);  
    res.status(204).send();  
});  

app.listen(PORT, () => {  
    console.log(`Server running on http://localhost:${PORT}`);  
});
