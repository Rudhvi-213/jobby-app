import './index.css'

const Skills = props => {
  const {skills} = props
  return (
    <div>
      <h1>Skills</h1>
      <ul className="skill_list_container">
        {skills.map(eachSkill => (
          <li className="skill_list" key={eachSkill.name}>
            <div className="skill_icon_container">
              <img
                height="80px"
                src={eachSkill.imageUrl}
                alt={eachSkill.name}
              />
              <p>{eachSkill.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Skills
