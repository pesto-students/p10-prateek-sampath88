require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./database/sequelize");
const { syncDB } = require('./database/db.sync');


// storage middleware
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});



//import all routes here
const usersRouter = require("./routes/users/index");
const walletRouter = require("./routes/wallet/index");
const investmentRouter = require("./routes/investments/index");




const app = express();


//swagger documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//regular middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


  

//router middleware
app.use("/api/v1", usersRouter);
app.use("/api/v1/wallet", walletRouter);
app.use("/api/v1/investment", investmentRouter);

// const { createBulkUser } = require('./database/script')
// await createBulkUser();

app.post('/upload', upload.single('file'), (req, res) => {
    // Check req.file here
    console.log(req.file)
    console.log(req.body);
    return res.status(200).json();
  });


const init = async () => {
  try {
        const PORT = 3000;
        await db.authenticate();
        await syncDB();
        console.log("All models were synchronized successfully.");
        console.log("Connection has been established successfully.");
        app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));

    }
    catch(err) {
        console.error("Unable to connect to the database:", err.original);
    }
};

init();