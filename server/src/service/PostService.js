import Post from '../model/post.js'

class PostService {
    getAll = async () => {
        const allPost = await Post.find({})
        if (allPost) {
            return allPost;
        }
    }
    create = async (name, prompt, photoUrl) => {
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url
        })
        if (newPost) {
            return newPost;
        }
    }
}

export default new PostService