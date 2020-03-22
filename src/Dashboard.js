import React, { PureComponent } from 'react';
import {DataTable, Text} from 'grommet';

export class Dashboard extends PureComponent {
  render() {
    const { tableData } = this.props;
    console.log('dashboard prop: ', tableData);
    return (
        <DataTable
          columns={[
            {
              property: 'country',
              header: <Text>Country</Text>,
              primary: false,
            },
            {
              property: 'cases',
              header: <Text>Cases</Text>,
              primary: false,
            },
            {
              property: 'todayCases',
              header: <Text>New Cases</Text>,
              primary: false,
            },
            {
              property: 'deaths',
              header: <Text>Deaths</Text>,
              primary: false,
            },
            {
              property: 'recovered',
              header: <Text>Recovered</Text>,
              primary: false,
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
        />
    )
  }
}

export default Dashboard;
