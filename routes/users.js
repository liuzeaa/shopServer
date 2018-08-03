var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var model = require('../config/model')
const USER = model.Users
const connect = model.connect
//注册接口
router.post('/register',function(req,res,next){
  let userName = req.body.userName,userPwd = req.body.userPwd;
  let md5 = crypto.createHash("md5");
  let newPas = md5.update(userPwd).digest("hex");
  model.Users.findOne({
    where:{
      userName:userName
    }
  }).then(doc=>{
    if(doc){
      res.json({
        status:'1',
        msg:'用户已存在',
        result:''
      });
    }else{
      model.Users.create({
        userName:userName,
        userPwd:newPas
      }).then(doc2=>{
        res.cookie("userId",doc2.id,{
          path:'/',
          maxAge:1000*60*60
        });
        res.cookie("userName",doc2.userName,{
          path:'/',
          maxAge:1000*60*60
        });
        res.json({
          status:'0',
          msg:'',
          result:{
            userName:doc2.userName,
            nickName:doc2.nickName
          }
        });
      })
    }
  }).catch(err=>{
    res.json({
      status:"2",
      msg:err.message
    });
  });

})
// 登录接口
router.post("/login", function (req,res,next) {
  var userPwd = req.body.userPwd;
  let md5 = crypto.createHash("md5");
  let newPas = md5.update(userPwd).digest("hex");
  USER.findOne({
    where: {
      userName: req.body.userName,
      userPwd:newPas
    }
  }).then(doc=>{
    res.cookie("userId",doc.id,{
      path:'/',
      maxAge:1000*60*60
    });
    res.cookie("userName",doc.userName,{
      path:'/',
      maxAge:1000*60*60
    });
    res.json({
      status:'0',
      msg:'',
      result:{
        userName:doc.userName,
        nickName:doc.nickName
      }
    });
  }).catch(err=>{
    res.json({
      status:"1",
      msg:err.message
    });
  });
});
//登出接口
router.post("/logout", function (req,res,next) {
  res.cookie("userId","",{
    path:"/",
    maxAge:-1
  });
  res.json({
    status:"0",
    msg:'',
    result:''
  })
});

// 检查登录状态cookies
router.get("/checkLogin", function (req,res,next) {
  if(req.cookies.userId){
    res.json({
      status:'0',
      msg:'',
      result:req.cookies.userName || ''
    });
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    });
  }
});

// 获取购车商品数量
router.get("/getCartCount", function (req,res,next) {
  if(req.cookies && req.cookies.userId){
    console.log("userId:"+req.cookies.userId);
    var userId = req.cookies.userId;
    model.CartList.findAll({
      where:{
        userId:userId,
        isDelete:0
      }
    }).then(doc=>{
     /* let cartCount = 0;
      doc.map(function(item){
        cartCount+=parseInt(item.productNum);
      })*/
      res.json({
        status:"0",
        msg:"",
        result:doc.length
      });
    }).catch(err=>{
      res.json({
        status:"0",
        msg:err.message
      });
    })
  }else{
    res.json({
      status:"0",
      msg:"当前用户不存在"
    });
  }
});
//查询当前用户的购物车数据
router.get("/cartList", function (req,res,next) {
  var userId = req.cookies.userId;
  model.CartList.findAll({
    where:{
      userId:userId,
      isDelete:0
    },
    include: [{
      model: model.Goods
    }]
  }).then(function(doc) {
    res.json({
      status:'0',
      msg:'',
      result:doc
    });
  }).catch(err=>{
    res.json({
      status:'1',
      msg:err.message,
      result:''
    })
  })
});

//购物车删除
router.patch("/cartDel", function (req,res,next) {
  var userId = req.cookies.userId,cartId = req.body.id;
  model.CartList.update({'isDelete':1,'productNum':0},{
    where:{
      userId:userId,
      id:cartId
    }
  }).then(doc=>{
    res.json({
      status:'0',
      msg:'',
      result:'suc'
    });
  }).catch(err=>{
    res.json({
      status:'1',
      msg:err.message,
      result:''
    });
  })
});
//修改商品数量
router.post("/cartEdit", function (req,res,next) {
  var userId = req.cookies.userId,cartId = req.body.id,productNum = req.body.productNum,checked = req.body.checked;;
  model.CartList.update({
    productNum:productNum,
    checked:checked
  },{
    where:{
      userId:userId,
      id:cartId,
    }
  }).then(doc=>{
    console.log(doc+'ssssdd')
    res.json({
      status:'0',
      msg:'',
      result:'suc'
    });
  }).catch(err=>{
    res.json({
      status:'1',
      msg:err.message,
      result:''
    });
  })
});
//全选商品
router.patch("/editCheckAll", function (req,res,next) {
  var userId = req.cookies.userId,
    checkAll = req.body.checkAll?'1':'0';
  model.CartList.update({
    checked:checkAll
  },{
    where:{
      userId:userId
    }
  }).then(doc=>{
    res.json({
      status:'0',
      msg:'',
      result:'suc'
    });
  }).catch(err=>{
    res.json({
      status:'1',
      msg:err.message,
      result:''
    });
  })
});

