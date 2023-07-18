function updateFilesList() {  
  const fileslist = document.getElementById('fileslist');
  const previewsMap = new Map();

  fetch('/getfiles')
    .then(response => response.json())
    .then(data => {
      // Очищаем содержимое <ul> перед добавлением новых данных
      fileslist.innerHTML = '';

      data.forEach(item => {
        const liElement = document.createElement('li');
        liElement.classList.add('file-item');

        if (!previewsMap.has(item)) {
          // Если предпросмотр для этого файла еще не получен, то запросим его
          const imgElement = document.createElement('img');
          imgElement.src = '/files/' + item; // Укажите правильный URL для получения предпросмотра
          imgElement.classList.add('file-preview');

          // Добавляем предпросмотр в карту, чтобы избежать повторных запросов
          previewsMap.set(item, imgElement);
        }

        const fileExtension = item.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
          // If the file is a photo, show the photo preview
          liElement.appendChild(previewsMap.get(item));
        } else {
          // If the file is not a photo, hide the photo preview
          previewsMap.get(item).style.display = 'none';

          // Show the file name instead
          const fileNameElement = document.createElement('div');
          fileNameElement.textContent = item;
          fileNameElement.classList.add('file-name');
          
          liElement.appendChild(fileNameElement);
        }

        liElement.addEventListener('click', () => {
          console.log(item);
          downloadFile(item);
        });

        fileslist.appendChild(liElement);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

  document.addEventListener('DOMContentLoaded',updateFilesList);




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
        updateFilesList()
        return response.text(); // Возвращаем тело ответа в виде текста
      })
      .then(data => {
        console.log('Тело ответа сервера:', data); // Просматриваем тело ответа сервера
      })
      .catch(error => {
        console.error('Произошла ошибка при отправке файла:', error);
      });
    
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