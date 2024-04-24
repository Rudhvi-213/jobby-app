import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import JobFilterSection from '../JobFilterSection'
import JobItem from '../JobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    filteredJobsList: [],
    activeEmploymentId: '',
    activeSalaryRangeId: '',
    searchInput: '',
  }

  componentDidMount = () => {
    this.getFilteredJobs()
  }

  changeEmploymentType = activeEmploymentId => {
    this.setState({activeEmploymentId}, this.getFilteredJobs)
  }

  changeSalaryRange = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getFilteredJobs)
  }

  renderNoJobFound = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderFilteredJobs = () => {
    const {filteredJobsList} = this.state

    if (filteredJobsList.length === 0) {
      return this.renderNoJobFound()
    }
    return (
      <ul>
        {filteredJobsList.map(eachJob => (
          <JobItem key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  getFilteredJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeEmploymentId, activeSalaryRangeId, searchInput} = this.state
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentId}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(jobsApiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        filteredJobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => this.getFilteredJobs()

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button onClick={this.getFilteredJobs} type="button">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCheckApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderFilteredJobs()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getFilteredJobs()
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput, activeSalaryRangeId} = this.state

    return (
      <>
        <Header />
        <div className="jobs_route_container">
          <JobFilterSection
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
            activeSalaryTag={activeSalaryRangeId}
          />
          <div className="render_container">
            <div className="search-input-container">
              <input
                value={searchInput}
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />

              <button
                data-testid="searchButton"
                onClick={this.getFilteredJobs}
                type="button"
              >
                Search
              </button>

              <BsSearch className="search-icon" />
            </div>
            {this.renderCheckApiStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
