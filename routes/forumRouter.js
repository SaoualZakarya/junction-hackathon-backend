const { Router } = require('express')
const User = require('../model/userModel')
const Post = require('../model/postModel')
const Comment = require('../model/commentModel')

const router = Router();

// get all Post
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find().populate(['owner', 'likes', 'comments']);
    res.status(200).json(posts);
  } catch (error) {
    next(error)
  }
})

// get Post by id
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(['owner', 'likes', 'comments']);
    if (post)
      return res.status(200).json(post);

    return res.status(404)

  } catch (error) {
    next(error)
  }
})

// get Post by user
router.get("/user/:id", async (req, res, next) => {
  try {
    const post = await Post.findOne({ owner: req.params.id }).populate(['owner', 'likes', 'comments']);
    if (post)
      return res.status(200).json(post);

    return res.status(404)

  } catch (error) {
    next(error)
  }
})

// create Post
router.post("/", async (req, res, next) => {
  const { title, content } = req.body;

  if (!req.user)
    return res.sendStatus(511);

  try {
    const post = new Post({
      owner: req.user._id,
      title: title,
      content: content
    });

    const result = await post.save();

    if (!result)
      return result.status(500).json({ message: "couldnt create your post" })

    return result.status(200).json({ message: "Your Post is Created" });

  } catch (error) {
    next(error)
  }

})

// delete Post
router.delete('/:id', async (req, res, next) => {

  if (!req.user)
    return res.sendStatus(511);

  const postID = req.params.id
  try {
    const post = await Post.findById(postID);

    if (post.owner !== req.user._id)
      return res.sendStatus(401);

    post.comments.forEach(async comment => {
      try {
        await Comment.findByIdAndDelete(comment);
      } catch (error) {
        console.log(`${comment}: couldnt delete`);
      }
    })

    await post.deleteOne();

    res.sendStatus(200);

  } catch (error) {
    next(error)
  }
})

// comment on Post
router.put('/comment/:id', async (req, res, next) => {
  const postID = req.params.id;

  if (!req.user)
    return res.sendStatus(511);

  try {

    const comment = new Comment({
      userID: req.user._d,
      content: req.body.content
    })

    const commentResult = await comment.save();

    if (!commentResult)
      return res.sendStatus(400);

    await Post.findByIdAndUpdate(postID, {
      $push: { comment }
    })

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
})

// like Post or Comment
router.put('/like/:id', async (req, res, next) => {
  const postID = req.params.id;

  if (!req.user)
    return res.sendStatus(511);

  try {

    Post.updateOne(
      { _id: postID, likes: { $ne: req.user._id } },
      { $addToSet: { likes: req.user._id } }
    );

    Post.updateOne(
      { _id: postID },
      { $pull: { likes: req.user._id } },
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log(result);
        }
      }
    );

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
})


module.exports = router