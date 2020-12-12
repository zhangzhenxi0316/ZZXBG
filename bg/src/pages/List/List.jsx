import {useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import {Row,Col,List,Pagination} from 'antd'
import {CalendarOutlined,FolderOutlined,FireOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import Author from '../../components/Author/Author'
import NavCom from '../../components/NavCom/NavCom'
// import { Footer } from 'antd/lib/layout/layout'
import Footer from '../../components/Footer/Footer'
import axiosInstance from '../../util'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
const renderer = new marked.Renderer()
    marked.setOptions({
        renderer,
        gfm:true,//github样式
        pedantic:false,//容错
        sanitize:false,//忽略html
        tables:true,//github table样式
        breaks:false,
        smartLists:true, //列表样式
        highlight:function(code){
            return hljs.highlightAuto(code).value
        }
    })
function MyList(props) {
    const [mylist,setMylist] = useState()
    const [totalCount,setTotalCount] = useState(0)
  useEffect(()=>{
    // setMylist([])
    // console.log(111)
    let {id} = props.match.params
    axiosInstance.get('/default/getArticleListByTypeId?id='+id).then((res)=>{
      // console.log(res.data.totalCount)
      setMylist(res.data.data)
      setTotalCount(res.data.totalCount)
    })
  },[props.match.params.id])  
  function onChange(index){
    let {id} = props.match.params
    axiosInstance.get(`/default/getArticleListByTypeId?id=${id}&&page=${index}`).then((res)=>{
      console.log(res)
      setMylist(res.data.data)
    })
  }
  
  return (
    <div >
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        {/* 左侧主体 */}
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          
          <List
            header={<div className="list-header">{props.match.params.typeName}</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={
                item=>{
                    return(
                      <List.Item>
                      <Link to={{ pathname: "/detail/" + item.id }}>
                        <div className="list-title">{item.title}</div>
                      </Link>
                      <div className="list-icon">
                        <span>
                          <CalendarOutlined /> {item.addTime}
                        </span>
                        <span>
                          <FolderOutlined /> {item.typeName}
                        </span>
                        <span>
                          <FireOutlined /> {item.view_count}人
                        </span>
                      </div>
                      <div className="list-context" dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>
                    </List.Item>
                    )
                }
            }
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author></Author>
          <NavCom></NavCom>
        </Col>
      </Row>
      <Pagination className="pagination" onChange={onChange} hideOnSinglePage total={totalCount} pageSize={10}></Pagination>
      <Footer></Footer>
    </div>
  );
}

export default MyList;