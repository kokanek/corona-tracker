import React, { useState } from "react";
import { Box, Button, Heading, Collapsible, Grommet, ResponsiveContext, Layer } from 'grommet';
import { Menu, CloudDownload } from 'grommet-icons';
import Dashboard from './Dashboard';
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

async function onClickGetData(callback) {
  let res = await rp('https://corona.lmao.ninja/countries');
  res = await JSON.parse(res);
  callback(res);
  //console.log('clicked get data', res);
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
                onClick={() => onClickGetData(setTableData)}
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
