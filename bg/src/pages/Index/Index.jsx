import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import { Row, Col, message } from "antd";

import Author from "../../components/Author/Author";
import NavCom from "../../components/NavCom/NavCom";
// import { Footer } from 'antd/lib/layout/layout'
import Footer from "../../components/Footer/Footer";
import axiosInstance from "../../util/index";
// import { Link } from "react-router-dom";
import List from '../../components/List/List'
function Index() {
  // console.log(marked('# hasdfsdf'))
  const [mylist, setMylist] = useState([]);
  const [page, setPage] = useState(1);
  // const [isReq, setIsReq] = useState(true);
  const wrap = useRef(null);
  useEffect(() => {
    axiosInstance
      .request({ url: `/default/getArticleList?page=${page}` })
      .then((res) => {
        // console.log(res);
        if (res.data.code === 200) setMylist(res.data.rows);
        setPage(page=>page+1);
      }).catch(err=>message.error('文章列表获取失败'));
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  });
  function scroll(e) {
    let docHeight = wrap.current.clientHeight;

    let height =
      document.documentElement.clientHeight +
      document.documentElement.scrollTop;
    if (docHeight === Math.ceil(height)) {
      axiosInstance
        .request({ url: `/default/getArticleList?page=${page}` })
        .then((res) => {
          // console.log(res);
          if (res.data.code === 200) setMylist([...mylist,...res.data.rows]);
          setPage(page=>page+1);
          if (res.data.code === 201) {
            // setIsReq(false);
            message.warn("没有数据了");
          }
        }).catch(err=>message.error('文章列表获取失败'));;
    }
  }
  return (
    <div ref={wrap}>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        {/* 左侧主体 */}
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author></Author>
          <NavCom></NavCom>
        </Col>
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          {/* <List
          className="comm-main"
          split={false}
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={(item) => {
              return (
                <List.Item className="list-item">
                  <Link to={{ pathname: "/detail/" + item.id }}>
                    <div className="list-title">{item.title}</div>
                  </Link>
                  <div className="list-icon">
                    <span>
                      <CalendarOutlined /> {item.addTime}
                    </span>
                    <span className="link">
                      <Link to={{ pathname: `/list/${item.typeName}/${item.typeId}` }}><FolderOutlined /> {item.typeName}</Link>
                    </span>
                    <span>
                      <FireOutlined /> {item.view_count}人
                    </span>
                  </div>
                  <div
                    className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                  ></div>
                </List.Item>
              );
            }}
          /> */}
          <List list={mylist}></List>
        </Col>
        
      </Row>
      <Footer></Footer>
    </div>
  );
}

export default Index;
