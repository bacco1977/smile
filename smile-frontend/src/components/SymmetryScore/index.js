import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';



export default class SymmetryScore extends PureComponent {

  render() {
    const data = [
        {value: this.props.score},
        {value: (100- this.props.score)}
      ];

    const COLORS = ['#f89422', '#FFF']

    return (
    <div className="d-flex justify-content-center flex-column align-items-center">
        <h1>Your symmetry score is {this.props.score}</h1>
        <PieChart width={220} height={400} onMouseEnter={this.onPieEnter}>
            <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            >
            {
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
            </Pie>
        </PieChart>
    </div>
    );
  }
}
