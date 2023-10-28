var pool = require('database');
const app = express();


app.use((req, res, next) => {
    //res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.status(200).json({
        message: "HEllo"
    });
});