const Lock = require('../models/User');
const _ = require('lodash');

const LockController = () => {
  const create = async (req, res) => {
    try {
      req.body.user = req.user.id;
      const lock = await Lock.create(req.body);

      return res.status(200).json({ lock });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const update = async (req, res) => {
    try {
      const { id } = req.params;
      const lock = await Lock.findById(id);
      _.assign(lock, req.body);

      await lock.save();
      return res.status(200).json({ lock });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const destroy = async (req, res) => {
    try {
      const { id } = req.params;
      const lock = await Lock.findById(id);
      await lock.destroy();

      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getAll = async (req, res) => {
    try {
      const locks = await Lock.findAll({ user: req.user.id });

      return res.status(200).json({ locks });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Lock.findById(id);

      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    getAll,
    destroy,
    getById,
    create,
    update,
  };
};

module.exports = LockController;
