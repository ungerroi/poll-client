import './App.css';
import {useState, useEffect} from 'react'

function App() {

  const [polls, setPolls] = useState([])

  useEffect( async () => {
    const polls = await fetch('http://localhost:3030/api/polls')
    setPolls(polls)
  }, [])

  return (
    <div>
      {
        polls.data.map((poll) => {
          return (
            <div key={poll._id}>
              <h2>poll.title</h2>
              <ul>
                {
                  poll.options.map((option) => {
                    return (
                      <li key={option._id}>
                        {option.option} <span>{option.votes}</span>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
