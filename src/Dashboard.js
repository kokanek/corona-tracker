import React, { PureComponent } from 'react';
import { DataTable, Text, Meter, Box, Accordion, AccordionPanel} from 'grommet';
import {Table} from 'antd';

export class Dashboard extends PureComponent {
  render() {
    const { tableData } = this.props;
    console.log('dashboard prop: ', tableData);

    return (
      <Accordion>
        <AccordionPanel label="Trend">
          <Box pad="medium" background="light-2">
            <Text>Two</Text>
          </Box>
        </AccordionPanel>
        <AccordionPanel label="Table">
          <Box pad={{horizontal: 'medium'}} height='medium' width='xlarge'>
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
                          values={[{ value: datum.todayCases / datum.cases*100 }]}
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
            </Box>
        </AccordionPanel>
      </Accordion>
    )
  }
}

export default Dashboard;
