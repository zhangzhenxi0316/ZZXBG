import {Avatar,Divider,Tooltip} from 'antd'
import {GithubOutlined,QqOutlined ,WechatOutlined} from '@ant-design/icons'
import * as  style from './index'
const Author = ()=>{
return (
    <style.AuthorDiv className="author-div comm-box">
        <div><Avatar size={100} src="https://ftp.bmp.ovh/imgs/2020/12/b25dddf11c320455.jpg"/></div>
        <div className="author-introduction">
        热爱前端开发
            <Divider>social account</Divider>
            <Tooltip><a to="https://github.com/zhangzhenxi0316"><Avatar size={33} icon={<GithubOutlined/>}  className="account"/></a></Tooltip>
            <Tooltip title={'304860030'}> <Avatar size={33} icon={<QqOutlined />} className="account"/></Tooltip>
           <Tooltip title={13998457263}><Avatar size={33} icon={<WechatOutlined />} className="account"/></Tooltip>
        </div>
    </style.AuthorDiv>
)
}
export default Author;