
import { useState } from 'react';
import {Image} from 'semantic-ui-react'
import './FileSelector.scss'
// We are passing `pet` and `setPet` as props to `FileSelector` so we can
// set the file we selected to the pet state on the `Form` outer scope
// and keep this component stateless.
const FileSelector = ({song, setSong,label='Image'}) => {

  // Read the FileList from the file input component, then
  // set the first File object to the pet state.
  const fileFilter=label==='Image'?'image/*' : 'audio/*'
  const [src,setSrc]=useState(null)
  const readFiles = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        if(label==='Image')
            setSong({...song, imgFile: files[0]});
        else
             setSong({...song, audioFile: files[0]});
        setSrc(URL.createObjectURL(files[0]))
       
    }
  };

  return (
    <div className="file-selector">
      <label for="fileInput">{label}:</label>
      {/* Add readFiles as the onChange handler. */}
      <input className='fileInput' type="file" accept={fileFilter} onChange={readFiles} />
      {src?
      (<div className='content'>
      {label==='Image'?
      (<Image src={src}></Image>):
      (<audio src={src} controls></audio>)}
      </div>):
      (<></>)
      }
    </div>
  );
};

export default FileSelector;