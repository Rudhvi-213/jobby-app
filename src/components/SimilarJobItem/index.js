const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = similarJobDetails
  return (
    <li>
      <div className="job_details_container">
        <div className="role_thumbnail">
          <div className="image_role_rating_container">
            <img src={companyLogoUrl} alt="similar job company logo" />
            <div>
              <h1>{title}</h1>
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
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
