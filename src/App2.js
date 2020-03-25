import React, { useState } from "react";
import { Layout, Menu, PageHeader, Select } from 'antd';
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
import Dashboard from './Dashboard';

const { Sider } = Layout;

class App2 extends React.Component {
  state = {
    collapsed: false,
    display: 'graph'
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  onChange = elem => {
    console.log('on change triggered: ', elem);
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <div style={{margin: '12px'}} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" onClick={() => this.setState({display: 'graph'})}>
              <PieChartOutlined />
              <span>Dashboard</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={() => this.setState({ display: 'table' })}>
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
        {this.state.display === 'graph' && <Historical />}
        {this.state.display === 'table' && <Dashboard />}
      </Layout>
    );
  }
}

export default App2;
