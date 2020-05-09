import React from 'react';

import { Container, FileInfo, Preview,  } from './style';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

function FileList({ files, onDelete }){

    return(

        <Container>
            { files.map(file => (
                <li key={file.id}>
                    <FileInfo>
                        <Preview src={file.preview} />
                        <div>
                            <strong>{file.name}</strong>
                            <span>{file.readableSize} { !!file.url && (
                                <button onClick={() => onDelete(file.id)}>Excluir</button>
                            )}</span>
                        </div>
                    </FileInfo>

                    <div>
                        {!file.uploaded && !file.error && (
                            <CircularProgressbar
                                styles={{
                                root: { width: 24 },
                                path: { stroke: "#7159c1" }
                                }}
                                strokeWidth={10}
                                maxValue={100}
                                value={file.progress}
                            />
                        )}

                        {file.url && (
                            <a href={file.url} rel="noopener noreferrer" target="_blank" >
                                <MdLink style={{marginRight: 8}} size={24} color="#222"></MdLink>
                            </a>
                        )}

                        {file.uploaded && (<MdCheckCircle size={24} color="#78e5d5" />)}
                        {file.error && (<MdError size={24} color="#e57878" />)}
                    </div>
                    
                </li>
            )) }
        </Container>

    );
    
}

export default FileList;