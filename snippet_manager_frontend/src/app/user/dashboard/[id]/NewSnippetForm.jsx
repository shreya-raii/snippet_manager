import React, { useState } from 'react';

const NewSnippetForm = ({ onSubmit, onClose }) => {
  const [snippet, setSnippet] = useState({
    title: '',
    language: 'javascript', // Default language (can be changed in the dropdown)
    code: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSnippet({ ...snippet, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(snippet);
  };

  return (
    <div className="new-snippet-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={snippet.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Language:</label>
          <select
            name="language"
            value={snippet.language}
            disabled
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c++">C++</option>
            <option value="ruby">Ruby</option>
          </select>
        </div>
        <div>
          <label>Code:</label>
          <textarea
            name="code"
            value={snippet.code}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Snippet</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default NewSnippetForm;