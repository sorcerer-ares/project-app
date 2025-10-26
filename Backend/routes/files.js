const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const uploadDir = path.join(__dirname, '../uploads');

// GET /files - list all uploaded files
router.get('/', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Unable to fetch files' });

    const fileList = files.map(filename => {
      const stats = fs.statSync(path.join(uploadDir, filename));
      return {
        name: filename,
        size: stats.size,
        date: stats.mtime,
        type: path.extname(filename).toLowerCase()
      };
    });

    res.json(fileList);
  });
});

module.exports = router;
