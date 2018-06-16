import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import styled from 'styled-components';
const data = [
  { name: '비트코인', value: 112335407801 },
  { name: '이더리움', value: 50120877985 },
  { name: '리플', value: 21544455663 },
  { name: '비트코인캐시', value: 14947200863 },
  { name: '이오스', value: 9761577188 },
  { name: '기타', value: 74204306947 }
];

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#009ac8',
  'violet'
];
const StyledWrap = styled.div`
  svg {
    overflow: visible !important;
    position: relative;
    z-index: 1;
  }
`;
const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class MarketcapChart extends Component {
  state = {
    activeIndex: 0
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    return (
      <StyledWrap>
        <PieChart width={220} height={180}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={90}
            cy={90}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            onMouseEnter={this.onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </StyledWrap>
    );
  }
}
