module.exports = {
    getPosts: async (req, res) => {
        const db = req.app.get('db');
        const posts = await db.Posts.getPosts(); 
        res.status(200).json(posts);
    },
    getPostsById: async (req, res) => {
        const db = req.app.get('db');
        const {post_id} = req.query;
        const post = await db.Posts.getPostsById(post_id); 
        res.status(200).json(post);
    },
    createPost: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.session.user;
        const {title} = req.body;
    
        const post = await db.Posts.createPost(id, title);
        res.status(200).json(post)
    },
    getPostsByTitle: async(req, res) => {
        const db = req.app.get("db");
    const { title } = req.query;

        const posts = await db.posts.getPostsByTitle(`${title}%`);
        res.status(200).json(posts);
    }
}