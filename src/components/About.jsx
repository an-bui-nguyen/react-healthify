const About = () => {

  return (
    <div>
      <div className="px-4 py-5 my-5 text-center">
        <img className="d-block mx-auto mb-2" src='./assets/health-health.png' alt="" width="100" height="100"></img>
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