import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class CowinDashboard extends Component {
  state = {
    cowinData: [],
    apiStatus: apiStatusConstant.initial,
    vaccinationByAge: [],
    vaccinationByGender: [],
  }

  componentDidMount() {
    this.getCoverageData()
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  getCoverageData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const res = await fetch(vaccinationDataApiUrl)
    // const data1 = await res.json()

    // const fetched = data1.map(each => ({
    //   last7DaysVaccination: each.last_7_days_vaccination,
    //   vaccinationByAge: each.vaccination_by_age,
    //   vaccinationByGender: each.vaccination_by_gender,
    // }))
    // console.log(fetched)

    if (res.ok === true) {
      const data = await res.json()
      console.log(data)

      const fetchedData = data.last_7_days_vaccination.map(each => ({
        dose1: each.dose_1,
        dose2: each.dose_2,
        vaccineDate: each.vaccine_date,
      }))

      this.setState({
        cowinData: fetchedData,
        apiStatus: apiStatusConstant.success,
      })
      const updatedVaccinationByAge = data.vaccination_by_age.map(each => ({
        count: each.count,
        age: each.age,
      }))
      this.setState({vaccinationByAge: updatedVaccinationByAge})

      const updatedVaccinationByGender = data.vaccination_by_gender.map(
        each => ({
          gender: each.gender,
          count: each.count,
        }),
      )
      this.setState({vaccinationByGender: updatedVaccinationByGender})
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderResult = () => {
    const {cowinData, vaccinationByAge, vaccinationByGender} = this.state
    return (
      <>
        <div className="bar-chart-container">
          <h1 className="sub-head">Vaccination Coverage</h1>
          <VaccinationCoverage cowinData={cowinData} />
        </div>
        <div className="bar-chart-container">
          <h1 className="sub-head">Vaccination by gender</h1>
          <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        </div>
        <div className="bar-chart-container">
          <h1 className="sub-head">Vaccination by Age</h1>
          <VaccinationByAge vaccinationByAge={vaccinationByAge} />
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderDashboard = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderResult()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="main">
          <nav className="nav-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="nav-heading">Co-WIN</h1>
          </nav>
          <h1 className="heading">CoWIN vaccination in India</h1>
          {this.renderDashboard()}
        </div>
      </div>
    )
  }
}
export default CowinDashboard
