import './App.css';
import {useState, useEffect} from 'react'

function App() {

  const [polls, setPolls] = useState([])

  useEffect( async () => {
    const polls = await fetch('http://localhost:3030/api/polls?page=6').then($ => $.json())
    setPolls(polls.data)
  }, [])


  const submitVote = async (e, pollId) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const entries = {}
    for (var pair of formData.entries()) {
      entries.pollId = pair[0]
      entries.optionId = pair[1]
    }
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    }
    const result = await fetch(`http://localhost:3030/api/poll/${entries.pollId}/vote/${entries.optionId}`, requestOptions)
      .then($ => $.json())
    if (result === 'done') {
      setPolls(polls => {
        const poll = polls.filter($ => $.pollId === entries.pollId)
        poll.map($ => $.optionId === entries.optionId && $.votes++ )
      })
    }
  }

  return (
    <div>
      <h1>Poll Application</h1>
      {
        polls.map((poll) => {
          return (
            <div key={poll._id}>
              <h2>{poll.title}</h2>
              <form onSubmit={(e) => submitVote(e, poll._id)}>
                <ul>
                  {
                    poll.options.map((option) => {
                      return (
                        <li key={option._id}>
                          <input type="radio" name={poll._id} id={option._id} value={option._id} />
                          <label htmlFor={option._id}>
                            {option.option} <span>({option.votes} votes so far)</span>
                          </label>
                        </li>
                      )
                    })
                  }
                  <button>Submit Vote</button>
                </ul>
              </form>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
