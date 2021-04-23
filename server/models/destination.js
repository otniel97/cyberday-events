'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Destination extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Destination.hasMany(models.Activity, { foreignKey: 'destinationId' });
        }
    };
    Destination.prototype.toJSON = function() {
        var values = Object.assign({}, this.get());
        delete values.createdAt;
        delete values.updatedAt;
        return values;
    }
    Destination.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Debe ingresar el nombre.'
                }
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Debe ingresar url de imagen.'
                }
            }
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Debe ingresar la url.'
                }
            }
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Destination',
    });
    return Destination;
};