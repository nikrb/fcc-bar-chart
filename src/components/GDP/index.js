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
  margin = {top: 20, right: 30, bottom: 50, left: 40};
  mouse_x = 0;
  mouse_y = 0;
  componentWillMount = () => {
    this.getData();
  };
  getData = () => {
    Actions.getGDP()
    .then( (response) => {
      console.log( response);
      this.setState( { data: response})
    });
  };
  handleMouseMove = (e) => {
    // this seems to be the best fit for chrome,firefox and ie
    this.mouse_x = e.nativeEvent.pageX-this.margin.left;
    this.mouse_y = e.nativeEvent.pageY-this.margin.top;
  };
  handleMouseEnter = (datarow) => {
    this.setState( { tooltip_text: datarow.label+":"+datarow.value,
      tooltip_visible:true,
      tooltip_x: this.mouse_x, tooltip_y: this.mouse_y});
  };
  handleMouseLeave = () => {
    this.setState( { tooltip_visible: false})
  };
  render = () => {
    console.log( "rendering GDP");
    const chart_data = this.state.data.data.map( (dp) => {
      return { label: dp[0], value: dp[1]};
    });
    const container = { width:960, height:400};
    const tooltip = {display: (this.state.tooltip_visible)?"block":"none",
      top: this.state.tooltip_y, left: this.state.tooltip_x
    };
    const {description, name} = this.state.data;
    const xaxis_style = {
      position: "absolute",
      fontSize: "10px",
      bottom: "1em",
      left: this.margin.left,
      width: container.width - (this.margin.left+this.margin.right)
    };
    const yaxis_style = {
      position: "absolute",
      fontSize: "10px",
      top: container.height/2,
      left: "-3em",
      transform: "rotate( -90deg)"
    };
    return (
      <div style={{position: "relative", textAlign: "center"}}>
        <h1>Gross Domestic Product</h1>
        <div style={xaxis_style}>
          {description}
        </div>
        <div style={yaxis_style}>
          {name}
        </div>
        <div onMouseMove={this.handleMouseMove} >
          <BarChart margin={this.margin} height={container.height} width={container.width} data={chart_data}
            handleMouseEnter={this.handleMouseEnter} handleMouseLeave={this.handleMouseLeave} />
          <Tooltip tip_text={this.state.tooltip_text} pos={tooltip} />
        </div>
      </div>
    );
  };
}
