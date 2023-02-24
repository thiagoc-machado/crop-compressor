import React, { useState } from 'react';

import Cropper from 'react-cropper';
import Compressor from 'compressorjs';

import { saveAs } from 'file-saver';
import axios from 'axios';

import './styles.css';
import 'cropperjs/dist/cropper.css';


export default function ImageCropper() {
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState('');
  const [cropper, setCropper] = useState(null);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      let croppedImg = setCropData(cropper.getCroppedCanvas().toDataURL());
      let imgData = cropper.getCroppedCanvas().toDataURL('image/png');
      //document.getElementById('output').src = imgData;

      if (!imgData) {
        return;
      }

      // Cria um novo objeto Blob a partir da string de dados codificados em base64
      const byteCharacters = atob(imgData.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const imgBlob = new Blob([new Uint8Array(byteNumbers)], {
        type: 'image/png',
      });

      new Compressor(imgBlob, {
        quality: 0.8,
        maxWidth: 1080,
        maxHeight: 1080,
        convertSize: 250000, // 100KB

        // Locol save

        success(result) {
          saveAs(result, 'compressed.jpg');

          //Remote save

          // O processo de compressão é assíncrono,
          // o que significa que você precisa acessar o `result` na função de sucesso `success`.
          // success(result) {
          //   const formData = new FormData();
          //   // O terceiro parâmetro é necessário para o servidor
          //   formData.append('file', result, result.name);
          //   // Envie o arquivo de imagem comprimido para o servidor com XMLHttpRequest.
          //   axios.post('../img', formData).then(() => {
          //     console.log('Upload realizado com sucesso');
          //   });
        },
        error(err) {
          console.log(err.message);
        },
      });
      new Compressor(imgBlob, {
        quality: 0.95,
        maxWidth: 2160,
        maxHeight: 2160,
        convertSize: 500000, // 100KB

        // Locol save

        success(result) {
          saveAs(result, 'compressed.jpg');

          //Remote save

          // O processo de compressão é assíncrono,
          // o que significa que você precisa acessar o `result` na função de sucesso `success`.
          // success(result) {
          //   const formData = new FormData();
          //   // O terceiro parâmetro é necessário para o servidor
          //   formData.append('file', result, result.name);
          //   // Envie o arquivo de imagem comprimido para o servidor com XMLHttpRequest.
          //   axios.post('../img', formData).then(() => {
          //     console.log('Upload realizado com sucesso');
          //   });
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  };

  return (
    <div>
      <div className='splitdiv' id='leftdiv'>
        <h1 className='main-h1'>Upload image</h1>
        <div id='leftdivcard'>
          <div className='top_btn'>
            <div className='input-file-wrapper'>
              <input
                type='file'
                accept='image/*'
                className='input-file'
                onChange={onChange}
              />
              <label htmlFor='file' className='btn'>
                Uploads photo
              </label>
            </div>
            <button type='button' id='savebutton' onClick={getCropData}>
              Save
            </button>
          </div>
          <br />
          <div className='photo'>
            <Cropper
              className='cropper'
              zoomTo={0.5}
              aspectRatio={1}
              src={image}
              viewMode={0}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />
            <img src='' id='output' />
          </div>
        </div>
      </div>
    </div>
  );
}
