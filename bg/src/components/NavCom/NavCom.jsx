import { useState, useEffect } from "react";
import { message, Tabs } from "antd";
import { StickyContainer, Sticky } from "react-sticky";
import axiosInstance from "../../util";
import * as style from "./index";
import { NavLink } from "react-router-dom";
const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        className="site-custom-tab-bar"
        style={{ ...style }}
      />
    )}
  </Sticky>
);

const NavCom = () => {
  let [type, setType] = useState([]);
  let [articleList, setArticleList] = useState([]);
  let [page,setPage] = useState(1)
  useEffect(() => {
    axiosInstance.get("/default/getArticleType").then((res) => {
      // console.log(res.data)
      setType(res.data);
    });
    axiosInstance.get(
      "/default/getArticleAllName").then((res) => {
        // console.log(res)
        setArticleList(res.data);
        setPage(p=>p+1)
      })
    
  }, []);
  
  function fetchList(){

    axiosInstance.get('/default/getArticleAllName?page='+page).then(res=>{
      setPage(page=>page+1)
      setArticleList([...articleList,...res.data])
      // console.log(res.data)
      if(res.data.length===0)message.warn('文章列表全部加载完成')
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <style.NavComWrapper >
      <StickyContainer>
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} centered>
          <Tabs.TabPane tab="分类" key="1">
            {type.map((item) => (
              <NavLink
                key={item.id}
                to={"/list/" + item.typeName + "/" + item.id}
              >
                <div className="tabItem">{item.typeName}</div>
              </NavLink>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="全部" key="2">
           {articleList.map(item=>{
             return(
              <NavLink
              key={item.id}
              to={"/detail/" + item.id}
            >
              <div className="tabItem">{item.title}</div>
            </NavLink>
             )
           })}
          </Tabs.TabPane>
          <Tabs.TabPane tab="推荐" key="3">
            功能未开通
          </Tabs.TabPane>
        </Tabs>
      </StickyContainer>
      <div className="footer" onClick={fetchList}>点击加载下一页</div>
    </style.NavComWrapper>
  );
};
export default NavCom;
