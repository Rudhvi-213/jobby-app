import {Link} from 'react-router-dom'
import './index.css'
import {FaStar} from 'react-icons/fa'
import {MdWork} from 'react-icons/md'
import {IoLocationSharp} from 'react-icons/io5'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="similar_jobs_list">
      <Link to={`/jobs/${id}`} className="job_item_link">
        <div className="job_details_container">
          <div className="role_thumbnail">
            <div className="image_role_rating_container">
              <img height="80px" src={companyLogoUrl} alt="company logo" />
              <div className="role_rating_heading">
                <h1>{title}</h1>
                <div className="icon_container">
                  <FaStar className="star_icon" />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="description_container">
            <h1 className="description_heading">Description</h1>
            <p className="description_para">{jobDescription}</p>
          </div>
          <div className="location_type_package_container">
            <div className="location_type_container">
              <div className="icon_container">
                <IoLocationSharp className />
                <p>{location}</p>
              </div>
              <div className="icon_container">
                <MdWork />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default SimilarJobItem
