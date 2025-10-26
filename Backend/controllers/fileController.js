const multer = require("multer");
const path = require("path");

// Storage setup
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Initialize multer
const upload = multer({ storage }).single("file");

// Upload controller
const uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ message: "File upload failed" });
    }

    // Send success response
    res.status(200).json({
      message: "File uploaded successfully!",
      filename: req.file.filename,
    });
  });
};

module.exports = { uploadFile };
