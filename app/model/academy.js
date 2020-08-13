/* indent size: 2 */
module.exports = app => {
    const DataTypes = app.Sequelize;
    const Academy = app.model.define('academy', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        number: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        details: {
            type: DataTypes.STRING(1024),
            allowNull: true,
        },
    }, {
        tableName: 'academy',
        timestamps: true,
        freezeTableName: true
    });
    return Academy;
};