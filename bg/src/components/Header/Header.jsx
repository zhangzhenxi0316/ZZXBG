import React from "react";
import { Row, Col, Menu } from "antd";
import { HomeOutlined, SmileOutlined, GithubOutlined } from "@ant-design/icons";
import * as Style from './index' 
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Style.HeaderWrapper className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">ZZXBG</span>
          <span className="header-txt">前端开发技术博客</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal">
            <Menu.Item key="home">
              <Link to="/">
              <HomeOutlined />
              首页
              </Link>
            </Menu.Item>
            <Menu.Item key="github">
              <Link to="https://github.com/zhangzhenxi0316/zzxbg-blog">
              <GithubOutlined />
              github
              </Link>
            </Menu.Item>
            <Menu.Item key="life">
              <SmileOutlined />
              生活
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Style.HeaderWrapper>
  );
};
export default Header;
