import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body?: string;
}

const API_URL = "http://localhost:3001";

export default function UsersAndPostsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [showUserForm, setShowUserForm] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);

  const [userForm, setUserForm] = useState<Omit<User, "id">>({
    name: "",
    username: "",
    email: "",
  });

  const [postForm, setPostForm] = useState<Omit<Post, "id">>({
    userId: 0,
    title: "",
    body: "",
  });

  const [selectedUserEdit, setSelectedUserEdit] = useState<User | null>(null);
  const [selectedPostEdit, setSelectedPostEdit] = useState<Post | null>(null);

  // fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, postsRes] = await Promise.all([
        fetch(`${API_URL}/users`),
        fetch(`${API_URL}/posts`),
      ]);
      setUsers(await usersRes.json());
      setPosts(await postsRes.json());
    } catch (error) {
      console.error(error);
    }
  };

  // ---- USER CRUD ----
  const handleSubmitUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedUserEdit) {
        const res = await fetch(`${API_URL}/users/${selectedUserEdit.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userForm),
        });
        if (res.ok) {
          setUsers(
            users.map((u) =>
              u.id === selectedUserEdit.id ? { ...u, ...userForm } : u
            )
          );
        }
      } else {
        const res = await fetch(`${API_URL}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userForm),
        });
        if (res.ok) setUsers([...users, await res.json()]);
      }
      setShowUserForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const res = await fetch(`${API_URL}/users/${userId}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== userId));
        setPosts(posts.filter((p) => p.userId !== userId));
        if (selectedUser?.id === userId) setSelectedUser(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ---- POST CRUD ----
  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedPostEdit) {
        const res = await fetch(`${API_URL}/posts/${selectedPostEdit.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postForm),
        });
        if (res.ok) {
          setPosts(
            posts.map((p) =>
              p.id === selectedPostEdit.id ? { ...p, ...postForm } : p
            )
          );
        }
      } else {
        const res = await fetch(`${API_URL}/posts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postForm),
        });
        if (res.ok) setPosts([...posts, await res.json()]);
      }
      setShowPostForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      const res = await fetch(`${API_URL}/posts/${postId}`, { method: "DELETE" });
      if (res.ok) setPosts(posts.filter((p) => p.id !== postId));
    } catch (error) {
      console.error(error);
    }
  };

  const buttonStyle = (color: string) => ({
    padding: "0.5rem 1rem",
    margin: "0.25rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: 500,
    backgroundColor: color,
    color: "white",
    transition: "all 0.2s",
  });

  const cardStyle = (highlight = false) => ({
    padding: "1rem",
    marginBottom: "0.75rem",
    borderRadius: "8px",
    backgroundColor: highlight ? "#e3f2fd" : "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  });

  const formStyle = {
    background: "#fff",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f1f3f5", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "2rem" }}>
        Users & Posts Management
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem" }}>
        {/* USERS */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2>👥 Users ({users.length})</h2>
            <button
              style={buttonStyle("#28a745")}
              onClick={() => {
                setSelectedUserEdit(null);
                setUserForm({ name: "", username: "", email: "" });
                setShowUserForm(true);
              }}
            >
              ➕ Add User
            </button>
          </div>

          {showUserForm && (
            <form onSubmit={handleSubmitUser} style={formStyle}>
              <h3>{selectedUserEdit ? "Edit User" : "Add User"}</h3>
              <input
                type="text"
                placeholder="Name"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                required
                style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
              />
              <input
                type="text"
                placeholder="Username"
                value={userForm.username}
                onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                required
                style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
              />
              <input
                type="email"
                placeholder="Email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                required
                style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={buttonStyle("#28a745")} type="submit">
                  Save
                </button>
                <button
                  type="button"
                  style={buttonStyle("#6c757d")}
                  onClick={() => setShowUserForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {users.map((u) => (
            <div
              key={u.id}
              style={cardStyle(selectedUser?.id === u.id)}
              onClick={() => setSelectedUser(selectedUser?.id === u.id ? null : u)} // toggle selected
            >
              <div>
                <b>{u.name}</b> (@{u.username})
              </div>
              <div>
                <button
                  style={buttonStyle("#ffc107")}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedUserEdit(u);
                    setUserForm({ name: u.name, username: u.username, email: u.email });
                    setShowUserForm(true);
                  }}
                >
                  ✏️
                </button>
                <button
                  style={buttonStyle("#dc3545")}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteUser(u.id);
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* POSTS */}
        <div>
          {selectedUser ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h2>📝 @{selectedUser.username}'s Posts ({posts.filter((p) => p.userId === selectedUser.id).length})</h2>
                <button
                  style={buttonStyle("#17a2b8")}
                  onClick={() => {
                    setSelectedPostEdit(null);
                    setPostForm({ userId: selectedUser.id, title: "", body: "" });
                    setShowPostForm(true);
                  }}
                >
                  ➕ Add Post
                </button>
              </div>

              {showPostForm && (
                <form onSubmit={handleSubmitPost} style={formStyle}>
                  <h3>{selectedPostEdit ? "Edit Post" : "Add Post"}</h3>
                  <input
                    type="text"
                    placeholder="Title"
                    value={postForm.title}
                    onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                    required
                    style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
                  />
                  <textarea
                    placeholder="Body"
                    value={postForm.body}
                    onChange={(e) => setPostForm({ ...postForm, body: e.target.value })}
                    style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", minHeight: "80px" }}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button style={buttonStyle("#17a2b8")} type="submit">
                      Save
                    </button>
                    <button
                      type="button"
                      style={buttonStyle("#6c757d")}
                      onClick={() => setShowPostForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {posts
                .filter((p) => p.userId === selectedUser.id)
                .reverse() // son post yukarıda
                .map((p) => (
                  <div key={p.id} style={cardStyle()}>
                    <div>
                      <b>{p.title}</b>
                      <p style={{ margin: "0.25rem 0 0 0", color: "#555" }}>{p.body}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "0.5rem", fontSize: "0.85rem", color: "#333" }}>
                        @{selectedUser.username}
                      </span>
                      <button
                        style={buttonStyle("#ffc107")}
                        onClick={() => {
                          setSelectedPostEdit(p);
                          setPostForm({ userId: p.userId, title: p.title, body: p.body || "" });
                          setShowPostForm(true);
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        style={buttonStyle("#dc3545")}
                        onClick={() => handleDeletePost(p.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <p style={{ color: "#666" }}>Gönderileri görmek için lütfen bir kullanıcı seçin</p>
          )}
        </div>
      </div>
    </div>
  );
}

