import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          cx="50%"
          cy="40%"
          data={vaccinationByAge}
          startAngle={0}
          endAngle={360}
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill=" #2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="60 Above" fill="#64c2a6" />
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
export default VaccinationByAge
