const multer = require("multer");
const axios = require("axios"); // <-- ADD THIS
const path = require("path");

// Storage setup
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage }).single("file");

const uploadFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });

    if (!req.file) return res.status(400).json({ message: "No file selected." });

    const user_id = req.body.user_id; // frontend will send this
    const metadata = {
      user_id,
      filename: req.file.filename,
      original_name: req.file.originalname,
      size: req.file.size
    };

    try {
      await axios.post("http://localhost/cloud-drive/add_file.php", metadata, {
        headers: { "Content-Type": "application/json" }
      });
    } catch (phpError) {
      console.error("PHP Metadata error:", phpError.message);
    }

    res.status(200).json({
      message: "File uploaded + metadata stored.",
      filename: req.file.filename,
    });
  });
};

module.exports = { uploadFile };
