const User = require('../models/user')
const Role = require('../models/role')
const UserRole = require('../models/userRole')
const God = require('../models/god')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sequelize = require('../database/databaseSequelize')
exports.createTableProduct = async (req, res) => {
    try{
       await sequelize.sync({force:true}) 
       res.status(200).json("Table Created")
    }
    catch(err){
        console.log(err)
    }
}

exports.register = async (req, res) => {
    try {
        const { name, password, rolesId, godId } = req.body;

        // Vérifier si les rôles existent
        const existingRoles = await Role.findAll({ where: { id: rolesId } });
        if (existingRoles.length !== rolesId.length) {
            return res.status(400).json("Invalid role");
        }

        // Vérifier si un rôle est GOLMON
        const isGolmon = existingRoles.some(role => role.name === 'GOLMON');

        // Vérifier si le God existe
        if(!isGolmon){
            const godExists = await God.findByPk(godId);
            if (!godExists) {
                return res.status(400).json("God not found");
            }
        }
    

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            name,
            password: hashedPassword,
            godId: isGolmon ? null : godId
        });

        await Promise.all(rolesId.map(roleId => UserRole.create({ userId: user.id, roleId })));

        const expiresIn = isGolmon ? '24h' : '365d';
        const token = jwt.sign(
            {
                userId: user.id,
                roles: rolesId,
                god: isGolmon? null : user.godId,
            },
            process.env.JWT_SECRET,
            { expiresIn }
        );

        res.status(201).json({ user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
};

exports.login = async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({
            where: { name }
        });

        if (user) {
            const storedPassword = user.password;
            const match = await bcrypt.compare(password, storedPassword);

            if (match) {
               // const roles = user.UserRoles.map(userRole => userRole.userId === user.id);
               const roles = await UserRole.findAll({
                    where: { userId: user.id }
                });

                const isGolmon = roles.includes(4); // Vérifier si l'utilisateur a le rôle GOLMON

                const expiresIn = isGolmon ? '24h' : '365d';
                const token = jwt.sign(
                    {
                        userId: user.id,
                        roles,
                        god: isGolmon ? null : user.godId,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn }
                );

                res.json({ token });
            } else {
                res.status(401).send("Invalid password");
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.update = async (req, res) => {

}

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{ model: Role, attributes: ['name'] }] 
        });

        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
}