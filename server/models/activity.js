'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Activity extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Activity.belongsTo(models.Destination, { foreignKey: 'destinationId' });
        }
    };
    Activity.prototype.toJSON = function() {
        var values = Object.assign({}, this.get());
        delete values.createdAt;
        delete values.updatedAt;
        return values;
    }
    Activity.init({
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
        usdPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Debe ingresar el precio en dólares.'
                }
            }
        },
        clpPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Debe ingresar el precio en pesos chilenos.'
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Debe ingresar la descripción.'
                }
            }
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: {
                    args: true,
                    msg: 'Debe introducir una fecha válida'
                },
                notEmpty: {
                    msg: 'Debe ingresar fechad de inicio.'
                }
            }
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: {
                    args: true,
                    msg: 'Debe introducir una fecha válida'
                },
                notEmpty: {
                    msg: 'Debe ingresar fechad de fin'
                }
            }
        },
        offerDay: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: {
                    args: true,
                    msg: 'Debe introducir valores numéricos para días de oferta'
                },
                min: {
                    args: 1,
                    msg: 'El valor mínimo de días es 1'
                }
            }
        },
        discountRate: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: {
                    args: true,
                    msg: 'Debe introducir valores numéricos para el descuento'
                },
                min: {
                    args: 1,
                    msg: 'El valor mínimo de porcentaje de descuento es 1'
                }
            }
        },
        inOffer: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        destinationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Debe ingresar el destino al que pertenece la actividad.'
                }
            }
        },
    }, {
        sequelize,
        modelName: 'Activity',
    });
    return Activity;
};