import { useParams, useNavigate } from 'react-router-dom'
import { Parser as HtmlToReactParser } from 'html-to-react'
import { CircularProgress } from '@mui/material'
import { getTopicById } from '../services/healthInfo'
import { useEffect, useState } from 'react'
import TopicSection from './TopicSection'


const TopicPage = () => {
  const [topic, setTopic] = useState(null)
  const id = useParams().id

  useEffect(() => {
    getTopicById(id).then(result => {setTopic(result)})
  }, [])


  if (!topic) {
    return (
      <div className='body-center'>
        <CircularProgress></CircularProgress>
        <p style={{ textAlign:'center', color: '#747474', marginTop: '1rem' }}>Fetching more information...</p>
      </div>
    )
  }

  return (
    <div className='body-top' id='topic-info'>
      <img className="d-block mx-auto" style={{ marginTop: '2rem' }} src='./assets/health-health.png' alt="" width="100" height="100"></img>
      <div style={{ marginTop: '2rem' }}>
        <div className="card result-card">
          <div className="card-body">
            <div className="card-title-container d-flex flex-row justify-content-between">
              <h1 className="card-title" style={{ width: '100%', marginBottom: '0', textAlign: 'center', padding: '1rem 0 0 0' }}>{topic.Title}</h1>
            </div>
            <div className="card-content">
              <div className="pt-3">
                {topic.Sections.section.map((section, index) => {
                  return (
                    <TopicSection section={section} id={id} key={index}/>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopicPage