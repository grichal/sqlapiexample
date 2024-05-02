import sql from 'mssql'

const dbSettings = {
    user: "Gregorio2",
    password: "Gregori78!",
    server: "localhost",
    database: "webstore",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
}

export const getConnection = async ()=>{
    try {
        const pool = await sql.connect(dbSettings)
        console.log("database connection succesfully")
        return pool
    } catch (error) {
        console.log(error)
        if (error instanceof sql.ConnectionError) {
            console.log("Failed to connect to the database. Please check your connection settings.");
        } else {
            console.log("An unknown error occurred:", error);
        }
    }
}