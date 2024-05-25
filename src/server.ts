import bodyParser from 'body-parser';
import express from 'express';
import nocache from 'nocache';
import path from 'path';

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

// TODO: might want to add fast failure when env vars not configured properly
const LOG_CHAT_ID = parseInt(process.env.LOG_CHAT_ID || '');
const BOT_TOKEN = process.env.BOT_TOKEN || '';
const PORT = process.env.PORT || 3001;

const app = express();

// app configuration
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
// https://docs.ton.org/develop/dapps/telegram-apps/tips-and-tricks#are-there-any-recommendations-on-caching-headers-for-html-files
app.use(nocache());
app.set('etag', false);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/process-form-data', (req, res) => {
    // TODO: might want to implement retry
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        redirect: 'follow',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: LOG_CHAT_ID,
            text: JSON.stringify(req.body, null, 2) // human-readable
        })
    })
        .catch(console.error);

    res.redirect('/');
});

// running the app
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
