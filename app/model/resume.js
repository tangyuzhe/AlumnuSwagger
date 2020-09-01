/* indent size: 2 */
module.exports = app => {
    const DataTypes = app.Sequelize;
    const Resume = app.model.define('resume', {
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
        company: {
            type: DataTypes.STRING(50),
            allowNull:true
        },
        job: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        sendTime: {
            type: DataTypes.STRING(30),
            allowNull: true
        }
    },{
        tableName: 'resume',
        timestamps: true,
        freezeTableName: true
    });
    return Resume;
}