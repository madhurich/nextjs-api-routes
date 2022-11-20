import { getDataFromFile, getFilePath } from '../api/feedback'
import { useState } from 'react'

function Feedback(props) {
    const [feedbackItem, setFeedbackItem] = useState()

    const showDetails = (id) => {
        fetch(`/api/feedback/${id}`)
        .then(res => res.json())
        .then(data => {
            setFeedbackItem(data.feedback)
        })

    }
    return (
        <div>
            {feedbackItem && feedbackItem.feedback}
            {props.feedbackItems.map(item => (
            <li key={item.id}>{item.feedback} <button onClick={() => showDetails(item.id)}>Show Details</button></li>

            )
            )}
        </div>
    )
}

export async function getStaticProps() {
    const data = getDataFromFile(getFilePath())
    return {
        props: {
            feedbackItems: data
        }
    }
}

export default Feedback