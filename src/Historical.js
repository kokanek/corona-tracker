import React, { PureComponent } from 'react';
import { Box, } from 'grommet';
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

export class Dashboard extends PureComponent {
  render() {
    console.log('props in historical: ', this.props.data);
    let timeline = {};
    if(Array.isArray(this.props.data) && this.props.data.length > 0) {
      timeline = this.props.data[0].timeline;
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
      <div>
        <Chart height={800} width={1000} data={datum} scale={cols} forceFit>
          <Legend />
          <Axis name="date" label={{
            formatter: (val, key, index) => (index % 7 === 0) ? val : '',
            autoRotate: false
          }}/>
          <Axis
            name="value"
            
          />
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
        </Chart>
      </div>
    );
  }
}

export default Dashboard;
