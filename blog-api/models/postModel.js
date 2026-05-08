const db = require('../config/database');

const getAllPosts = () =>
  db.query(`
    SELECT 
        p.*,
        u.name AS author_name,
        COUNT(c.id) AS total_comments
    FROM posts p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN comments c ON p.id = c.post_id
    GROUP BY p.id
    ORDER BY p.created_at DESC
`);

const getPostById = (id) =>
  db.query(
    `
    SELECT 
        p.*,
        u.name AS author_name,
        COUNT(c.id) AS total_comments
    FROM posts p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN comments c ON p.id = c.post_id
    WHERE p.id = ?
    GROUP BY p.id
`,
    [id],
  );

const getPostsByUserId = (author_id) =>
  db.query(
    `
    SELECT 
        p.*,
        u.name AS author_name,
        COUNT(c.id) AS total_comments
    FROM posts p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN comments c ON p.id = c.post_id
    WHERE p.user_id = ?
    GROUP BY p.id
`,
    [author_id],
  );

const searchPosts = (keyword) =>
  db.query(
    `
    SELECT 
        p.*,
        u.name AS author_name
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.title LIKE ? OR p.content LIKE ?
    ORDER BY p.created_at DESC
`,
    [`%${keyword}%`, `%${keyword}%`],
  );

const createPost = (body) => db.query('INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)', [body.user_id, body.title, body.content]);

const updatePost = (body, id) => db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [body.title, body.content, id]);

const deletePost = (id) => db.query('DELETE FROM posts WHERE id = ?', [id]);

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByUserId,
  createPost,
  updatePost,
  deletePost,
};
