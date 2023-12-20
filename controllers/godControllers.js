const God = require('../models/god');
const User = require('../models/user')

exports.getAllGods = async (req, res) => {
    try {
        const gods = await God.findAll();
        res.status(200).json(gods);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
};

exports.getGod = async (req, res) => {
    try {
        const { id } = req.params;

        const god = await God.findByPk(id)

        if (!god) {
            return res.status(404).json("God not found");
        }

        res.status(200).json(god);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
};

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const god = await God.create({ name });
        res.status(201).json(god);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const god = await God.findByPk(id);

        if (!god) {
            return res.status(404).json("God not found");
        }

        god.name = name;
        await god.save();

        res.status(200).json(god);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const god = await God.findByPk(id);

        if (!god) {
            return res.status(404).json("God not found");
        }

        await god.destroy();
        res.status(204).json();
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
};

exports.getUserOfGod = async (req, res) => {
    try {
        const { id } = req.params;

        const users = await User.findAll({
            where: { godId: id }
        });

        if (!users) {
            return res.status(404).json("God not found");
        }

        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
};
