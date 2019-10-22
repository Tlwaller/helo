SELECT p.*, u.username FROM posts p
INNER JOIN user hu
ON p.user_id = u.user_id
WHERE p.title ILIKE $1;