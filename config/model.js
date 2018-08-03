var Sequelize = require('sequelize');
var config = require('./config');

var sequelize = new Sequelize(config.database,config.username,config.password,{
  host:config.host,
  dialect: 'mysql',
 timezone: '+08:00'
})

const Users = sequelize.define('users',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName:Sequelize.STRING,
  userPwd:Sequelize.STRING,
  nickName:Sequelize.STRING,
  isDelete:{
    type:Sequelize.INTEGER,
    defaultValue:0
  }
});
const Goods = sequelize.define('goods',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productName:Sequelize.STRING,
  salePrice:Sequelize.INTEGER,
  productImage:Sequelize.STRING,
  productUrl:Sequelize.STRING,
  isDelete:{
    type:Sequelize.INTEGER,
    defaultValue:0
  }
});

const Address = sequelize.define('address',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName:Sequelize.STRING,
  streetName:Sequelize.STRING,
  postCode:Sequelize.STRING,
  tel:Sequelize.STRING,
  isDefault: {
    type:Sequelize.INTEGER,
    defaultValue:0
  },
  isDelete:{
    type:Sequelize.INTEGER,
    defaultValue:0
  }
});
Address.belongsTo(Users)

const CartList = sequelize.define('cartList',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productNum:Sequelize.INTEGER,
  isDelete:{
    type:Sequelize.INTEGER,
    defaultValue:0
  },
  checked:{
    type:Sequelize.INTEGER,
    defaultValue:1
  }
})
CartList.belongsTo(Users);
CartList.belongsTo(Goods);

const OrderList = sequelize.define('orderList',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderStatus:{
    type:Sequelize.INTEGER,
    defaultValue:0
  },
  isDelete:{
    type:Sequelize.INTEGER,
    defaultValue:0
  },
  orderTotal:Sequelize.INTEGER,
  goodGroupId:Sequelize.STRING
})
OrderList.belongsTo(Users);
OrderList.belongsTo(Address);
sequelize.sync();

module.exports = {
  Users,
  Goods,
  CartList,
  OrderList,
  Address,
  connect:sequelize,
}




