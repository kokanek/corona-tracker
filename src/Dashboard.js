import React, { PureComponent } from 'react';
import { DataTable, Text } from 'grommet';
import { Layout, PageHeader, Spin, Typography } from 'antd';
import rp from 'request-promise';

const { Content, Footer } = Layout;
const { Text: TXT } = Typography;

export class Dashboard extends PureComponent {

  state = {
    data: [],
    loading: true
  }

  async componentDidMount() {
    let res = await rp('https://corona.lmao.ninja/countries');
    res = await JSON.parse(res);
    res = res.map(datum => ({ ...datum, percentageIncrease: Number((Number(datum.todayCases) / Number(datum.cases) * 100).toFixed(2))}))
    this.setState({ data: res, loading: false });
  }

  render() {
    const { data: tableData } = this.state;
    console.log('dashboard prop: ', tableData);

    return (
      <Layout className="site-layout">
        <div className="site-layout-background" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <PageHeader title='Detailed tracker' subTitle='All data' ></PageHeader>
          <TXT level={4} style={{ padding: 0, margin: '0 0 0 300px' }}>(Data based on GMT+0 and may be delayed)</TXT>
        </div>
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
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by <a href="https://github.com/kokanek">kokanek</a> using data from <a href="https://www.worldometers.info/coronavirus/">Worldometers</a></Footer>
      </Layout>
      
    )
  }
}

export default Dashboard;
