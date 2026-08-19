import { useState, useRef, useEffect, useCallback } from 'react'
import {
  FiMessageCircle,
  FiX,
  FiSend
} from 'react-icons/fi'

import './Chatbot.css'
import ReactMarkdown from "react-markdown";

/* =========================================================
   SUGGESTION CHIPS
   ========================================================= */

const SUGGESTIONS = [
  'What technologies do you know?',
  'Tell me about your projects',
  'What is your experience?',
  'Where did you study?',
  'What achievements do you have?'
]

/* =========================================================
   CHATBOT COMPONENT
   ========================================================= */

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showBadge, setShowBadge] = useState(true)
  const [showSuggestions, setShowSuggestions] = useState(true)

  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)
  const hasGreeted = useRef(false)

  /* ---- Auto-scroll on new messages ---- */

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  /* ---- Initial greeting ---- */

  useEffect(() => {
    if (isOpen && !hasGreeted.current) {
      hasGreeted.current = true
      setShowBadge(false)

      setMessages([
        {
          role: 'assistant',
          content:
            "Hey there! 👋 I'm Surya's AI assistant. Ask me anything about his skills, projects, experience, or education — I'm here to help!"
        }
      ])
    }
  }, [isOpen])

  /* ---- Toggle chat window ---- */

  const toggleChat = () => {
    setIsOpen(prev => !prev)

    if (!isOpen) {
      setShowBadge(false)
    }
  }

  /* ---- Send message ---- */

  const sendMessage = async (text) => {
    const content = (text || input).trim()

    if (!content || isLoading) return

    setShowSuggestions(false)
    setInput('')

    /* Add user message */
    const userMsg = { role: 'user', content }

    setMessages(prev => [...prev, userMsg])

    /* Prepare conversation history for API */
    const conversationHistory = [
      ...messages.filter(m => m.role !== 'system'),
      userMsg
    ].map(m => ({
      role: m.role,
      content: m.content
    }))

    setIsLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationHistory
        })
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply || "I couldn't process that. Try asking something about Surya!"
        }
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Oops! I'm having trouble connecting right now. Please try again in a moment. 🔄"
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  /* ---- Handle Enter key ---- */

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  /* ---- Auto-resize textarea ---- */

  const handleInputChange = (e) => {
    setInput(e.target.value)

    const textarea = textareaRef.current

    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height =
        Math.min(textarea.scrollHeight, 100) + 'px'
    }
  }

  /* ---- Suggestion chip click ---- */

  const handleSuggestion = (text) => {
    sendMessage(text)
  }

  return (
    <>
      {/* ================================
          FLOATING TRIGGER BUTTON
      ================================= */}

      <button
        className={`chatbot-trigger ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
        aria-label={
          isOpen
            ? 'Close chat'
            : 'Chat with Surya\'s AI'
        }
        id="chatbot-trigger-btn"
      >
        {isOpen ? (
          <FiX />
        ) : (
          <FiMessageCircle />
        )}

        {showBadge && !isOpen && (
          <span className="chatbot-badge">
            1
          </span>
        )}
      </button>


      {/* ================================
          CHAT WINDOW
      ================================= */}

      <div
        className={`chatbot-window ${
          isOpen ? 'visible' : ''
        }`}
        id="chatbot-window"
        role="dialog"
        aria-label="Chat with Surya's AI assistant"
        data-lenis-prevent
      >

        {/* ---- Header ---- */}

        <div className="chatbot-header">
          <div className="chatbot-avatar">
            SK
          </div>

          <div className="chatbot-header-info">
            <h3>Surya's AI Assistant</h3>

            <p>
              <span className="chatbot-status-dot" />
              Ask me about Surya
            </p>
          </div>

          <button
            className="chatbot-close-btn"
            onClick={toggleChat}
            aria-label="Close chat"
          >
            <FiX size={18} />
          </button>
        </div>


        {/* ---- Messages ---- */}

        <div
          className="chatbot-messages"
          id="chatbot-messages"
          data-lenis-prevent
        >
          {messages.map((msg, i) => (
            <div
              className={`chatbot-msg ${msg.role === 'user' ? 'user' : 'bot'}`}
              key={i}
            >
              <div className="chatbot-msg-icon">
                {msg.role === 'user'
                  ? '✦'
                  : 'SK'}
              </div>

              <div className="chatbot-msg-bubble">
              <ReactMarkdown>
               {msg.content}
              </ReactMarkdown>
              </div>
            </div>
          ))}

          {/* Typing indicator */}

          {isLoading && (
            <div className="chatbot-typing">
              <div className="chatbot-msg-icon" style={{
                background: 'linear-gradient(135deg, #7de3ed 0%, #4dc8d4 100%)',
                color: '#0b151a',
                fontWeight: 800,
                width: 28,
                height: 28,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                flexShrink: 0
              }}>
                SK
              </div>

              <div className="chatbot-typing-dots">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>


        {/* ---- Suggestion chips ---- */}

        {showSuggestions && messages.length <= 1 && (
          <div className="chatbot-suggestions">
            {SUGGESTIONS.map((text, i) => (
              <button
                className="chatbot-chip"
                key={i}
                onClick={() => handleSuggestion(text)}
              >
                {text}
              </button>
            ))}
          </div>
        )}


        {/* ---- Input area ---- */}

        <div className="chatbot-input-area">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Surya..."
            rows={1}
            disabled={isLoading}
            aria-label="Type your message"
            id="chatbot-input"
          />

          <button
            className="chatbot-send-btn"
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
            id="chatbot-send-btn"
          >
            <FiSend />
          </button>
        </div>


        {/* ---- Powered by footer ---- */}

        <div className="chatbot-powered">
          POWERED BY AI • SURYA'S PORTFOLIO
        </div>

      </div>
    </>
  )
}
