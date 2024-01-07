const Contact = () => {
  const style = {
    maxWidth: '300px',
    height: '200px',
    margin: '0',
    width: '270px'
  }
  return (
    <div className="px-4 py-5 my-5 text-center">
      <img src="https://media0.giphy.com/media/maNB0qAiRVAty/giphy.gif" className="r48jcc pT0Scc iPVvYb" style={style} alt="Cat-using-computer GIFs - Get the best GIF on GIPHY"></img>
      <h1 className="fw-light" style={{ marginTop: '3rem' }}>Contact Me!</h1>
      <p className="lead mb-4 px-4">If you're interested in contributing to the project, don't hesitate to make a pull request to the project's <a href="https://github.com/an-bui-nguyen/react-healthify.git">repo</a>.</p>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <a href="mailto:phuong20102@gmail.com"><button type="button" className="btn btn-primary btn-lg px-4 gap-3">Send me an email</button></a>
      </div>
    </div>
  )
}

export default Contact