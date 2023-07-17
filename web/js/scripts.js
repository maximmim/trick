document.addEventListener('DOMContentLoaded', () => {
    const fileslist = document.getElementById('fileslist');
  
    function updateFilesList() {
      fetch('/getfiles')
        .then(response => response.json())
        .then(data => {
          // Очищаем содержимое <ul> перед добавлением новых данных
          fileslist.innerHTML = '';
  
          data.forEach(item => {
            const liElement = document.createElement('li');
            liElement.addEventListener('click',()=>{
                console.log(liElement.textContent)
                downloadFile(liElement.textContent)
            })
            liElement.textContent = item;
            fileslist.appendChild(liElement);
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  
    // Обновляем данные каждую секунду
    setInterval(updateFilesList, 1000);
  });
  

  function downloadFile(fileName) {
    const fileUrl = '/files/'+fileName; // Укажите правильный URL вашего файла

  
    // Создаем элемент <a> с атрибутами download и href
    const link = document.createElement('a');
    link.setAttribute('download', fileName);
    link.setAttribute('href', fileUrl);
  
    // Добавляем элемент в DOM и вызываем метод click()
    document.body.appendChild(link);
    link.click();
  
    // Удаляем элемент из DOM после скачивания файла
    document.body.removeChild(link);
  }
  
  // Вызываем функцию downloadFile() при необходимости (например, по нажатию кнопки)

function add() {
    const fileInput = document.getElementById('inp');
    const files = fileInput.files;

    if (files.length === 0) {
      alert('Пожалуйста, выберите файл для загрузки.');
      return;
    }

    
    const formData = new FormData();
    formData.append('file', files[0]); // Добавляем выбранный файл в объект FormData

    fetch('/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        console.log('Статус ответа сервера:', response.status); // Проверяем статус ответа
        return response.text(); // Возвращаем тело ответа в виде текста
      })
      .then(data => {
        console.log('Тело ответа сервера:', data); // Просматриваем тело ответа сервера
      })
      .catch(error => {
        console.error('Произошла ошибка при отправке файла:', error);
      });
    if (files[0].type == "image/png") {

document.getElementById('buttonup').textContent= "Завантажити "+"фото"
    }
    
    
    else if(  files[0].type == "image/jpeg") {
        document.getElementById('buttonup').textContent= "Завантажити "+"фото"
    }
    
    else if(  files[0].type == "application/x-zip-compressed") {
        document.getElementById('buttonup').textContent= "Завантажити "+"zip"
    }
    else if(  files[0].type == "text/plain") {
        document.getElementById('buttonup').textContent= "Завантажити "+"txt"
    }
    
    else {
        document.getElementById('buttonup').textContent= "Завантажити "+files[0].name
    }
}

function sendFile() {
    const fileInput = document.getElementById('inp');
    const files = fileInput.files;

    if (files.length === 0) {
      alert('Пожалуйста, выберите файл для загрузки.');
      return;
    }

    
    const formData = new FormData();
    formData.append('file', files[0]); // Добавляем выбранный файл в объект FormData

    fetch('/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        console.log('Статус ответа сервера:', response.status); // Проверяем статус ответа
        return response.text(); // Возвращаем тело ответа в виде текста
      })
      .then(data => {
        console.log('Тело ответа сервера:', data); // Просматриваем тело ответа сервера
      })
      .catch(error => {
        console.error('Произошла ошибка при отправке файла:', error);
      });
}