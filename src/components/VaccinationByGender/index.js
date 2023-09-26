// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          cx="50%"
          cy="40%"
          data={vaccinationByGender}
          startAngle={0}
          endAngle={180}
          outerRadius="70%"
          innerRadius="30%"
          dataKey="count"
        >
          <Cell name="male" fill=" #f54394" />
          <Cell name="female" fill="#5a8dee" />
          <Cell name="others" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          horizontalAlign="middle"
          align="center"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
export default VaccinationByGender
