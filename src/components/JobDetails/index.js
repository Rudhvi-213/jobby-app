import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, jobDetailsIem: {}}

  componentDidMount = () => this.getJobDetails()

  formatLife = data => ({
    description: data.description,
    imageUrl: data.image_url,
  })

  formatJobDetailsData = jsonData => ({
    companyLogoUrl: jsonData.company_logo_url,
    companyWebsiteUrl: jsonData.company_website_url,
    employmentType: jsonData.employment_type,
    id: jsonData.id,
    title: jsonData.title,
    jobDescription: jsonData.job_description,
    skills: jsonData.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
    lifeAtCompany: this.formatLife(jsonData.life_at_company),
    location: jsonData.location,
    packagePerAnnum: jsonData.package_per_annum,
    rating: jsonData.rating,
  })

  generateGetRequest = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props

    const {params} = match

    const {id, title} = params

    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = {}
      updatedData.jobDetails = this.formatJobDetailsData(
        fetchedData.job_details,
      )
      updatedData.similarJobs = fetchedData.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      updatedData.jobDetails.title = title

      this.setState({
        jobDetailsIem: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderDetailedJob = () => {
    const {jobDetailsIem} = this.state
    const {jobDetails} = jobDetailsIem
    const {
      skills,
      title,
      companyLogoUrl,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      lifeAtCompany,
      companyWebsiteUrl,
    } = jobDetails
    return (
      <div className="job_details_container">
        <div className="role_thumbnail">
          <div className="image_role_rating_container">
            <img src={companyLogoUrl} alt="job details company logo" />
            <div>
              <h1>{title} </h1>
              <div>
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="location_type_package_container">
            <div className="location_type_container">
              <div>
                {/* <icon /> */}
                <p>{location}</p>
              </div>
              <div>
                {/* <icon /> */}
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <div>
          <div>
            <h1>Description</h1>
            <a href={companyWebsiteUrl}>Visit</a>
          </div>
          <p>{jobDescription}</p>
        </div>
        <Skills skills={skills} />
        <div>
          <h1>Life at Company</h1>
          <div>
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
      </div>
    )
  }

  successJobDetails = () => {
    const {jobDetailsIem} = this.state
    const {similarJobs} = jobDetailsIem
    return (
      <>
        {this.renderDetailedJob()}
        <SimilarJobs similarJobs={similarJobs} />
      </>
    )
  }

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
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={this.generateGetRequest} type="button">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobDetailsApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobDetailsApiStatus()}
      </>
    )
  }
}

export default JobDetails
