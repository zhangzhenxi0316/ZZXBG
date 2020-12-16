import { Link } from "react-router-dom";
import marked from "marked";
import {useEffect} from 'react'
// import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from "@ant-design/icons";

const renderer = new marked.Renderer();

function List(props) {
    useEffect(()=>{
        marked.setOptions({
            renderer,
            gfm: true, //github样式
            pedantic: false, //容错
            sanitize: false, //忽略html
            tables: true, //github table样式
            breaks: false,
            smartLists: true, //列表样式
            highlight:function(code){
                return    window.hljs.highlightAuto(code).value
            }
          });
    },[])
   
  let list = props.list;
  return (
    <div className="list">
      {list&&list.map((item) => (
        <div className="list-item" key={item.id}>
          <Link to={{ pathname: "/detail/" + item.id }}>
            <div className="list-title">{item.title}</div>
          </Link>
          <div className="list-icon">
            <span>
              <CalendarOutlined /> {item.addTime}
            </span>
            <span >
              <Link className="typeLink"  to={item.typeId?{ pathname: `/list/${item.typeName}/${item.typeId}` }:'#'}>
                <FolderOutlined /> {item.typeName}
              </Link>
            </span>
            <span>
              <FireOutlined /> {item.view_count}人
            </span>
          </div>
          <div
            className="list-context"
            dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
          ></div>
        </div>
      ))}
    </div>
  );
}
export default List