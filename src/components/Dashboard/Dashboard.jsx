// import style from "./style.module.css";
import style from "./dash.module.css";
import React, { useState, useEffect, useContext } from "react";
import {
  PoweroffOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  BankOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, message } from "antd";
import UserProfile from "./UserProfile/UserProfile";
import { UserContext } from "../../App";
import MenuItem from "./MenuItem";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function Dashboard() {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();
  const [sideItems, setSideItems] = useState([]);
  const [mainItems, setMainItems] = useState([]);

  const { menuSide, menuMain } = useContext(UserContext);
  const [menuSideValue] = menuSide;
  const [menuMainValue] = menuMain;
  const sideLogos = [
    <BankOutlined />,
    <InfoCircleOutlined />,
    <SettingOutlined />,
  ];

  useEffect(() => {
    const arr = [getItem("صفحه اصلی", "0", <HomeOutlined />)];
    menuSideValue.map((e, i) => {
      arr.push(getItem(e.title, `${i + 1}`, sideLogos[i % 3]));
    });
    arr.push(getItem("خروج", "-1", <PoweroffOutlined />));
    setSideItems(arr);
  }, [menuSideValue]);

  useEffect(() => {
    setMainItems(
      menuMainValue.map((e) => ({
        id: e.id,
        title: e.title,
      }))
    );
  }, [menuMainValue]);

  const success = (text) => {
    messageApi.open({
      type: "success",
      content: text,
      className: style.message,
    });
  };

  const warning = (text) => {
    messageApi.open({
      type: "warning",
      content: text,
      className: style.message,
    });
  };

  const error = (text) => {
    messageApi.open({
      type: "error",
      content: text,
      className: style.message,
    });
  };

  const { user } = useContext(UserContext);
  const [userValue] = user;

  useEffect(() => {
    if (localStorage.getItem("token") === null || userValue === null) {
      window.location.replace("/login");
    }
  }, []);

  const clickMenu = ({ key }) => {
    switch (key) {
      case "-1":
        localStorage.removeItem("token");
        window.location.replace("/login");
        break;
    }
  };

  return (
    <>
      {contextHolder}
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["0"]}
            mode="inline"
            items={sideItems}
            onClick={clickMenu}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              height: 350,
            }}
          >
            <UserProfile />
          </Header>
          <Content
            style={{
              margin: "20px 16px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              gap: "20px",
            }}
          >
            {mainItems.map((e, i) => (
              <MenuItem key={i} item={e} id={i} />
            ))}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Dashboard;
