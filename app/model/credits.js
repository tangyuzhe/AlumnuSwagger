/* indent size: 2 */
module.exports = app => {
    const DataTypes = app.Sequelize;
    const Credits = app.model.define('credits', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        sno: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        sname: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        major: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        credits: {
            type: "DOUBLE",
            allowNull: true
        }
    },{
        tableName: 'credits',
        timestamps: true,
        freezeTableName: true
    })
    return Credits;
}