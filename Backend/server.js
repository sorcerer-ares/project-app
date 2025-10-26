const express = require("express");
const cors = require("cors");
const deotenv = require("dotenv")
const path = require("path")
const fileRoutes = require("./routes/fileroutes")
const fileDisplay = require('./routes/files');
const connectDB = require("./lib/db")
const app = express();
const PORT = 5001;
app.use(cors());
app.use(express.json());
dotenv.config()
app.use("/", fileRoutes);
app.use('/files', fileDisplay);

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '..', 'Frontend', 'index.html');
  console.log('👉 Resolved path:', filePath);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('❌ Error sending file:', err);
      res.status(500).send('File not found or path incorrect');
    }
  });
});
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