//获取地址列表
router.get('/addressList',function(req,res,next){
  var userId = req.cookies.userId;
  model.Address.findAll({
    where:{
      userId:userId,
      isDelete:0
    }
  }).then(function(doc) {
    res.json({
      status:'0',
      msg:'',
      result:doc
    });
  }).catch(err=>{
    res.json({
      status:'1',
      msg:err.message,
      result:''
    })
  })
})
//删除地址列表
router.post('/delAddress',function(req,res,next){
  var userId = req.cookies.userId,addressId = req.body.id;
  model.Address.update({'isDelete':1},{
    where:{
      userId:userId,
      id:addressId
    }
  }).then(doc=>{
    res.json({
      status:'0',
      msg:'',
      result:'suc'
    });
  }).catch(err=>{
    res.json({
      status:'1',
      msg:err.message,
      result:''
    });
  })
})

//设置默认地址
router.post('/setDefault',function(req,res,next){
  var userId=  req.cookies.userId,addressId = req.body.id;
  model.Address.update({'isDefault':0},{
    where:{
      userId:userId,
      id:{
        $ne:addressId
      }
    }
  }).then(doc=>{
    model.Address.update({'isDefault':1},{
      where:{
        userId:userId,
        id:addressId
      }
    }).then(doc=>{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      });
    })
    /*console.log(JSON.stringify(doc));
    */
  }).catch(err=>{
    res.json({
      status:'1',
      msg:err.message,
      result:''
    });
  })
})

//新增地址
router.post('/addAddress',function(req,res,next){
  var userId = req.cookies.userId,userName = req.body.userName,streetName = req.body.streetName,postCode = req.body.postCode,tel = req.body.tel;

  model.Address.create({
    userName:userName,
    streetName:streetName,
    postCode:postCode,
    tel:tel,
    userId:userId,
    isDefault:0,
    isDelete:0
  }).then(doc=>{
    console.log(JSON.stringify(doc))
    res.json({
      status:'0',
      msg:'',
      result:'suc'
    });
  }).catch(err=>{
    res.json({
      status:'1',
      msg:err.message,
      result:''
    });
  })
})

//支付接口
router.post('/payMent',(req,res,next)=>{
    var userId = req.cookies.userId,orderTotal = req.body.orderTotal,addressId = req.body.addressId,goodGroupId = req.body.goodGroupId;
    model.OrderList.findOrCreate({
      where:{
        userId:userId,
        addressId:addressId,
        goodGroupId:goodGroupId
      },
      defaults:{
        userId:userId,
        orderTotal:orderTotal,
        addressId:addressId,
        goodGroupId:goodGroupId
      }
    }).then(doc=>{
      console.log(JSON.stringify(doc))
      res.json({
        status:"0",
        msg:'',
        result:{
          orderId:doc[0].id,
          orderTotal:doc[0].orderTotal
        }
      });
    }).catch((err)=>{
      res.json({
        status:"1",
        msg:err.message,
        result:''
      });
    })
})
//
router.get("/orderDetail",(req,res,next)=>{
  var userId = req.cookies.userId,orderId = parseInt(req.param("id"));
  model.OrderList.findOne({
    where:{
      userId:userId,
      id:orderId,
      orderStatus:0
    },
    include: [{
      model: model.Address
    }]
  }).then(doc=>{
    res.json({
      status:"0",
      msg:'',
      result:{
        order:doc,
      }
    })

  }).catch((err)=>{
    res.json({
      status:"1",
      msg:err.message,
      result:''
    });
  })
})
//获取未支付订单和已完成订单
router.get('/orderList',(req,res,next)=>{
  var userId = req.cookies.userId,orderStatus = req.param("orderStatus");
  model.OrderList.findAll({
    where:{
      orderStatus:orderStatus,
      userId:userId
    },
    include:[
      {model:model.Address}
    ]
  }).then(doc=>{

    res.json({
     status:"0",
     msg:'',
     result:doc
     })
  })
})
//根据订单id获取商品信息
router.get("/orderItem",(req,res,next)=>{
  var goodGroupId = req.param("goodGroupId").split(','),userId = req.cookies.userId;
  model.CartList.findAll({
    where:{
      goodId:{
        $in:goodGroupId
      },
      userId:userId
    },
    include:[
      {model:model.Goods}
    ]
  }).then(doc=>{
    res.json(doc);
  })
})

module.exports = router;
