import {Avatar,Divider} from 'antd'
import {GithubOutlined,QqOutlined ,WechatOutlined} from '@ant-design/icons'
import * as  style from './index'
const Author = ()=>{
return (
    <style.AuthorDiv className="author-div comm-box">
        <div><Avatar size={100} src="https://blogimages.jspang.com/blogtouxiang1.jpg"/></div>
        <div className="author-introduction">
            介绍
            <Divider>social account</Divider>
            <Avatar size={33} icon={<GithubOutlined/>}  className="account"/>
            <Avatar size={33} icon={<QqOutlined />} className="account"/>
            <Avatar size={33} icon={<WechatOutlined />} className="account"/>

        </div>
    </style.AuthorDiv>
)
}
export default Author;