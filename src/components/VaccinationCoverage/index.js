import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {cowinData} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={cowinData}
        margin={{
          top: 5,
        }}
        width={1000}
        height={300}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose1" name="Dose 1" fill="#f54394" barSize="20%" />
        <Bar dataKey="dose2" name="Dose 2" fill="#5a8dee" barSize="20%" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default VaccinationCoverage
