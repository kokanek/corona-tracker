import React, { useState } from "react";
import { Box, Button, Heading, Collapsible, Grommet, ResponsiveContext, Layer } from 'grommet';
import { Menu, CloudDownload } from 'grommet-icons';
import Dashboard from './Dashboard';
import Historical from './Historical';
import rp from 'request-promise';

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

async function onClickGetData(callback1, callback2) {
  let res = await rp('https://corona.lmao.ninja/countries');
  res = await JSON.parse(res);
  res.forEach(item => ({ ...item, percentageIncrease: item.todayCases*100/item.cases }))
  callback1(res);
  //console.log('clicked get data', res);

  let res2 = await rp('https://corona.lmao.ninja/historical');
  res2 = await JSON.parse(res2);
  res2 = res2.filter(item => item.country === 'india');
  callback2(res2);
}

const AppBar = (props) => (
  <Box
    tag= 'header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={ { left: 'medium', right: 'small', vertical: 'small' } }
    elevation='medium'
    style={ { zIndex: '1' } }
    { ...props }
  />
);

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);

  console.log('table data: ', tableData);

  return (
    <Grommet theme= { theme } full >
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill >
            <AppBar>
              <Button
                icon={<Menu />}
                onClick={() => setShowSidebar(!showSidebar)}
              />
              <Heading level='3' margin='none'>Corona Tracker Dashboard</Heading>
              <Button
                icon={<CloudDownload />}
                onClick={() => onClickGetData(setTableData, setHistoricalData)}
              />
            </AppBar>
            <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
              {(!showSidebar || size !== 'small') ? (
                <Collapsible direction="horizontal" open={showSidebar}>
                  <Box
                    flex
                    width='medium'
                    background='light-2'
                    elevation='small'
                    align='center'
                    justify='center'
                  >
                    sidebar
                  </Box>
                </Collapsible>
              ) : (
                <Layer>
                  <Box fill background= 'light-2' align='center' justify='center'>
                    sidebar
                  </Box>
                </Layer>
              )}
              <Box align='center' justify='strech' margin={{vertical: 'large'}}>
                <Historical data={historicalData}/>
                <Dashboard tableData={tableData}/>
              </Box>
            </Box >
          </Box >
        )}
      </ResponsiveContext.Consumer>
      </Grommet >
  );
}

export default App;
