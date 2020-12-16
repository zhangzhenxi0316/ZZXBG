// 前台 home
const express = require("express");
const router = express.Router();
const query = require("../../util/connect");
let pageSize = 10;
let page = 1;
let viewArt = [];
router.get("/index", (req, res) => {
  res.send("index");
});
// 获取文章列表
router.get("/getArticleList", (req, res) => {
  page = req.query.page ? req.query.page : page;
  query(
    `select article.id as id,type.id as typeId,article.title as title,article.introduce as introduce,FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,article.view_count as view_count,type.typeName as typeName from article left join type on article.type_id = type.id ORDER BY article.id desc limit  ${
      pageSize * (page - 1)
    }, ${pageSize} `
  )
    .then((rows) => {
      if (rows.length == 0) {
        res.send({ msg: "已经查询所有数据了", code: 201 });
      } else res.send({ rows, code: 200 });
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
      let index = viewArt.findIndex((item) => {
        // console.log(item.id,id)
        return parseInt(item.id) === parseInt(id);
      });
      console.log(index)
      if (index >= 0) {
        viewArt[index].viewCount += 1;
      } else {
        viewArt.push({
          id,
          viewCount: 1,
        });
      }
      // console.log(viewArt)
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
    `select  article.id as id,article.title as title,article.introduce as introduce,FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,article.view_count as view_count,type.typeName as typeName from article left join type on article.type_id = type.id where type.id=${id} ORDER BY article.id desc limit ${
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

router.get("/getArticleAllName", (req, res) => {
  page = req.query.page ? req.query.page : page;
  let sql = `select id,title from article ORDER BY article.id desc limit ${
    pageSize * (page - 1)
  }, ${pageSize} `;
  query(sql)
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});
setInterval(() => {
  let sql = `update article set view_count = view_count + ? where id = ?`;
  viewArt = viewArt.map((item) => {
    // console.log(item)
    query(sql, [item.viewCount, item.id])
      .then((rows) => {
        // console.log(rows);
        item.viewCount = 0
      })
      .catch((err) => {
        console.log(err);
      });
      return item
  });
  // console.log(viewArt);
  
}, 2000);
module.exports = router;
