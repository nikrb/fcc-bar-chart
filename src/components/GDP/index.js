import React from 'react';
import Actions from './Actions';
import BarChart from '../BarChart';
import Tooltip from '../Tooltip';

export default class GDP extends React.Component {
  state = {
    data: { data:[]},
    tooltip_text: "",
    tooltip_visible: false,
    tooltip_x :0,
    tooltip_y : 0
  };
  componentWillMount = () => {
    this.getData();
  };
  getData = () => {
    Actions.getGDP()
    .then( (response) => {
      this.setState( { data: response})
    });
  };
  handleMouseEnter = (datarow, x, y) => {
    this.setState( { tooltip_text: datarow.label+":"+datarow.value,
      tooltip_visible:true,
      tooltip_x: x+12, tooltip_y: y});
  };
  handleMouseLeave = () => {
    this.setState( { tooltip_visible: false})
  };
  render = () => {
    const chart_data = this.state.data.data.map( (dp) => {
      const bits = dp[0].split('-');
      const yr = parseFloat( bits[0]);
      return { label: dp[0], value: dp[1]};
    });
    console.log( 'chart data:', chart_data)
    const container = { width:960, height:400};
    const tooltip = {display: (this.state.tooltip_visible)?"block":"none",
      top: this.state.tooltip_y, left: this.state.tooltip_x
    };
    return (
      <div>
        <BarChart height={container.height} width={container.width} data={chart_data}
          handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} />
        <Tooltip tip_text={this.state.tooltip_text} pos={tooltip} />
      </div>
    );
  };
}
