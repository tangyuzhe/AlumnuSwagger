/* indent size: 2 */
module.exports = app => {
    const DataTypes = app.Sequelize;
    const Major = app.model.define('major', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        mark: {
            type: DataTypes.STRING(4),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        academy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'academy',
              key: 'id',
            },
        },
        details: {
            type: DataTypes.STRING(1024),
            allowNull: true,
        },
    }, {
        tableName: 'major',
        timestamps: true,
        freezeTableName: true
    });
    return Major;
};