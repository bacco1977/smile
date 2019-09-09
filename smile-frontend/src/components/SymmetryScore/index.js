import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell, Label,
} from 'recharts';



export default class SymmetryScore extends PureComponent {

  render() {
    const data = [
        {value: this.props.score},
        {value: (100- this.props.score)}
      ];

    const COLORS = ['#f89422', '#efefef']

    return (
    <div className="pt-4 d-flex justify-content-center flex-column align-items-center text-center">
        <h1 style={{fontSize:"4rem"}}>{`${this.props.name}`}</h1>
        <p style={{fontSize:"1.5rem", fontWeight:"100"}}>has a symmetry score of</p>
        <PieChart style={{marginTop:"-5rem"}} width={300} height={400} onMouseEnter={this.onPieEnter}>
            <Pie
            data={data}
            cx={140}
            cy={240}
            innerRadius={90}
            outerRadius={120}
            fill="#f89422"
            paddingAngle={5}
            dataKey="value"
            >
            <Label style={{fontSize:"4rem", fontWeight:"bold"}} value={`${this.props.score}%`} position="center" />
            {
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
            </Pie>
        </PieChart>
    </div>
    );
  }
}
