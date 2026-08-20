import MotionPortfolio from './components/MotionPortfolio'
import CustomCursor from './components/CustomCursor'
import SmoothScroll from './components/SmoothScroll'
import Chatbot from './components/Chatbot'
import WhatsApp from "./components/WhatsApp";

export default function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <MotionPortfolio />
      <Chatbot />
      <WhatsApp />
    </SmoothScroll>
  )
}