import MotionPortfolio from './components/MotionPortfolio'
import CustomCursor from './components/CustomCursor'
import SmoothScroll from './components/SmoothScroll'
import Chatbot from './components/Chatbot'

export default function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <MotionPortfolio />
      <Chatbot />
    </SmoothScroll>
  )
}