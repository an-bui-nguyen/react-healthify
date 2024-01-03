const About = () => {

  const ListComponent = ({ heading, content }) => {
    return (
      <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
        <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" className="rounded-circle flex-shrink-0"></img>
        <div className="d-flex gap-2 w-100 justify-content-between">
          <div>
            <h6 className="mb-0">List group item heading</h6>
            <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
          </div>
          <small className="opacity-50 text-nowrap">now</small>
        </div>
      </a>
    )
  }

  return (
    <div>
      <div className="px-4 py-5 my-5 text-center">
        <img className="d-block mx-auto mb-2" src='src/assets/health-health.png' alt="" width="100" height="100"></img>
        <h1 className="display-5 fw-bold text-body-emphasis">Healthify</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Healthify uses evidence-based information from the United States Department of Health and Human Services <a href="https://health.gov/myhealthfinder">MyHealthFinder</a> to provide information about preventative medicine.</p>
        </div>
      </div>
      <div className="list-group">
      </div>
    </div>
  )
}

export default About