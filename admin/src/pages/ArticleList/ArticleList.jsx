import React, { useState, useEffect } from "react";
import { List, Row, Col, Modal, message, Button } from "antd";
import axiosInstance from "../../util/index";
import * as style from './index'
const { confirm } = Modal;
function ArticleList(props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    axiosInstance.request("/admin/getArticleList").then((res) => {
      setList(res.data);
    });
  }, []);
  function deleteArticle(id){
      confirm({
          title:'确定要删除这篇文章吗',
          content:'如果点击ok 文章永远丢失',
          onOk(){
             axiosInstance.request({url:'/admin/deleteArticleById',method:'post',data:{id}}).then(res=>{
                message.success('文章删除成功');  
                axiosInstance.request("/admin/getArticleList").then((res) => {
                    setList(res.data);
                  });
          })
          
          },
          onCancel(){
              message.success('文章取消操作')
          }
      })
  }
  function AlertArticle(id){
      props.history.push('/admin/add/'+id)
  }
  return (
    <style.ArticleListBox>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <strong>标题</strong>
            </Col>
            <Col span={4}>
              <strong>类别</strong>
            </Col>
            <Col span={4}>
              <strong>发布时间</strong>
            </Col>
            <Col span={4}>
              <strong>浏览量</strong>
            </Col>
            <Col span={4}>
              <strong>操作</strong>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item) => {
          return (
            <List.Item>
              <Row className="list-div">
                <Col span={8}>{item.title}</Col>
                <Col span={4}>{item.typeName}</Col>
                <Col span={4}>{item.addTime}</Col>
                <Col span={4}>{item.view_count}</Col>
                <Col span={4}>
                  <Button type="primary" onClick={()=>{AlertArticle(item.id)}}>修改</Button>&nbsp;
                  <Button onClick={()=>{deleteArticle(item.id)}}>删除</Button>
                </Col>
              </Row>
            </List.Item>
          );
        }}
      />
    </style.ArticleListBox>
  );
}
export default ArticleList;
