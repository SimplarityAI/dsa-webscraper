const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// GET /api/downloads/:filename -> streams the report file if present
router.get('/downloads/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        if (!filename || filename.includes('..') || filename.includes('/')) {
            return res.status(400).json({ error: 'Invalid filename' });
        }

        const reportsDir = path.join(__dirname, '..', 'public', 'reports');
        const filePath = path.join(reportsDir, filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        res.download(filePath, filename);
    } catch (error) {
        console.error('Error handling download:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
