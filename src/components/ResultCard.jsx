import { Parser as HtmlToReactParser } from 'html-to-react'
import { useState, forwardRef, useImperativeHandle } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/ResultCard.css'

const ResultCard = forwardRef((props, refs) => {
  ResultCard.displayName = 'ResultCard'

  const navigate = useNavigate()

  const topic = props.topic
  const [visible, setVisible] = useState(false)
  const htmlContent = topic.Sections.section[0].Content
  const parser = new HtmlToReactParser()
  const reactElement = parser.parse(htmlContent)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const setToVisible = () => {
    setVisible(true)
  }

  const setToHide = () => {
    setVisible(false)
  }

  const handleLearnMore = (topic) => {
    navigate(`/result/${topic.Id}`)
  }

  useImperativeHandle(refs, () => {
    return ({ toggleVisibility, setToHide, setToVisible })
  })

  return (
    <div className="card result-card">
      <div className="card-body">
        <div className="card-title-container d-flex flex-row justify-content-between">
          <h1 className="card-title collapsible d-flex flex-column justify-content-center" onClick={toggleVisibility} style={{ width: '95%', marginBottom: '0', cursor: 'pointer' }}>{topic.Title}</h1>
          {!visible
            ? <p className='d-flex flex-column justify-content-center' onClick={toggleVisibility} style={{ fontSize: '30px', cursor: 'pointer', marginBottom: '0' }}>+</p>
            :  <p className='d-flex flex-column justify-content-center' onClick={toggleVisibility} style={{ fontSize: '30px', cursor: 'pointer', marginBottom: '0' }}>-</p>
          }
        </div>
        {
          visible &&
            <div className="card-content">
              <div className="pt-3">
                {reactElement}
              </div>
              {topic.Sections.section.length >= 2
               && <button className='btn btn-outline-primary' onClick={() => handleLearnMore(topic)}>Learn more</button>}
            </div>
        }
      </div>
    </div>
  )
})

export default ResultCard