import React from 'react';
import Dropzone from 'react-dropzone';


import { DropContainer, UploadMessage } from './style';

function Upload(props){

    function renderDragMessage(isDragActive, isDragReject){
        if(!isDragActive)
            return <UploadMessage>Arraste os arquivos aqui...</UploadMessage>
        if(isDragReject)
            return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
        return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>
    }

    const {  onUpload  } = props;

    return(

        <Dropzone accept="image/*" onDropAccepted={onUpload}>
            { ({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                <DropContainer { ... getRootProps()}
                    isDragActive={isDragActive}
                    isDragReject={isDragReject}>
                <input {...getInputProps()}/>
                {renderDragMessage(isDragActive, isDragReject)}
                </DropContainer>
            ) }
        </Dropzone>

    );

}


export default Upload;