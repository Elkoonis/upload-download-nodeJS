const express = require("express");
const app = express();
const hbs = require("hbs");
const multer = require("multer");
const upload = multer({ dest: "files" });
const folder = require("./folder");

var newDate = new Date();

const storageConfig = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, "files")
        },

        filename: (req, file, cb) => {
            cb(null, newDate.toLocaleDateString() + "-" + file.originalname)
        }
    }
);

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partial");
app.use(express.static(__dirname));
app.use(multer({ storage: storageConfig }).single("filedata"));
app.get("/", function (request, response) {
    let links = folder.getFiles("./files/");
    response.render("index", {
        title: "Главная страница",
        discription: "Список файлов",
        links: links,
    });
});

app.get("/upload", function (request, response) {
    response.render("upload", {
        title: "Upload",
        buttonName: "Загрузить файл"
        
    });
});

app.post("/upload", upload.single("filedata"), function (request, response, next) {
    let filedata = request.file;
    if (!filedata) response.send("Файл был не выбран, вернитесь на прошлую страницу");
    else
        response.render("upload", {
            title: "Upload",
            buttonName: "Загрузить файл",
            text: "Файл успешно загружен"
        });
});

app.listen(3000, function () {
    console.log("server started");
});



