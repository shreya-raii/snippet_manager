'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './dashboard.module.css';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import websocketService from '../../../services/websocket';

const Dashboard = () => {
  const [snippets, setSnippets] = useState([]);
  const [collaboratedSnippets, setCollaboratedSnippets] = useState([]);
  const [sharedSnippets, setSharedSnippets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [newSnippet, setNewSnippet] = useState({ language: 'JavaScript', code: '' });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState(null);
  const [snippetId, setSnippetId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collaboratorsEnabled, setCollaboratorsEnabled] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [permissionAccess, setPermissionAccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [snippetCollaborators, setSnippetCollaborators] = useState([]);
  const [collaboratorSearch, setCollaboratorSearch] = useState('');
  
  const itemsPerPage = 5;
  const [myPage, setMyPage] = useState(1);
  const [collabPage, setCollabPage] = useState(1);
  const [sharedPage, setSharedPage] = useState(1);

  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState("");

  const router = useRouter();

  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedFirstName = localStorage.getItem('firstName');

    if (!token || !storedUserId) {
      toast.error('Unauthorized. Please login again.');
      router.push('/login');
      return;
    } 
    
    setUserId(storedUserId);
    setFirstName(storedFirstName);
    fetchSnippets(storedUserId);
    setLoading(false);

    if (snippetId) {
      websocketService.subscribeToSnippet(snippetId, (newCode) => {
        console.log('Incoming WebSocket Data:', newCode);
        setCurrentSnippet((prev) => ({ ...prev, code: newCode }));
      });
    }
  }, [snippetId]);

  const fetchSnippets = async (userId) => {
    try {
      const responseSnippets = await axios.get(`http://localhost:8080/api/snippets/user/${userId}`);
      setSnippets(responseSnippets.data);

      const responseCollaboratedSnippets = await axios.get(`http://localhost:8080/api/snippets/collaborated/${userId}`);
      setCollaboratedSnippets(responseCollaboratedSnippets.data);

      const responseSharedSnippets = await axios.get(`http://localhost:8080/api/snippets/shared/${userId}`);
      setSharedSnippets(responseSharedSnippets.data);
    } catch (error) {
      toast.error('Failed to fetch snippets');
    }
  };

  const openAddSnippetModal = async () => {
    setNewSnippet({ language: 'JavaScript', code: '' });
    setStep(1);
    setShowModal(true);
    setCollaboratorsEnabled(false);
    setCollaborators([]);
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
        collaborators: collaboratorsEnabled ? collaborators : []
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

  const openSharedEditModal = (snippet, permission) => {
    setPermissionAccess(permission);
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
        websocketService.sendEditSnippet(snippetId, currentSnippet.code);
        setEditModalOpen(false);
        fetchSnippets(userId);
      } catch (error) {
        toast.error('Update failed');
      }
    }
  };

  const handleDeleteSnippet = async (id) => {
    if (confirm("Are you sure you want to delete this snippet?")) {
      try {
        await axios.post('http://localhost:8080/api/snippets/delete', {
          id: id
        });
        toast.success('Snippet deleted!');
        fetchSnippets(userId);
      } catch (error) {
        toast.error('Failed to delete snippet');
      }
    }
  };

  const fetchCollaborators = async(id) => {
    if(id) {
      try{
        const response = await axios.post('http://localhost:8080/api/snippets/getCollaborators', {
          id: id
        });
        setSnippetCollaborators(response.data);
      } catch(error) {
        toast.error('Failed to get Collaborators');
      }
    }
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      router.push('/login');
    }
  };

  const filteredSnippets = snippets.filter(snippet =>
    snippet.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
    snippet.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginate = (items, page) => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  const filteredCollaborators = snippetCollaborators.flat().filter(
    c => c?.email?.toLowerCase().includes(collaboratorSearch.toLowerCase())
  );
  
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.headerRow}>
        <h1 className={`${styles.title} ${styles.fadeIn}`}>
          {firstName ? `Hello ${firstName}, Welcome to your Snippet Workspace` : "Snippet Workspace"}
        </h1>
        <div className={styles.topActions}>
          <button className={styles.addButton} onClick={openAddSnippetModal}>Add New Snippet</button>
          <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <hr className={styles.divider} />

      <div className={styles.gridContainer}>
        {/* My Snippets (1/3) */}
        <div className={styles.boxOneThird}>
          <h2 className={styles.heading}>My Snippets</h2>
          {filteredSnippets.length > 0 ? (
            <>
              <div className={styles.searchWrapper}>
                <input
                  type="text"
                  placeholder="Search by language or code..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
                <span className={styles.searchIcon}>🔍</span>
              </div>

              {paginate(filteredSnippets, myPage).map(snippet => (
                <li key={snippet.id} className={styles.snippetItem}>
                  <div className={styles.snippetMeta}>
                    <span className={styles.languageTag}>{snippet.language}</span>
                    <button className={styles.deleteButton} onClick={() => handleDeleteSnippet(snippet.id)}>Delete</button>
                  </div>
                  <pre className={styles.codeBlock} onClick={() => openEditModal(snippet)}>
                    {snippet.code.length > 60 ? snippet.code.slice(0, 60) + '...' : snippet.code}
                  </pre>
                </li>
              ))}

              {filteredSnippets.length > itemsPerPage && (
                <div className={styles.pagination}>
                  <button onClick={() => setMyPage(prev => Math.max(prev - 1, 1))} disabled={myPage === 1}>Prev</button>
                  <span>{myPage}</span>
                  <button onClick={() => setMyPage(prev => prev + 1)} disabled={myPage * itemsPerPage >= filteredSnippets.length}>Next</button>
                </div>
              )}
            </>
          ) : (
            <p className={styles.noSnippetsMessage}>No snippets available to show.</p>
          )}
        </div>

        {/* Collaboration Section (2/3) */}
        <div className={styles.boxTwoThird}>
          <h2 className={styles.heading}>Collaboration Space</h2>
          <div className={styles.collabGrid}>
            
            {/* Collaborated Snippets Box */}
            <div className={styles.collabCard}>
              <h3 className={styles.cardTitle}>My Collaborations</h3>
              {collaboratedSnippets.length > 0 ? (
                <ul className={styles.snippetList}>
                  {paginate(collaboratedSnippets, collabPage).map(snippet => (
                    <li key={snippet.id} className={styles.snippetItem}>
                      <div className={styles.snippetMeta}>
                        <span className={styles.languageTag}>{snippet.language}</span>
                        <button className={styles.deleteButton} onClick={() => handleDeleteSnippet(snippet.id)}>Delete</button>
                      </div>
                      <pre
                        className={styles.codeBlock}
                        onClick={() => {
                          openEditModal(snippet);
                          fetchCollaborators(snippet.id);
                        }}
                      >
                        {snippet.code.length > 60 ? snippet.code.slice(0, 60) + '...' : snippet.code}
                      </pre>
                    </li>
                  ))}
                  {collaboratedSnippets.length > itemsPerPage && (
                    <div className={styles.pagination}>
                      <button onClick={() => setCollabPage(prev => Math.max(prev - 1, 1))} disabled={collabPage === 1}>Prev</button>
                      <span>{collabPage}</span>
                      <button onClick={() => setCollabPage(prev => prev + 1)} disabled={collabPage * itemsPerPage >= collaboratedSnippets.length}>Next</button>
                    </div>
                  )}
                </ul>
              ) : (
                <p className={styles.noSnippetsMessage}>No collaborated snippets available to show.</p>
              )}
            </div>

            {/* Shared With Me Box */}
            <div className={styles.collabCard}>
              <h3 className={styles.cardTitle}>Shared With Me</h3>
              {sharedSnippets.length > 0 ? (
                <ul className={styles.snippetList}>
                  {paginate(sharedSnippets, sharedPage).map(([snippet, permission]) => (
                    <li key={snippet.id} className={styles.snippetItem}>
                      <div className={styles.snippetMeta}>
                        <span className={styles.languageTag}>{snippet.language}</span>
                        <span className={styles.permissionTag}>{permission}-access</span>
                      </div>
                      <pre
                        className={styles.codeBlock}
                        onClick={() => {
                          openSharedEditModal(snippet, permission);
                          fetchCollaborators(snippet.id);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {snippet.code.length > 60 ? snippet.code.slice(0, 60) + '...' : snippet.code}
                      </pre>
                    </li>
                  ))}
                  {sharedSnippets > itemsPerPage && (
                    <div className={styles.pagination}>
                      <button onClick={() => setSharedPage(prev => Math.max(prev - 1, 1))} disabled={sharedPage === 1}>Prev</button>
                      <span>{sharedPage}</span>
                      <button onClick={() => setSharedPage(prev => prev + 1)} disabled={sharedPage * itemsPerPage >= sharedSnippets.length}>Next</button>
                    </div>
                  )}
                </ul>
              ) : (
                <p className={styles.noSnippetsMessage}>No shared snippets available to show.</p>
              )}
            </div>
          </div>
        </div>


      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalHeading}>Add New Snippet</h2>
            {step === 1 && (
              <>
                <div className={styles.inputGroupRow}>
                  <label className={styles.inlineLabel}>Select Language</label>
                  <select
                    value={newSnippet.language}
                    onChange={e => setNewSnippet({ ...newSnippet, language: e.target.value })}
                    className={styles.inlineSelect}
                  >
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                    <option value="Ruby">Ruby</option>
                  </select>
                </div>


                <div className={styles.inputGroupRow}>
                  <label className={styles.inlineLabel}>Enable Collaboration?</label>
                  <select
                    value={collaboratorsEnabled ? 'Yes' : 'No'}
                    onChange={(e) => {
                      const isYes = e.target.value === 'Yes';
                      setCollaboratorsEnabled(isYes);
                      setCollaborators(isYes ? [{ userId: '', permission: 'Read' }] : []);

                      if (isYes) {
                        (async () => {
                          try {
                            const response = await axios.get('http://localhost:8080/api/users');
                            setAllUsers(response.data);
                          } catch (err) {
                            toast.error("Failed to fetch users for collaboration");
                          }
                        })();
                      }
                    }}
                    className={styles.inlineSelect}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>              

                {collaboratorsEnabled && (
                  <div className={styles.collabSection}>
                    <button
                      className={styles.addButtonStyled}
                      onClick={() => setCollaborators([...collaborators, { userId: '', permission: 'Read' }])}
                    >
                      + Add more users
                    </button>
                    {collaborators.map((collab, index) => (
                      <div key={index} className={styles.collabRow}>
                        <div className={styles.formRow}>
                          <select
                            value={collab.userId}
                            onChange={e => {
                              const updated = [...collaborators];
                              updated[index].userId = e.target.value;
                              setCollaborators(updated);
                            }}
                            className={styles.select}
                          >
                            <option value="">Select User</option>
                            {allUsers
                              .filter(user => {
                                const isSelf = user.id == userId;
                                const isAlreadySelected = collaborators.some(
                                  (c, i) => c.userId == user.id && i != index
                                );
                                return !isSelf && !isAlreadySelected;
                              })
                              .map(user => (
                                <option key={user.id} value={user.id}>
                                  {user.email}
                                </option>
                              ))}
                          </select>


                          <select
                            value={collab.permission}
                            onChange={e => {
                              const updated = [...collaborators];
                              updated[index].permission = e.target.value;
                              setCollaborators(updated);
                            }}
                            className={styles.select}
                          >
                            <option value="">Select Permission</option>
                            <option value="Read">Read</option>
                            <option value="Write">Write</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

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
          <div className={styles.editmodal}>
            <h3>Edit Snippet - {currentSnippet.language}</h3>

            {permissionAccess === 'Read' && (
              <div style={{ color: 'gray', fontStyle: 'italic', marginBottom: '0.5rem', fontSize: '15px' }}>
                🔒 Read-only access. You can view the snippet but not edit it.
              </div>
            )}

            <div className={styles.modalContent}>
              {/* Left side: Code editor */}
              <div className={styles.codeEditor}>
                <textarea
                  className={styles.textarea}
                  rows={10}
                  value={currentSnippet?.code || ''}
                  onChange={(e) => {
                    const updatedCode = e.target.value;
                    setCurrentSnippet((prev) => ({ ...prev, code: updatedCode }));
                    websocketService.sendEditSnippet(snippetId, updatedCode);
                  }}
                  disabled={permissionAccess === 'Read'}
                />
                <div className={styles.modalActions}>
                  <button onClick={() => setEditModalOpen(false)}>Cancel</button>
                  <span title={permissionAccess === 'Read' ? 'read-only access' : ''}>
                    <button
                      disabled={permissionAccess === 'Read'}
                      style={{ cursor: permissionAccess === 'Read' ? 'not-allowed' : 'pointer' }}
                      onClick={handleUpdateSnippet}
                    >
                      Save
                    </button>
                  </span>
                </div>
              </div>

              {/* Right side: Collaborators */}
              <div className={styles.collaboratorPanel}>
                <input
                  type="text"
                  placeholder="🔍   Search Collaborators.."
                  value={collaboratorSearch}
                  onChange={(e) => setCollaboratorSearch(e.target.value)}
                  className={styles.collaboratorSearch}
                />
                <ul className={styles.collaboratorList}>
                  {filteredCollaborators.map((c) => (
                    <li key={c.id} className={styles.collaboratorItem}>
                      <strong>{c.email}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
