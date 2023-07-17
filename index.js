const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'files/' });


app.post('/upload', upload.single('file'), (req, res) => {

    const file = req.file;
    if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }
    const filename = file.originalname;
    const filepath = path.join(__dirname, 'files', filename);
    fs.rename(file.path, filepath + path.extname(filename), function (err) {
      if (err) {
        console.log(err);
        res.send('File upload failed');
      } else {
        
        //res.sendFile(path.join(__dirname, 'public', 'index.html'));
        res.json({ message: 'Data saved successfully' });
      }
    });
  });
  

app.get("/getfiles", (req, res) => {
    
    fs.readdir('./files', (err, files) => {
        if (err) {
          console.error('Ошибка при чтении каталога:', err);
          return;
        }
      
        res.send(files);
        
      });

});


app.use(express.json()); // Добавьте эту строку для разбора тела запроса в формате JSON

app.get("/", (req, res) => {
  res.redirect("/web/html/index.html"); // Перенаправление на страницу "menu.html"
});

app.get("*", (req, res) => {
  console.log(`Запрошенный адрес: ${req.url}`);

  const filePath = req.url.substr(1);
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      res.status(404).send("Resource not found!");
    } else {  

      fs.createReadStream(filePath).pipe(res);
    }
  });
});






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
