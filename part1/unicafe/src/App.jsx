import { useState } from 'react'

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={props.good} />
          <StatisticLine text={"neutral"} value={props.neutral} />
          <StatisticLine text={"bad"} value={props.bad} />
          <StatisticLine text={"total"} value={props.total} />
          <StatisticLine text={"average"} value={props.average} />
          <StatisticLine text={"positive"} value={props.positive} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [ feedback, setFeedback ] = useState({
    good: 0, neutral: 0, bad: 0
  })

  // map for feedback values
  const feedbackValues = new Map([
    ["good", 1],
    ["neutral", 0],
    ["bad", -1],
  ])
  
  const [ feedbackValueTotal, setFeedbackValueTotal ] = useState(0)
  const [ total, setTotal ] = useState(0)
  const [ average, setAverage ] = useState(0)
  const [ positive, setPositive ] = useState(0)
  
  // helper functions
  const calculateAverage = (feedbackValueTotal, count) => feedbackValueTotal / count
  const calculatePositive = (negative, count) => (count - negative) / count * 100


  const increaseGood = () => {
    console.log('adding good, old value', feedback.good)
    const newGood = feedback.good + 1
    const newTotal = newGood + feedback.neutral + feedback.bad
    const newFeedbackValueTotal = feedbackValueTotal + feedbackValues.get("good")

    const newFeedback = {
      ...feedback,
      good: newGood
    }

    setFeedback(newFeedback)
    setTotal(newTotal)
    setFeedbackValueTotal(newFeedbackValueTotal)

    setAverage(calculateAverage(newFeedbackValueTotal, newTotal))
    setPositive(calculatePositive(feedback.neutral + feedback.bad, newTotal))
  }

  const increaseNeutral = () => {
    console.log('adding neutral, old value', feedback.neutral)
    const newNeutral = feedback.neutral + 1
    const newTotal = feedback.good + newNeutral + feedback.bad
    const newFeedbackValueTotal = feedbackValueTotal + feedbackValues.get("neutral")
    
    const newFeedback = {
      ...feedback,
      neutral: newNeutral
    }
    
    setFeedback(newFeedback)
    setTotal(newTotal)
    setFeedbackValueTotal(newFeedbackValueTotal)

    setAverage(calculateAverage(newFeedbackValueTotal, newTotal))
    setPositive(calculatePositive(newNeutral + feedback.bad, newTotal))
  }

  const increaseBad = () => {
    console.log('adding bad, old value', feedback.bad)
    const newBad = feedback.bad + 1
    const newTotal = feedback.good + feedback.neutral + newBad
    const newFeedbackValueTotal = feedbackValueTotal + feedbackValues.get("bad")
    
    const newFeedback = {
      ...feedback,
      bad: newBad
    }

    setFeedback(newFeedback)
    setTotal(newTotal)
    setFeedbackValueTotal(newFeedbackValueTotal)

    setAverage(calculateAverage(newFeedbackValueTotal, newTotal))
    setPositive(calculatePositive(feedback.neutral + newBad, newTotal))
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} text={"good"} />
      <Button onClick={increaseNeutral} text={"neutral"} />
      <Button onClick={increaseBad} text={"bad"} />

      <Statistics good={feedback.good} neutral={feedback.neutral} bad={feedback.bad} total={total} average={average} positive={positive} />
    </div>
  )
}

export default App