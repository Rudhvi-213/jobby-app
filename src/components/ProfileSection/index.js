import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileSection extends Component {
  state = {jobDetails: '', apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getProfileDetails()
  }

  formatData = profile => ({
    name: profile.name,
    profileImageUrl: profile.profile_image_url,
    shortBio: profile.short_bio,
  })

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = this.formatData(fetchedData.profile_details)

      this.setState({
        jobDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <button onClick={this.getProfileDetails} type="button">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {jobDetails} = this.state
    const {name, profileImageUrl, shortBio} = jobDetails
    return (
      <div className="">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="profile_heading">{name}</h1>
        <p className="profile_para">{shortBio}</p>
      </div>
    )
  }

  switchApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="Profile_container">{this.switchApiStatus()}</div>
  }
}

export default ProfileSection
