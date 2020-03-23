import React, { useState } from "react";
import { Layout, Menu, PageHeader } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

import 'antd/dist/antd.css'; 
import './index.css';

import Historical from './Historical';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App2 extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <div style={{margin: '74px'}} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <PieChartOutlined />
              <span>Dashboard</span>
            </Menu.Item>
            <Menu.Item key="2">
              <DesktopOutlined />
              <span>Table</span>
            </Menu.Item>
            <Menu.Item key="3">
              <DesktopOutlined />
              <span>Graph</span>
            </Menu.Item>
            <Menu.Item key="4">
              <DesktopOutlined />
              <span>Other</span>
            </Menu.Item>
            <Menu.Item key="9">
              <FileOutlined />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background">
            <PageHeader title='Corona Tracker Dashboard' ></PageHeader>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360, margin: '16px 0' }}>
              <Historical />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App2;
