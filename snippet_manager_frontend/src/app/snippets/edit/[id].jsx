import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const EditSnippet = () => {
  const [snippet, setSnippet] = useState({ language: '', code: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchSnippet();
    }
  }, [id]);

  const fetchSnippet = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/snippets/${id}`);
      setSnippet(response.data);
    } catch (error) {
      toast.error("Failed to load snippet.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSnippet = async () => {
    setIsSubmitting(true);
    try {
      await axios.put(`http://localhost:8080/api/snippets/${id}`, snippet);
      toast.success("Snippet updated successfully!");
      router.push('/user/dashboard'); // Redirect back to the dashboard after save
    } catch (error) {
      toast.error("Failed to update snippet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setSnippet({ ...snippet, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Edit Snippet</h1>

      {isLoading ? (
        <p>Loading snippet...</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveSnippet();
          }}
        >
          <div>
            <label htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              value={snippet.language}
              onChange={handleChange}
              disabled
            >
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C++">C++</option>
              <option value="Ruby">Ruby</option>
            </select>
          </div>

          <div>
            <label htmlFor="code">Code</label>
            <textarea
              id="code"
              name="code"
              placeholder="Edit your code here..."
              value={snippet.code}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Snippet'}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditSnippet;
