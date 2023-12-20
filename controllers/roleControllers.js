const Role = require('../models/role')

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
};

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const role = await Role.create({ name });
        res.status(201).json(role);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json("Role not found");
        }

        role.name = name;
        await role.save();

        res.status(200).json(role);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json("Role not found");
        }

        await role.destroy();
        res.status(204).json();
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
};

exports.getUserOfRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id, { include: 'users' });

        if (!role) {
            return res.status(404).json("Role not found");
        }

        res.status(200).json(role.users);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
};