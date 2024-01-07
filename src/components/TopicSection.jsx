import { Parser as HtmlToReactParser } from 'html-to-react'

const TopicSection = ({ section }) => {
  const parser = new HtmlToReactParser()
  const htmlContent = section.Content
  const reactElement = parser.parse(htmlContent)


  return (
    <div>
      <h2>{section.Title}</h2>
      {reactElement}
    </div>
  )
}

export default TopicSection