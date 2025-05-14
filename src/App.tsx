import './App.css'
import NovelEditor from './components/NovelEditor'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // Add dark class to html element
    document.documentElement.classList.add('dark')
  }, [])

  return <NovelEditor />
}

export default App
