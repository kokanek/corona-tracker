import React from 'react';
import rp from 'request-promise';
import { Layout, PageHeader, Select, Spin, Typography, Tag, Radio } from 'antd';
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
    graphType: 'cases',
    selectedCountries: ['India'],
    loading: true
  }

  async componentDidMount() {
    let res = await rp('https://corona.lmao.ninja/v2/historical');
    res = await JSON.parse(res);
    const countries = res.map(item => ({ country: item.country, key: `${item.country}${item.province? `${item.province}` : ''}`, displayValue: `${item.country}${item.province ?` (${item.province})` : ''}` }));
    this.setState({ data: res, countries: countries, loading: false});
  }

  onChange = (countryKey, val) => {
    console.log('checked: ', countryKey, val);
    this.setState((state) => ({ selectedCountries: [...state.selectedCountries, countryKey ]}))
  }

  onClickCloseTag = (removedTag) => {
    const tagKey = `${removedTag.country}${removedTag.province ? `${removedTag.province}` : ''}`;
    const selectedCountries = this.state.selectedCountries.filter(tag => tag !== tagKey)
    this.setState({ selectedCountries: selectedCountries })
  }

  onChangeRadio = (elem) => {
    this.setState({ graphType: elem.target.value })
  }

  render() {
    const countryData = this.state.data.filter(item => {
      const countryKey = `${item.country}${item.province||''}` 
      return this.state.selectedCountries.includes(countryKey);
    });
    console.log('selected countries: ', countryData);
    let datum = [];
    countryData.forEach(country => {
      const { timeline } = country;
      for (let key in timeline.cases) {
        datum.push({
          date: key,
          type: country.country,
          value: Number(timeline[this.state.graphType][key])
        })
      }
    })

    const cols = {
      date: {
        range: [0, 1]
      }
    };
    return (
      <Layout className="site-layout">
        <div className="site-layout-background" style={{display: 'flex', flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center'}}>
          <PageHeader title='Compare Countries' subTitle='Add countries to compare :' ></PageHeader>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a country"
            optionFilterProp="children"
            value={this.state.selectedCountries}
            onChange={this.onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.countries.map(country => <Option value={`${country.key}`} key={`${country.key}`}>{`${country.displayValue}`}</Option>)}
          </Select>
          <div style={{ margin:'0 0 0 16px'}} >
            <Radio.Group onChange={this.onChangeRadio} value={this.state.graphType}>
              <Radio value='cases'>Cases</Radio>
              <Radio value='deaths'>Deaths</Radio>
              <Radio value='recovered'>Recovered</Radio>
            </Radio.Group>
          </div>
          <Text level={4} style={{ padding: 0, margin: '0 0 0 10px' }}>(Data based on GMT+0 and may be delayed)</Text>
        </div>
        <div className="site-layout-background" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: '16px 16px', padding: '16px 16px' }}>
          {countryData.map(country => <Tag closable={true} onClose={() => this.onClickCloseTag(country)} key={`${country.country}${country.province}`} >{`${country.country}${country.province ? `${country.province}` : ''}`}</Tag>)}
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
                  color={"type"}
                  shape={"smooth"}
             />
                <Geom
                  type="point"
                  position="date*value"
                  size={4}
                  shape={"circle"}
                  color={"type"}
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
