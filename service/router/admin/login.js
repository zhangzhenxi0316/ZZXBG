const express = require("express");
const router = express.Router();
const query = require("../../util/connect");
router.post("/", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  // console.log(username,password)
  let sql = `select username from admin_user where username = '${username}' and password= '${password}' `;
  query(sql)
    .then((rows) => {
      if (rows.length > 0) {
        // 查询成功 设置session
        let openId = new Date().getTime();
        req.session.openId = openId;

        res.send({ msg: "登陆成功", openId, code: 200 });
      } else {
        // 失败
        res.send({ msg: "登陆失败", code: 401 });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
