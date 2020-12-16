import {useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import {Row,Col,Pagination,message} from 'antd'
// import {Link} from 'react-router-dom'
import Author from '../../components/Author/Author'
import NavCom from '../../components/NavCom/NavCom'
// import { Footer } from 'antd/lib/layout/layout'
import Footer from '../../components/Footer/Footer'
import axiosInstance from '../../util'
import marked from 'marked'
// import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import List from '../../components/List/List'

const renderer = new marked.Renderer()
   
function MyList(props) {
 
    const [mylist,setMylist] = useState()
    const [totalCount,setTotalCount] = useState(0)
  useEffect(()=>{
    // console.log(window.)
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
    let {id} = props.match.params
    axiosInstance.get('/default/getArticleListByTypeId?id='+id).then((res)=>{
      // console.log(res.data.totalCount)
      setMylist(res.data.data)
      setTotalCount(res.data.totalCount)
    }).catch(err=>message.error('文章列表获取失败'))
  },[props.match.params])  
  function onChange(index){
    let {id} = props.match.params
    axiosInstance.get(`/default/getArticleListByTypeId?id=${id}&&page=${index}`).then((res)=>{
      // console.log(res)
      setMylist(res.data.data)
    }).catch(err=>message.error('文章列表获取失败'))
  }
  
  return (
    <div >
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        {/* 左侧主体 */}
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author></Author>
          <NavCom></NavCom>
        </Col>
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
  <div className="listTitle">{props.match.params.typeName}</div>
          <List list={mylist}></List>
        </Col>
        
      </Row>
      <Pagination className="pagination"  onChange={onChange} hideOnSinglePage total={totalCount} pageSize={10}></Pagination>
      <Footer></Footer>
    </div>
  );
}

export default MyList;