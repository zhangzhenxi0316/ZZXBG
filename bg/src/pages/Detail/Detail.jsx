import {useEffect,useState} from 'react'
import Header from "../../components/Header/Header";
import { Row, Col,Affix, message } from "antd";
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from "@ant-design/icons";
import Author from "../../components/Author/Author";
import Footer from "../../components/Footer/Footer";
import NavCom from "../../components/NavCom/NavCom";
import * as style from "./index.js";
// markdown
import marked from 'marked'
// 代码高亮
// import hljs from 'highlight.js'
// css
import 'highlight.js/styles/monokai-sublime.css'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import axiosInstance from '../../util';
const renderer = new marked.Renderer()

function Detail(props) {
 
    const [article,setArticle] = useState({title:'',article_content:''})
    useEffect(()=>{
      // console.log(window.hljs.highlightAuto)
      marked.setOptions({
        renderer,
        gfm:true,//github样式
        pedantic:false,//容错
        sanitize:false,//忽略html
        tables:true,//github table样式
        breaks:false,
        smartLists:true, //列表样式
        highlight:function(code){
          return    window.hljs.highlightAuto(code).value
      }
    })
        let id = props.match.params.id
        axiosInstance.get('/default/getArticleDetail?id='+id).then(res=>{
            // console.log(res)

            setArticle(res.data)
        }).catch(err=>message.error('文章获取失败'))
    },[props.match.params.id])
   
  return (
    <style.DetailWrapper>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        {/* 左侧主体 */}
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author></Author>
          <NavCom></NavCom>
          <Affix offsetTop={5}>
          <div className="detailed-nav ">
              <div className="nav-title">文章目录</div>
              <MarkNav
              
              className="article-menu"
              source={article.article_content}
            //   headingTopOffset={0}
            ordered={false}
            
              />
          </div>
          </Affix>
         
        </Col>
        <Col className="comm-left detail" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
  <div className="detailed-title center">{article.title}</div>
            <div className="list-icon center">
              <span>
                <CalendarOutlined /> {article.addTime}
              </span>
              <span>
                <FolderOutlined /> {article.typeName}
              </span>
              <span>
                <FireOutlined /> {article.view_count}人
              </span>
            </div>
            <div className="detailed-content" dangerouslySetInnerHTML={{__html:marked(article.article_content)}}>
              
            </div>
          </div>
        </Col>
        
      </Row>
      <Footer></Footer>
    </style.DetailWrapper>
  );
} 

export default Detail;
