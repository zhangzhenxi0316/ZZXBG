import React, { useState, useEffect } from "react";
import marked from "marked";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import * as style from "./index";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import axiosInstance from "../../../util/index";
const { Option } = Select;
const { TextArea } = Input;
marked.setOptions({
  renderer: marked.Renderer(),
  gfm: true, //github样式
  pedantic: false, //容错
  sanitize: false, //忽略html
  tables: true, //github table样式
  breaks: false,
  smartLists: true,
  smartypants: false,
  sanitize: false,
  xhtml: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
});

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0); //0是新增，1 是修改
  const [articleTitle, setArticleTitle] = useState(""); //title
  const [articleContent, setArticleContent] = useState("");
  const [markdownContent, setMarkdownContent] = useState("预览内容");
  const [introducemd, setIntroducemd] = useState("");
  const [introducehtml, setIntroducehtml] = useState("等待编辑");
  const [showDate, setShowDate] = useState();
  const [newType, setNewType] = useState("");
  const [showNewType, setShowNewType] = useState(false);
  // const [updateDate,setup]
  const [typeInfo, setTypeInfo] = useState([]);
  const [typename,setTypename] = useState('')
  const [selectedType, setSelectType] = useState();
  const [showDateSwitch,setShowDateSwitch] = useState(true)
  useEffect(() => {
    let id = props.match.params.id
    // console.log(id) 
    if(id){
      // console.log(111)
      // 修改
      setArticleId(1)
      axiosInstance.request('/admin/getArticleById?id='+id).then(res=>{
        if(res.data.code===301){props.history.push('/login')}
        setArticleTitle (res.data.title) 
        setArticleContent (res.data.article_content) 
        setMarkdownContent (marked(res.data.article_content))
        setIntroducemd (res.data.introduce);
        setIntroducehtml (marked(res.data.introduce) );
        setShowDateSwitch(false)
        setSelectType(res.data.typeId)
        setTypename(res.data.typeName)
        setShowDate(res.data.addTime)
        // console.log(res.data.typeId)
      }).then(res=>{
        message.success('文章加载完成')
      })
    }
    axiosInstance.request("/admin/getArticleTypes").then((res) => {
      if(res.data.code===301){props.history.push('/login')}
      //   console.log(res);
      if (res.data.code === 301) {
        message.error("重新登陆管理系统");
        props.history.push("/");
      } else {
        setTypeInfo(res.data);
      }
    });
    let a = localStorage.getItem("articleContent");
    let b = localStorage.getItem("introducemd");
    if (a) {
      setArticleContent(a);
      setMarkdownContent(marked(a));
      message.success("缓存文章内容加载成功");
    }
    if (b) {
      setIntroducemd(b);
      setIntroducehtml(marked(b));
      message.success("缓存文章标题加载成功");
    }
  }, []);
  function changeContent(e) {
    let value = e.target.value;
    setArticleContent(e.target.value);
    let html = marked(value);
    setMarkdownContent(html);
    // console.log(html)
  }
  function changeIntroduce(e) {
    setIntroducemd(e.target.value);
    setIntroducehtml(marked(e.target.value));
  }
  function optionChange(e) {
    setSelectType(e);
    console.log(e);
    if (e === "add") setShowNewType(true);
    else setShowNewType(false);
  }
  function saveArticle() {
    // console.log(newType)
    // 保存文章
    // localStorage.setItem('articleTitle',articleTitle)
    localStorage.setItem("articleContent", articleContent);
    localStorage.setItem("introducemd", introducemd);
    message.success("保存成功");
  }
  function submit() {
    if (!articleTitle) {
      message.error("文章标题不能为空");
      return;
    } else if (!articleContent) {
      message.error("文章内容不能为空");
      return;
    } else if (!showDate) {
      message.error("文章日期不能为空");
      return;
    } else if (!introducemd) {
      message.error("文章简介不能为空");
      return;
    } else if (!selectedType) {
      message.error("类型不能为空");

      return;
    } else if (selectedType === "add" && !newType) {
      message.error("自定义类型不能为空");
      return;
    }
    let id = props.match.params.id
    axiosInstance
      .request({
        url: "/admin/addArticle",
        method: "POST",
        data: {
          id,
          articleid: articleId,
          title: articleTitle,
          article_content: articleContent,
          introduce: introducemd,
          addTime: showDate,
          type_id: selectedType,
          typeName: newType,
        },
      })
      .then((res) => {
        console.log(res);
        message.success("发布成功");
        props.history.push('/admin/list')
      })
      .catch((err) => {
        console.log(err);
        message.error("发布失败");
      });
  }
  function cleanArticle(){
    localStorage.removeItem("articleContent")
    localStorage.removeItem("introducemd")
  }
  return (
    <style.AddArticleWrapper>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={16}>
              <Input
                value={articleTitle}
                placeholder="博客标题"
                size="large"
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
              />
            </Col>
            <Col span={4}>
              <Select
                onChange={optionChange}
                placeholder={typename?typename:"请选择类别"}
                size="large"
                // defaultValue={newType}
              >
                {typeInfo.map((item) => {
                  return (
                    <Option size="large" key={item.id} value={item.id}>
                      {item.typeName}
                    </Option>
                  );
                })}
                <Option value="add">添加新类别</Option>
              </Select>
            </Col>
            <Col span={4}>
              {showNewType && (
                <Input
                  value={newType}
                  size="large"
                  placeholder="输入新类别"
                  onChange={(e) => setNewType(e.target.value)}
                ></Input>
              )}
            </Col>
          </Row>
          <br></br>
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                onChange={changeContent}
                rows={35}
                placeholder="Write Markdown"
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button className="btn" size="large" onClick={saveArticle}>
                暂存文章
              </Button>
              <Button className="btn" size="large" type="primary" onClick={submit}>
                提交文章
              </Button>
              <Button className="btn" size="large" onClick={cleanArticle}>
                清除缓存文章
              </Button>
            </Col>
            <Col span={24}>
              <br></br>
              <TextArea
                value={introducemd}
                rows={4}
                onChange={changeIntroduce}
                placeholder=" article introduce"
              ></TextArea>
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
            <Col span={12}>
              {showDateSwitch&&<div className="date-select">
                <DatePicker
                  onChange={(date, dateString) => {
                    setShowDate(dateString);
                  }}
                  placeholder="发布日期"
                  size="large"
                />
              </div>}
            </Col>
          </Row>
        </Col>
      </Row>
    </style.AddArticleWrapper>
  );
}
export default AddArticle;
