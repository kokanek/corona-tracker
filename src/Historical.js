import React from 'react';
import rp from 'request-promise';
import { Layout, Menu, PageHeader, Select } from 'antd';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
const { Header, Content, Footer, Sider } = Layout;

const { Option } = Select;

export class Dashboard extends React.Component {

  state = {
    data: [],
    countries: [],
    selectedCountry: 'india'
  }

  async componentDidMount() {
    let res = await rp('https://corona.lmao.ninja/historical');
    res = await JSON.parse(res);
    const countries = res.map(item => ({name: item.province? `${item.country} (${item.province})` : item.country, key: item.country}));
    this.setState({ data: res, countries: countries});
  }

  onChange = (elem, val) => {
    console.log('checked: ', elem, val);
    this.setState({ selectedCountry: elem})
  }

  render() {
    const countryData = this.state.data.filter(item => item.country === this.state.selectedCountry);
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
          <PageHeader title='Corona Tracker Dashboard' subTitle='Trend by country' ></PageHeader>
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
            {this.state.countries.map(country => <Option value={country.key} key={country.name}>{country.name}</Option>)}
          </Select>
        </div>
        <Content style={{ margin: '0 16px' }}>
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
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

export default Dashboard;
