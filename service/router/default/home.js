// 前台 home
const express = require("express");
const router = express.Router();
const query = require("../../util/connect");
let pageSize = 10;
let page = 1;
router.get("/index", (req, res) => {
  res.send("index");
});
// 获取文章列表
router.get("/getArticleList", (req, res) => {
  query(
    `select article.id as id,article.title as title,article.introduce as introduce,FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,article.view_count as view_count,type.typeName as typeName from article left join type on article.type_id = type.id limit  ${
      pageSize * (page - 1)
    }, ${pageSize} `
  )
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});
// 通过id获取文章详情
router.get("/getArticleDetail", async (req, res) => {
  let id = req.query.id;
  query(
    "select article.article_content as article_content ,type.id as typeId ,article.id as id,article.title as title,article.introduce as introduce,FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,article.view_count as view_count,type.typeName as typeName from article left join type on article.type_id = type.id where article.id=" +
      id
  )
    .then((rows) => {
      res.send(rows[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});
// 得到文章类名称和编号
router.get("/getArticleType", (req, res) => {
  query("select * from type ")
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});
// 根据文章类别id查询文章
router.get("/getArticleListByTypeId", async (req, res) => {
  let id = req.query.id;
  let obj = {};
  page = req.query.page ? req.query.page : page;
  await query(
    `select  article.id as id,article.title as title,article.introduce as introduce,FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,article.view_count as view_count,type.typeName as typeName from article left join type on article.type_id = type.id where type.id=${id} limit ${
      pageSize * (page - 1)
    }, ${pageSize} `
  )
    .then((rows) => {
      obj.data = rows;
    })
    .catch((err) => {
      console.log(err);
    });
  await query(
    `select count(article.id) as totalCount from article left join type on article.type_id = type.id where type.id=${id}`
  )
    .then((rows) => {
      obj.totalCount = Math.ceil(rows[0].totalCount);
      res.send(obj);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
