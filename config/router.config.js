const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const posts = require('../controllers/posts.controller');

const middleware = require('../middlewares/secure.middleware');

router.post("/api/login", users.login);
router.get("/api/confirm", users.confirm);


router.post("/api/users", users.create);
router.get("/api/users", middleware.checkAuth, users.list);
router.get("/api/users/:id", middleware.checkAuth, users.detail);
router.patch("/api/users/:id", middleware.checkAuth, users.update);
router.delete("/api/users/:id", middleware.checkAuth, users.delete);

router.post("/api/posts", middleware.checkAuth, posts.create);
router.get("/api/posts", middleware.checkAuth, posts.list);
router.get("/api/posts/:id", middleware.checkAuth, posts.detail);
router.patch("/api/posts/:id", middleware.checkAuth, posts.update);
router.delete("/api/posts/:id", middleware.checkAuth, posts.delete);


module.exports = router;