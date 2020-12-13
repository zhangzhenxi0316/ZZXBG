import React from "react";
import { Row, Col, Menu } from "antd";
import { HomeOutlined, GithubOutlined } from "@ant-design/icons";
import * as Style from './index' 
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Style.HeaderWrapper className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={14}>
          <span className="header-logo">ZZXBG</span>
          <span className="header-txt">前端开发技术博客</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={4} >
          <Menu mode="horizontal">
            <Menu.Item key="home">
              <Link to="/" className="link">
              <HomeOutlined />
              首页
              </Link>
            </Menu.Item>
            <Menu.Item key="github">
              <a className="link" href="https://github.com/zhangzhenxi0316/ZZXBG">
              <GithubOutlined />
              github
              </a>
            </Menu.Item>
            
          </Menu>
        </Col>
      </Row>
    </Style.HeaderWrapper>
  );
};
export default Header;
