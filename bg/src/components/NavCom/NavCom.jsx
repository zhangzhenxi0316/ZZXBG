import {useState,useEffect} from 'react'
import { Tabs } from "antd";
import { StickyContainer, Sticky } from "react-sticky";
import axiosInstance from "../../util";
import * as style from './index'
import { NavLink } from 'react-router-dom';
const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
      {({ style }) => (
        <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
      )}
    </Sticky>
  );
  
const NavCom = () => {
    let [type,setType] = useState([])
  useEffect(()=>{
      axiosInstance.get('/default/getArticleType').then(res=>{
        // console.log(res.data)
        setType(res.data)
    })
  },[])
  
  return (
    <style.NavComWrapper>
      <StickyContainer>
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} centered>
          <Tabs.TabPane tab="分类" key="1" >
              {type.map(item=>(
                  <NavLink key={item.id}  to={'/list/'+item.typeName+'/'+item.id} >
            <div  className="tabItem">{item.typeName}</div>
                  
                  </NavLink>
              ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="全部" key="2">
            Content of Tab Pane 2
          </Tabs.TabPane>
          <Tabs.TabPane tab="推荐" key="3">
            Content of Tab Pane 3
          </Tabs.TabPane>
        </Tabs>
      </StickyContainer>
    </style.NavComWrapper>
  );
};
export default NavCom
