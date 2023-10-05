const corsOptions = {
    origin: function (origin, callback) {
        db.loadOrigins(function (error, origins) {
            callback(error, origins);
        });
    }
};