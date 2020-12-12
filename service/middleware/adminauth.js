// console.log(222)
module.exports =  (req,res,next)=>{
    console.log(111)
    if(req.session.openId){
        // 登陆过了
        next()
    }else{
        res.send({msg:'没有登陆',code:301})
    }
}  