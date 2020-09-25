/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Intention = app.model.define('intention', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sno: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    sname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    academy: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    educationBackground: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    major: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    employmentOrientation: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    intentionalityCity1: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    intentionalityCity2: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    intentionalityCity3: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    intentionalityJob1: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'job',
        key: 'id'
      }
    },
    intentionalityJob2: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'job',
        key: 'id'
      }
    },
    intentionalityJob3: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'job',
        key: 'id'
      }
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    qq: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    skill: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    company: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    salary: {
      type: "DOUBLE",
      allowNull: true
    },
    failedCourses: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'intention',
    timestamps: true,   
    freezeTableName: true
  });

  Intention.associate = function() {

  }

  return Intention;
};
