import React, { useState, useEffect } from 'react';

import GlobalStyle from './globalStyle/style';
import { Container, Content } from './style';

import Upload from './components/upload';
import Filelist from './components/filelist';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import api from './service/api';

function App() {

  const [uploadFiles, setUploadFiles] = useState([]);

  useEffect( () => {
    async function fetchData(){
      const response = await api.get('/file');
      setUploadFiles(response.data.body.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file.url),
        progress: 100,
        uploaded: true,
        error: false,
        url: file.url
      })));
      console.log(response.data);
    }
    fetchData();
  }, [ ]);

  function handleUpload(files){
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));
    setUploadFiles(uploadFiles.concat(uploadedFiles));

    uploadedFiles.forEach(processUpload);
  }

  function upload(id, data) {
    setUploadFiles( uploadFiles.map(file => {
      return id === file.id ? { ...file, ...data } : file;
    }) );
  }

  async function processUpload(file) {

    const data = new FormData();

    data.append('file',file.file, file.name);

    await api.post('/file', data, {
      onUploadProgress: event => {
        const progress = parseInt(Math.round((event.loades * 100) / event.total));
        upload(file.id, {
          progress,
        }, )
      }
    }).then(response => {
      upload(file.id, {
        uploaded: true,
        id: response.data._id,
        url: response.data.url
      });
    }).catch(() =>{
      upload(file.id, {
        uploaded: false
      })
    });
  }

  async function  handleDelete(id) {
    await api.delete(`/file/${id}`);

    setUploadFiles(uploadFiles.filter(file => file.id !== id));
  }

  /*function componentWill(){
    uploadFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }*/

  return (

    <Container>

      <GlobalStyle/>

        <Content>
          <Upload onUpload={handleUpload} onDelete={handleDelete}/>
          { !!uploadFiles.length && (
            <Filelist files={uploadFiles}/>
          ) }
        </Content>

      </Container>
  
  );
}

export default App;
