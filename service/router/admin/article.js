const express = require("express");
const router = express.Router();
const query = require("../../util/connect");
router.get("/getArticleTypes", (req, res) => {
  // console.log(11)
  let sql = `select * from type`;
  query(sql)
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});
// 添加文章
router.post("/addArticle", async (req, res) => {
  // console.log(req.body)
  let id = req.body.id
  let articleid = req.body.articleid; //0新增1修改
  let article_content = req.body.article_content;
  let addTime = new Date(req.body.addTime.replace("-", "/")).getTime() / 1000;
  let title = req.body.title;
  let introduce = req.body.introduce;
  let type_id = req.body.type_id;
  let typeName;
  if (type_id == "add") {
    typeName = req.body.typeName;
  }
  let sql;
  // 普通添加
  if (articleid == 0) {
    if (type_id !== "add") {
      type_id = parseInt(type_id);
      // 不是自定义类型
      sql = `insert into article set title=?,article_content=?,introduce=?,addTime=?,type_id=?`;
      query(sql, [title, article_content, introduce, addTime, type_id])
        .then((rows) => {
          console.log("添加文章成功");
          res.send({ msg: "添加文章成功", code: 200 });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // 自定义类型需要在type表中添加
      sql = `insert into type set typeName=? `;
      console.log("typename", typeName);
      let result = await query(sql, [typeName]).catch((err) => {
        console.log(err);
      });
      type_id = result.insertId;

      // console.log('result',result)
      // console.log('typeId',type_id)
      sql = `insert into article set title=?,article_content=?,introduce=?,addTime=?,type_id=? `;
      await query(sql, [title, article_content, introduce, addTime, type_id])
        .then((rows) => {
          console.log("自定义类型文章添加成功");
          res.send({ msg: "添加文章成功", code: 200 });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } else {
    if (type_id !== "add") {
      type_id = parseInt(type_id);
      // 不是自定义类型
      sql = `update  article set title=?,article_content=?,introduce=?,type_id=? where id = ?`;
      query(sql, [title, article_content, introduce, type_id,id])
        .then((rows) => {
          console.log("修改文章成功");
          res.send({ msg: "修改文章成功", code: 200 });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // 自定义类型需要在type表中添加
      sql = `update type set typeName=? `;
      console.log("typename", typeName);
      let result = await query(sql, [typeName]);
      type_id = result.insertId;

      // console.log('result',result)
      console.log('typeId',type_id)
      sql = `update article set title=?,article_content=?,introduce=?,type_id=? `;
      await query(sql, [title, article_content, introduce, type_id])
        .then((rows) => {
          console.log("自定义类型文章添加成功");
          res.send({ msg: "添加文章成功", code: 200 });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});
// 文章列表
router.get('/getArticleList',(req,res)=>{
    let sql = `select article.id as id,article.title as title,article.introduce as introduce,FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,article.view_count as view_count,type.typeName as typeName from article left join type on article.type_id = type.id ORDER BY article.id desc`
    query(sql).then(rows=>{
        // console.log(rows)
        res.send(rows)
    }).catch(err=>{console.log(err)})
})
// 删除方法
router.post('/deleteArticleById',(req,res)=>{
    let id= req.body.id;
    query(`delete from article where id= ?`,[id]).then(rows=>{
        res.send({msg:'删除成功',code:200})
    }).catch(err=>{console.log(err)})
})
// 通过文章id查询文章信息
router.get('/getArticleById',(req,res)=>{
    // console.log(req.params)
    let id = req.query.id
    let sql = "select article.article_content as article_content ,type.id as typeId ,article.id as id,article.title as title,article.introduce as introduce,FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime,article.view_count as view_count,type.typeName as typeName from article left join type on article.type_id = type.id where article.id=" +id
    query(sql).then(rows=>{
        res.send(rows[0])
    }).catch(err=>{console.log(err)})
})
module.exports = router;
