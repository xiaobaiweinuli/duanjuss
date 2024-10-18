const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());

// 假设夸克网盘的API已经封装在这个函数中
const saveToQuarkDriveAndShare = async (url) => {
    // 这里应该是夸克网盘API的调用代码
    // 返回一个分享链接
    return `https://example.com/shared/${encodeURIComponent(url)}`;
};

app.post('/api/save-and-share', async (req, res) => {
    const { url } = req.body;
    try {
        const shareLink = await saveToQuarkDriveAndShare(url);
        res.json({ shareLink });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/append-to-file', (req, res) => {
    const { url, shareLink } = req.body;
    const content = `名称: [${url}](${shareLink})\n`;
    fs.appendFile('links.md', content, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.send('File updated successfully');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // For testing purposes
