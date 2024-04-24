import ProfileSection from '../ProfileSection'
import './index.css'

const typeList = {}

const JobFilterSection = props => {
  const {
    changeEmploymentType,
    changeSalaryRange,
    activeSalaryTag,
    employmentTypesList,
    salaryRangesList,
  } = props

  const handleTypeChanges = event => {
    const {value, checked} = event.target
    if (checked) {
      typeList[value] = checked
    } else {
      typeList[value] = checked
    }
    const filteredKeys = Object.keys(typeList).filter(
      key => typeList[key] === true,
    )

    const updatedEmploymentTypes = filteredKeys.join(',')

    changeEmploymentType(updatedEmploymentTypes)
  }

  const handleSalaryRangeChanges = event => {
    const newSalaryTag = event.target.value
    changeSalaryRange(newSalaryTag)
  }

  return (
    <div className="job_filter_container">
      <ProfileSection />
      <hr />
      <div>
        <h1>Type of Employment</h1>
        <ul>
          {employmentTypesList.map(eachType => (
            <li key={eachType.employmentTypeId}>
              <input
                value={eachType.employmentTypeId}
                type="checkbox"
                id={eachType.employmentTypeId}
                onChange={handleTypeChanges}
              />
              <label htmlFor={eachType.employmentTypeId}>
                {eachType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div>
        <h1>Salary Range</h1>
        <ul>
          {salaryRangesList.map(eachType => (
            <li key={eachType.salaryRangeId}>
              <input
                value={eachType.salaryRangeId}
                type="radio"
                checked={activeSalaryTag === eachType.salaryRangeId}
                id={eachType.salaryRangeId}
                onChange={handleSalaryRangeChanges}
              />
              <label htmlFor={eachType.salaryRangeId}>{eachType.label}</label>
            </li>
          ))}
        </ul>
      </div>
      <hr />
    </div>
  )
}

export default JobFilterSection
