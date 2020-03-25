import React, { PureComponent } from 'react';
import { DataTable, Text, Meter, Box, Accordion, AccordionPanel} from 'grommet';
import rp from 'request-promise';

export class Dashboard extends PureComponent {

  state = {
    data: [],
  }

  async componentDidMount() {
    let res = await rp('https://corona.lmao.ninja/countries');
    res = await JSON.parse(res);
    res.forEach(item => ({ ...item, percentageIncrease: item.todayCases * 100 / item.cases }))
    this.setState({ data: res });
  }

  render() {
    const { data: tableData } = this.state;
    console.log('dashboard prop: ', tableData);

    return (
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
            header: <Text>New Cases</Text>,
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
            property: 'recovered',
            header: <Text>Recovered</Text>,
            primary: false,
            sortable: true
          },
          {
            property: 'percentage',
            header: 'Percentage increase',
            render: datum => (
              <Box pad={{ vertical: 'xsmall' }}>
                <Meter
                  values={[{ value: datum.todayCases / datum.cases * 100 }]}
                  thickness='small'
                  size='small'
                  round={true}
                />
              </Box>
            ),
          },
          // {
          //   property: 'percent',
          //   header: 'Complete',
          //   render: datum => (
          //     <Box pad={{ vertical: 'xsmall' }}>
          //       <Meter
          //         values={[{ value: datum.percent }]}
          //         thickness="small"
          //         size="small"
          //       />
          //     </Box>
          //   ),
          // },
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
    )
  }
}

export default Dashboard;
