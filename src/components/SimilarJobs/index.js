import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const SimilarJobs = props => {
  const {similarJobs} = props

  return (
    <div className="similar_jobs_container">
      <h1 className="similar_jobs_heading">Similar jobs</h1>
      <ul className="similar_jobs_list_container">
        {similarJobs.map(eachJob => (
          <SimilarJobItem similarJobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    </div>
  )
}

export default SimilarJobs
