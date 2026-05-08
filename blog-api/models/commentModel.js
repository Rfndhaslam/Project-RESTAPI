const db = require('../config/database');

const getCommentsByPostId = (post_id) =>
  db.query(
    `
    SELECT 
        c.*,
        u.name AS author_name
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.post_id = ?
    ORDER BY c.created_at DESC
`,
    [post_id],
  );

const createComment = (post_id, user_id, content) => db.query('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)', [post_id, user_id, content]);

const deleteComment = (id) => db.query('DELETE FROM comments WHERE id = ?', [id]);

const updateComment = (id, content) => db.query('UPDATE comments SET content = ? WHERE id = ?', [content, id]);

module.exports = {
  getCommentsByPostId,
  createComment,
  deleteComment,
  updateComment,
};
