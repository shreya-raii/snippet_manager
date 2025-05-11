'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './dashboard.module.css';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';

const Dashboard = () => {
  const [snippets, setSnippets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [newSnippet, setNewSnippet] = useState({ language: 'JavaScript', code: '' });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState(null);
  const [snippetId, setSnippetId] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const userId = params?.id;

  useEffect(() => {
    if (userId) {
      fetchSnippets(userId);
    } else {
      toast.error('User ID not found in the URL.');
    }
    setLoading(false);
  }, [userId]);

  const fetchSnippets = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/snippets/user/${userId}`);
      setSnippets(response.data);
    } catch (error) {
      toast.error('Failed to fetch snippets');
    }
  };

  const openAddSnippetModal = () => {
    setNewSnippet({ language: 'JavaScript', code: '' });
    setStep(1);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setStep(1);
    setNewSnippet({ language: 'JavaScript', code: '' });
  };

  const handleSaveSnippet = async () => {
    try {
      await axios.post('http://localhost:8080/api/snippets/create', {
        ...newSnippet,
        userId: userId,
      });
      toast.success('Snippet saved!');
      closeModal();
      fetchSnippets(userId);
    } catch (error) {
      toast.error('Failed to save snippet');
    }
  };

  const openEditModal = (snippet) => {
    setCurrentSnippet({ ...snippet });
    setSnippetId(snippet.id);
    setEditModalOpen(true);
  };

  const handleUpdateSnippet = async () => {
    if (snippetId && currentSnippet) {
      try {
        await axios.post('http://localhost:8080/api/snippets/update', {
          id: snippetId,
          code: currentSnippet.code,
          language: currentSnippet.language,
          userId: userId
        });
        toast.success('Snippet updated!');
        setEditModalOpen(false);
        fetchSnippets(userId);
      } catch (error) {
        toast.error('Update failed');
      }
    }
  };

  const handleDeleteSnippet = async (id) => {
    try {
      await axios.post('http://localhost:8080/api/snippets/delete', {
        id: id
      });
      toast.success('Snippet deleted!');
      fetchSnippets(userId);
    } catch (error) {
      toast.error('Failed to delete snippet');
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Dashboard - Snippet Manager</h1>

      <div className={styles.topActions}>
        <button className={styles.addButton} onClick={openAddSnippetModal}>
          Add New Snippet
        </button>
      </div>

      <ul className={styles.snippetList}>
        {snippets.map(snippet => (
          <li key={snippet.id} className={styles.snippetItem}>
            <div className={styles.snippetMeta}>
              <span className={styles.languageTag}>{snippet.language}</span>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteSnippet(snippet.id)}
              >
                Delete
              </button>
            </div>
            <pre
              className={styles.codeBlock}
              onClick={() => openEditModal(snippet)}
            >
              {snippet.code.length > 60 ? snippet.code.slice(0, 60) + '...' : snippet.code}
            </pre>
          </li>
        ))}
      </ul>


      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            {step === 1 && (
              <>
                <h3>Select Language</h3>
                <select
                  value={newSnippet.language}
                  onChange={e => setNewSnippet({ ...newSnippet, language: e.target.value })}
                  className={styles.select}
                >
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                  <option value="Ruby">Ruby</option>
                </select>
                <div className={styles.modalActions}>
                  <button onClick={closeModal}>Cancel</button>
                  <button onClick={() => setStep(2)}>Next</button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3>Enter Code</h3>
                <textarea
                  className={styles.textarea}
                  rows={10}
                  value={newSnippet.code}
                  onChange={e => setNewSnippet({ ...newSnippet, code: e.target.value })}
                  placeholder="Write your code here..."
                />
                <div className={styles.modalActions}>
                  <button onClick={closeModal}>Cancel</button>
                  <button onClick={handleSaveSnippet}>Save</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {editModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Edit Snippet - {currentSnippet.language}</h3>
            <textarea
              className={styles.textarea}
              rows={10}
              value={currentSnippet.code}
              onChange={(e) =>
                setCurrentSnippet({ ...currentSnippet, code: e.target.value })
              }
            />
            <div className={styles.modalActions}>
              <button onClick={() => setEditModalOpen(false)}>Cancel</button>
              <button onClick={handleUpdateSnippet}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
