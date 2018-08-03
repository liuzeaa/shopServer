var express = require('express');
var router = express.Router();
require('../util/index')
var model = require('../config/model');
var Goods = model.Goods;

router.get('/list',function(req,res,next){
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let priceLevel = req.param("priceLevel");
  let sort = req.param("sort");
  let skip = (page-1)*pageSize;
  let priceGt = '';
  let priceLte = '';
  let params = {};
  if(priceLevel!='all'){
    switch (priceLevel){
      case '0':priceGt = 0;priceLte=100;break;
      case '1':priceGt = 100;priceLte=500;break;
      case '2':priceGt = 500;priceLte=1000;break;
      case '3':priceGt = 1000;priceLte=2000;break;
      case '4':priceGt = 2000;priceLte=3000;break;
      case '5':priceGt = 3000;priceLte=6000;break;
    }
  }else{
    priceGt = null;priceLte=null;
  }
  sort = sort==1?'ASC':'DESC'
  Goods.findAndCountAll({
   where:{
      salePrice:{
        $gt:priceGt,
        $lte:priceLte
      },
      isDelete:0
    },
    offset: skip,
    limit: pageSize,
    order: [
      ['salePrice', sort],
    ]
  }).then((result)=>{
    console.log(Math.ceil(result.count/pageSize),page)
    if(page > Math.ceil(result.count/pageSize)){
      return;
    }
    res.json({
      status: '0',
      msg:'',
      result:{
        count: result.count,
        list:result.rows
      }
    })
  }).catch(err=>{
    res.json({
      status: '1',
      msg:err.message
    });
  })
})

router.post('/addCart',function(req,res,next){

  var userId = req.cookies.userId,productId = req.body.goodId;
  model.CartList.findOne({
    where:{
      userId:userId,
      goodId:productId
    }
  }).then(doc=>{
    if(doc){
      let productNum;
      if(doc.isDelete===1){
        productNum = 1;
        res.json({
          status:'0',
          msg:'',
          result:"suc"
        });
      }else{
        productNum = doc.productNum+1;
      }
      model.CartList.update({
        productNum:productNum,
        isDelete:0
      },{
        where:{
          goodId:doc.goodId,
        }
      }).then(doc2=>{
        res.json({
          status:'1',
          msg:'',
          result:"suc"
        });
      })
    } else{
      model.CartList.create({
        userId:userId,
        goodId:productId,
        checked:1,
        isDelete:0,
        productNum:1
      }).then(doc3=>{
        res.json({
          status:'2',
          msg:'',
          result:"suc"
        });
      })
    }
  })
})
module.exports = router;
