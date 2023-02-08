const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

class MongoDB {
    constructor() {
        this.client;
    }

    async init(app) {
        try {
            await mongoose.connect(
                process.env.MONGO_URI,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
            this.client = mongoose.connection;
            console.log('Database connection successful');
            app.emit('ready');
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = new MongoDB();