const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.authentificator = (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization

    if(token && process.env.JWT_SECRET){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.status(401).json({error: 'Access denied'})
            } else {
                next()
            }
        })
    } else {
        res.status(401).json({error: 'Access denied'})
    }
}

exports.authenticatorAdmin = (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;

    if (token && process.env.JWT_SECRET) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Access denied' });
            }

            if (decoded && decoded.roles) {
                const isAdmin = decoded.roles.some(role => role.roleId === 2);
                if (isAdmin) {
                    next();
                } else {
                    res.status(403).json({ error: 'Permission denied' });
                }
            } else {
                res.status(401).json({ error: 'Access denied' });
            }
        });
    } else {
        res.status(401).json({ error: 'Access denied' });
    }
};

exports.authenticatorSuperAdmin = (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;

    if (token && process.env.JWT_SECRET) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Access denied' });
            }

            if (decoded && decoded.roles) {
                const isSuperAdmin = decoded.roles.some(role => role.roleId === 1);
                if (isSuperAdmin) {
                    next();
                } else {
                    res.status(403).json({ error: 'Permission denied' });
                }
            } else {
                res.status(401).json({ error: 'Access denied' });
            }
        });
    } else {
        res.status(401).json({ error: 'Access denied' });
    }
};

exports.authenticatorGod = (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;
    
    if (token && process.env.JWT_SECRET) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Access denied1' });
            }

            if (decoded && decoded.roles && decoded.god) {
                const byPass = decoded.roles.some(role => role.roleId === 1 || role.roleId === 4);
                if (byPass || decoded.god === req.params.id) {
                    next();
                } else {
                    res.status(403).json({ error: 'Permission denied' });
                }
            } else {
                res.status(401).json({ error: 'Access denied3' });
            }
        });
    } else {
        res.status(401).json({ error: 'Access denied2' });
    }
};

exports.authenticatorGolmon = (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;

    if (token && process.env.JWT_SECRET) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Access denied' });
            }

            if (decoded && decoded.roles) {
                const isGolmon = decoded.roles.some(role => role.roleId === 4);
                if (isGolmon) {
                    next();
                } else {
                    res.status(403).json({ error: 'Permission denied' });
                }
            } else {
                res.status(401).json({ error: 'Access denied' });
            }
        });
    } else {
        res.status(401).json({ error: 'Access denied' });
    }
};
