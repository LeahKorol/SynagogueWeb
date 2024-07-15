import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFileAlt, faFileImage } from '@fortawesome/free-solid-svg-icons';
import './AboutForm.css';

function AboutForm() {
  const [files, setFiles] = useState({
    friendsList: null,
    rules: null,
  });

  const handleFileChange = (e, fileType) => {
    setFiles({ ...files, [fileType]: e.target.files[0] });
  };

  const handleFileRemove = (fileType) => {
    setFiles({ ...files, [fileType]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, for example, logging the file data to the console.
    console.log('Files:', files);
    // Reset form
    setFiles({
      friendsList: null,
      rules: null,
    });
  };

  const renderFilePreview = (file, fileType) => (
    <div className="image-item" key={fileType}>
      <div className="image-preview">
        {file.type.startsWith('image/') ? (
          <img src={URL.createObjectURL(file)} alt={file.name} />
        ) : (
          <div className="file-icon">
            <FontAwesomeIcon icon={faFileAlt} size="4x" />
            <p>{file.name}</p>
          </div>
        )}
        <div className="image-overlay">
          <button className="delete-button" onClick={() => handleFileRemove(fileType)}>
            <FontAwesomeIcon icon={faTrash} /> מחק
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="event-gallery-form">
      <h3 className="form-title">אודות הקהילה</h3>
      <form onSubmit={handleSubmit}>
        <div className="image-grid">
          {files.friendsList && renderFilePreview(files.friendsList, 'friendsList')}
          {files.rules && renderFilePreview(files.rules, 'rules')}
        </div>
        <label className="file-label">
          <FontAwesomeIcon icon={faFileImage} /> טופס חברי הקהילה
          <input
            type="file"
            className="file-input"
            onChange={(e) => handleFileChange(e, 'friendsList')}
            disabled={!!files.friendsList}
          />
        </label>
        <br />
        <label className="file-label">
          <FontAwesomeIcon icon={faFileAlt} /> טופס תקנון הקהילה
          <input
            type="file"
            className="file-input"
            onChange={(e) => handleFileChange(e, 'rules')}
            disabled={!!files.rules}
          />
        </label>
        <br />
        <button type="submit" className="btn-save">שלח</button>
      </form>
    </div>
  );
}

export default AboutForm;
