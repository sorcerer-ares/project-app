const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

// setup storage
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage }).single("file");

// upload controller
const uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Upload failed" });
    }

    const fileData = {
      filename: req.file.filename,
      filepath: `/uploads/${req.file.filename}`,
      filesize: req.file.size,
    };

    try {
      // Call PHP API to insert into MySQL
      await axios.post("http://localhost/php/saveFile.php", fileData);
      res.status(200).json({ message: "File uploaded successfully!" });
    } catch (phpErr) {
      console.error("PHP API error:", phpErr.message);
      res.status(200).json({ message: "File saved locally but DB failed" });
    }
  });
};

// download controller
const downloadFile = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ message: "File not found" });
  }
};

// delete controller
const deleteFile = async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);

  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    await axios.post("http://localhost/php/deleteFile.php", { filename });
    res.json({ message: "File deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting file" });
  }
};

module.exports = { uploadFile, downloadFile, deleteFile };
