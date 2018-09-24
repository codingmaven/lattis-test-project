const Lock = require('../models/Lock');

const LockController = () => {
  const create = async (req, res) => {
    try {
      const existing = await Lock.findOne({ name: req.body.name });
      if (existing) {
        return res.status(400).json({ msg: 'lock already exists' });
      }

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

      lock.name = req.body.name;
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
      const lock = await Lock.findById(id);

      return res.status(200).json({ lock });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getByMacId = async (req, res) => {
    try {
      const { id } = req.params;
      const lock = await Lock.findOne({ macId: id });

      return res.status(200).json({ lock });
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
    getByMacId,
  };
};

module.exports = LockController;
