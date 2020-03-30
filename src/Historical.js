import React from 'react';
import rp from 'request-promise';
import { Layout, PageHeader, Select, Spin, Typography } from 'antd';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts";
const { Content, Footer } = Layout;

const { Option } = Select;
const { Text } = Typography;

export class Dashboard extends React.Component {

  state = {
    data: [],
    countries: [],
    selectedCountry: 'India',
    loading: true
  }

  async componentDidMount() {
    let res = await rp('https://corona.lmao.ninja/v2/historical');
    res = await JSON.parse(res);
    const countries = res.map(item => ({ country: item.country, key: `${item.country}${item.province? `${item.province}` : ''}`, displayValue: `${item.country}${item.province ?` (${item.province})` : ''}` }));
    this.setState({ data: res, countries: countries, loading: false});
  }

  onChange = (elem, val) => {
    console.log('checked: ', elem, val);
    this.setState({ selectedCountry: elem})
  }

  render() {
    const countryData = this.state.data.filter(item => {
      const countryKey = `${item.country}${item.province||''}` 
      return countryKey == this.state.selectedCountry
    });
    console.log('props countries: ', this.state.countries);
    let timeline = {};
    if (Array.isArray(countryData) && countryData.length > 0) {
      timeline = countryData[0].timeline;
    }
    let datum = [];
    console.log('timeline: ', timeline);
    for (let key in timeline.cases) {
      datum.push({
        date: key,
        type: 'cases',
        value: Number(timeline.cases[key])
      })
    }
    for (let key in timeline.deaths) {
      datum.push({
        date: key,
        type: 'deaths',
        value: Number(timeline.deaths[key])
      })
    }
    for (let key in timeline.recovered) {
      datum.push({
        date: key,
        type: 'recovered',
        value: Number(timeline.recovered[key])
      })
    }
    console.log('datum: ', datum)

    const cols = {
      date: {
        range: [0, 1]
      }
    };
    return (
      <Layout className="site-layout">
        <div className="site-layout-background" style={{display: 'flex', flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center'}}>
          <PageHeader title='Corona Tracker Dashboard' subTitle='Trend by country :' ></PageHeader>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a country"
            optionFilterProp="children"
            value={this.state.selectedCountry}
            onChange={this.onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.countries.map(country => <Option value={`${country.key}`} key={`${country.key}`}>{`${country.displayValue}`}</Option>)}
          </Select>
          <Text level={4} style={{ padding: 0, margin: '0 0 0 300px' }}>(Data based on GMT+0 and may be delayed)</Text>
        </div>
        <Content style={{ margin: '0 16px' }}>
          {this.state.loading ? 
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '200px' }}>
            <Spin size='large' />
          </div> :
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360, margin: '16px 0' }}>
            <Chart height={800} width={1000} data={datum} scale={cols} forceFit>
              <Legend />
              <Axis name="date" label={{
                formatter: (val, key, index) => (index % 7 === 0) ? val : '',
                autoRotate: false
              }} />
              <Axis name="value" />
              <Tooltip
                crosshairs={{
                  type: "y"
                }}
              />
              <Geom
                type="line"
                position="date*value"
                size={2}
                color={["type", ['#40a9ff', '#ff4d4f', '#73d13d']]}
                shape={"smooth"}
              />
              <Geom
                type="point"
                position="date*value"
                size={4}
                shape={"circle"}
                color={["type", ['#40a9ff', '#ff4d4f', '#73d13d']]}
                style={{
                  stroke: "#fff",
                  lineWidth: 1
                }}
              />
            </Chart>
          </div>}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by <a href="https://github.com/kokanek">kokanek</a> using data from <a href="https://www.worldometers.info/coronavirus/">Worldometers</a></Footer>
      </Layout>
    );
  }
}

export default Dashboard;
