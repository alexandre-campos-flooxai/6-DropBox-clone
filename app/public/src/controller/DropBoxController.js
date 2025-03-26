class DropBoxController {
  constructor() {
    this.btnSendFileEl = document.querySelector('#btn-send-file');
    this.inputFilesEl = document.querySelector('#files');
    this.snackModalEl = document.querySelector('#react-snackbar-root');
    this.progressBarEl = this.snackModalEl.querySelector('.mc-progress-bar-fg');
    this.nameFileEl = this.snackModalEl.querySelector('.filename');
    this.timeleftEl = this.snackModalEl.querySelector('.timeleft');

    this.initEvents();
  }

  initEvents() {
    this.btnSendFileEl.addEventListener('click', (event) => {
      console.log('clicou', event);

      this.inputFilesEl.click();
    });

    this.inputFilesEl.addEventListener('change', (event) => {
      console.log(event.target.files);

      this.uploadTask(event.target.files);

      this.snackModalEl.style.display = 'block';
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

          ajax.upload.onprogress = (event) => {
            console.log(event);
            this.uploadProgress(event, file);
          };

          let formData = new FormData();

          formData.append('input-file', file);

          ajax.send(formData);
        }),
      );
    });

    return Promise.all(promises);
  }

  uploadProgress(event, file) {
    let loaded = event.loaded;
    let total = event.total;
    let porcent = parseInt((loaded / total) * 100);

    this.progressBarEl.style.width = `${porcent}%`;

    this.nameFileEl.innerHTML = file.nameFileEl;
    this.timeleftEl.innerHTML;
  }
}
