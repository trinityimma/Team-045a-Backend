const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');


// Handling uncaught exceptions globally
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION 😶', err);
});

// using the dotenv variable
dotenv.config({ path: './.env' });

const app = require('./app');


mongoose.connect("mongodb://localhost/fundme", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    const status = `${chalk.yellow('[?]')} ${chalk.green('DB Connected Successfully')}`;
    console.log(status);
}).catch((err) => {
    const status = `${chalk.yellow('[?]')} ${chalk.red('DB Connection Failed')}`;
    console.log(status, err);
});


// console.log(process.env);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});


// Handling unhandled rejection globally
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
});
