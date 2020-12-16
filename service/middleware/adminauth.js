// console.log(222)
module.exports =  (req,res,next)=>{
    if(req.session.openId){
        // 登陆过了
        next()
    }else{
    console.log(req.session.openId)
        res.send({msg:'没有登陆',code:301})
    }
}  