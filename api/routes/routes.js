const router = require('express').Router();
const userCtrl = require('../controllers/UserController')();
const lockCtrl = require('../controllers/LockController')();
const auth = require('../policies/auth.policy');

router.post('/users', userCtrl.register);
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

router.use(auth);

router.get('/users', userCtrl.getAll);
router.get('/users/me', userCtrl.getMe);
router.put('/users/me', userCtrl.update);
router.patch('/users/me', userCtrl.update);
router.delete('/users/me', userCtrl.destroy);
router.get('/users/byusername/:username', userCtrl.getByUserName);
router.get('/users/:id', userCtrl.getById);

// lock routes

router.get('/locks', lockCtrl.getAll);
router.get('/locks/macid/:id', lockCtrl.getByMacId);
router.get('/locks/:id', lockCtrl.getById);
router.delete('/locks/:id', lockCtrl.destroy);
router.put('/locks/:id', lockCtrl.update);
router.patch('/locks/:id', lockCtrl.update);

module.exports = router;
