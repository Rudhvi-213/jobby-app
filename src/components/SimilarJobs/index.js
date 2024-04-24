import SimilarJobItem from '../SimilarJobItem'

const SimilarJobs = props => {
  const {similarJobs} = props

  return (
    <div>
      <h1>Similar jobs</h1>
      <ul>
        {similarJobs.map(eachJob => (
          <SimilarJobItem similarJobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    </div>
  )
}

export default SimilarJobs
