SELECT title, user_id, post_id, username, url FROM posts p
INNER JOIN users u
ON u.id = p.user_id;