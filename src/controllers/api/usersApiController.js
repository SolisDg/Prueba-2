const { User } = require('../../database/models');

const usersApiController = {
    list: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;

            const totalUsers = await User.count();
            const totalPages = Math.ceil(totalUsers / limit);

            const users = await User.findAll({
                attributes: ['id', 'firstName', 'lastName', 'email'],
                limit: limit,
                offset: offset
            });
            const baseUrl = `${req.protocol}://${req.get('host')}/api/users`;

            const response = {
                status: 'success',
                count: totalUsers,
                countThisPage: users.length,
                currentPage: page,
                totalPages: totalPages,
                previous: page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null,
                users: users.map(user => ({
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    detail: `${baseUrl}/${user.id}`
                }))
            };
            res.status(200).json(response);

        } catch (error) {
            console.error('Error al listar usuarios:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error interno del servidor'
            });
        }
    },
    detail: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, {
                attributes: ['id', 'firstName', 'lastName', 'email', 'avatar']
            });

            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: `Usuario con ID ${id} no encontrado`
                });
            }

            const baseUrl = `${req.protocol}://${req.get('host')}`;
            const avatarUrl = user.avatar ? `${baseUrl}/images/avatars/${user.avatar}` : `${baseUrl}/images/avatars/default-user.jpg`;

            res.status(200).json({
                status: 'success',
                user: {
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    avatar: avatarUrl
                }
            });
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error interno del servidor'
            });
        }
    }
};

module.exports = usersApiController;
