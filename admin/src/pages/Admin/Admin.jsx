import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import * as style from './index'
import {useState} from 'react'
import {Route} from 'react-router-dom'
import AddArticle from './AddArticle/AddArticle'
import ArticleList from '../ArticleList/ArticleList';
const {  Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Admin (props) {
 function handleClick(e){
  if(e.key==='addArticle'){
    props.history.push('/admin/add')
  }else{
    props.history.push('/admin/list')
  }
 }
const [collapsed,setCollapsed] = useState(false)
  function onCollapse (collapsed) {
    console.log(collapsed);
    setCollapsed( collapsed );
  };
    return (
        <style.LayoutWrapper>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              工作台
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />} onClick={()=>{
              props.history.push('/admin/add')
            }}>
              添加文章
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理" onClick={handleClick}>
              <Menu.Item key="addArticle">添加文章</Menu.Item>
              <Menu.Item key="articleList">文章列表</Menu.Item>
            </SubMenu>    
            <Menu.Item key="5" icon={<FileOutlined />}>
              留言管理
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div>
                  <Route path="/admin/" exact  component={AddArticle}></Route>
                  <Route path="/admin/add/:id?" exact  component={AddArticle}></Route>
                  <Route path="/admin/list" exact component={ArticleList}></Route>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>zzxbg.cn</Footer>
        </Layout>
      </Layout>
      </style.LayoutWrapper>
    );
  
}
export default Admin