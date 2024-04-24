const Skills = props => {
  const {skills} = props
  return (
    <div>
      <h1>Skills</h1>
      <ul>
        {skills.map(eachSkill => (
          <li key={eachSkill.name}>
            <div>
              <img src={eachSkill.imageUrl} alt={eachSkill.name} />
              <p>{eachSkill.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Skills
