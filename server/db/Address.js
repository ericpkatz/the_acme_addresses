const conn = require('./conn');
const { UUID, UUIDV4, JSON } = conn.Sequelize;


const Address = conn.define('address', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  data: {
    type: JSON
  }
});


module.exports = Address;

