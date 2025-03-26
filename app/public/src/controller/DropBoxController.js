class DropBoxController {
  constructor() {
    this.btnSendFileEl = document.querySelector('#btn-send-file');
    this.inputFileEl = document.querySelector('#files');
    this.snackModalEl = document.querySelector('#react-snackbar-root');

    this.initEvents();
  }

  initEvents() {
    this.btnSendFileEl.addEventListener('click', (event) => {
      console.log('clicou', event);

      this.inputFileEl.click();
    });

    this.inputFileEl.addEventListener('change', (event) => {
      console.log(event.target.files);

      uploadTask(event.target.files);

      this.snackModalEl.computedStyleMap.display = 'block';
    });
  }

  uploadTask(files) {
    let promises = [];

    //files é uma colecao tem que converter em array
    [...files].forEach((file) => {
      promises.push(
        new Promise((resolve, reject) => {
          let ajax = new XMLHttpRequest();

          ajax.open('POST', '/upload');

          ajax.onload = (event) => {
            try {
              resolve(JSON.parse(ajax.responseText));
            } catch (e) {
              reject(e);
            }
          };
          ajax.onerror = (event) => {
            reject(event);
          };
          let formData = new FormData();

          formData.append('input-file', file);

          ajax.send(formData);
        }),
      );
    });

    return Promise.all(promises);
  }
}
