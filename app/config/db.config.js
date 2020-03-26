module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "l4np0rt.ch",
    DB: "lp_backend_development",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};