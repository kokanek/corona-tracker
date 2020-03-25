import React, { PureComponent } from 'react';
import { DataTable, Text, Meter, Box } from 'grommet';
import { Layout, PageHeader, Spin } from 'antd';
import rp from 'request-promise';

const { Header, Content, Footer } = Layout;

export class Dashboard extends PureComponent {

  state = {
    data: [],
    loading: true
  }

  async componentDidMount() {
    let res = await rp('https://corona.lmao.ninja/countries');
    res = await JSON.parse(res);
    this.setState({ data: res, loading: false });
  }

  render() {
    const { data: tableData } = this.state;
    console.log('dashboard prop: ', tableData);

    return (
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <PageHeader title='Detailed tracker' subTitle='All data' ></PageHeader>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {this.state.loading ?
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'200px'}}>
            <Spin size='large' />
          </div>
          :<div className="site-layout-background" style={{ padding: 24, minHeight: 360, margin: '16px 0' }}>
            <DataTable
              columns={[
                {
                  property: 'country',
                  header: <Text>Country</Text>,
                  primary: false,
                  search: true,
                },
                {
                  property: 'cases',
                  header: <Text>Cases</Text>,
                  primary: false,
                  sortable: true
                },
                {
                  property: 'todayCases',
                  header: <Text>New Cases today</Text>,
                  primary: false,
                  sortable: true
                },
                {
                  property: 'deaths',
                  header: <Text>Deaths</Text>,
                  primary: false,
                  sortable: true
                },
                {
                  property: 'todayDeaths',
                  header: <Text>Today Deaths</Text>,
                  primary: false,
                  sortable: true
                },
                {
                  property: 'recovered',
                  header: <Text>Recovered</Text>,
                  primary: false,
                  sortable: true
                },
                {
                  property: 'percentageIncrease',
                  header: 'Percentage increase',
                  render: datum => `${(datum.todayCases / datum.cases * 100).toFixed(2)}%`,
                  sortable: true
                },
              ]}
              data={tableData}
              background={{
                header: "dark-3",
                body: ["light-1", "light-3"],
                footer: "dark-3"
              }}
              step={1000}
              sortable={true}
              size='large'
            />
          </div>}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
      
    )
  }
}

export default Dashboard;
