import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const [feedbackItems, setFeedbackItems] = useState()

  const submitHandler = (event) => {
    event.preventDefault();
    const reqBody = {
      email: emailInputRef.current.value,
      feedback: feedbackInputRef.current.value
    }
    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => console.log(data))
  };

  const loadFeedback = () => {
    fetch('/api/feedback').then(res => res.json())
      .then(data => {
        setFeedbackItems(data.feedback)
      })
  }

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea rows="5" ref={feedbackInputRef} />
        </div>

        <button>Send Feedback</button>
      </form>
      <hr/>
      <button onClick={loadFeedback}>Load Feedback</button>
      {feedbackItems?.map((item) => (
        <li key={item.id}>{item.id} - {item.email} - {item.feedback}</li>
      ))}
    </div>
  );
}
