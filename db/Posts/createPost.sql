INSERT INTO posts(user_id, title) VALUES($1, $2)
RETURNING *;