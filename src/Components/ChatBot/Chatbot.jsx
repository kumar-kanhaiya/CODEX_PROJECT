import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Chatbot.css'; // Chatbot ke styles ke liye

const Chatbot = () => {
  // Chatbot ki state manage kar rahe hain
  const [isOpen, setIsOpen] = useState(false); // Chat window open/close
  const [messages, setMessages] = useState([]); // Messages array - localStorage se load karenge
  const [inputMessage, setInputMessage] = useState(''); // User input
  const [isTyping, setIsTyping] = useState(false); // Typing indicator
  const [copiedCode, setCopiedCode] = useState(''); // Copy status track karne ke liye
  const [userName, setUserName] = useState(''); // User ka naam store karne ke liye
  const messagesEndRef = useRef(null); // Scroll reference

  // Messages ke bottom tak scroll karne ke liye
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Messages change hone par auto scroll
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Component mount hone par localStorage se data load karo
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatbot-messages');
    const savedUserName = localStorage.getItem('chatbot-user-name');

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Default welcome message
      const welcomeMessage = { text: "Hello! I'm CODEx, your coding assistant. How can I help you with programming today?", sender: 'bot' };
      setMessages([welcomeMessage]);
    }

    if (savedUserName) {
      setUserName(savedUserName);
    }
  }, []);

  // Messages ya userName change hone par localStorage update karo
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbot-messages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem('chatbot-user-name', userName);
    }
  }, [userName]);

  // Chat window toggle karne ke liye
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Code copy karne ke liye function
  const copyToClipboard = async (codeText, codeId) => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopiedCode(codeId);
      // 2 second ke baad copy status reset karo
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // Message send karne ka function
  const handleSendMessage = async () => {
    // Empty message check
    if (inputMessage.trim() === '') return;

    // Check karo ki user ne apna naam bataya hai ya nahi
    const lowerInput = inputMessage.toLowerCase();
    if (!userName && (lowerInput.includes('my name is') || lowerInput.includes('i am') || lowerInput.includes('i\'m'))) {
      // Name extract karo
      let extractedName = '';
      if (lowerInput.includes('my name is')) {
        extractedName = inputMessage.split('my name is')[1].trim();
      } else if (lowerInput.includes('i am')) {
        extractedName = inputMessage.split('i am')[1].trim();
      } else if (lowerInput.includes('i\'m')) {
        extractedName = inputMessage.split('i\'m')[1].trim();
      }

      if (extractedName) {
        setUserName(extractedName);
      }
    }

    // User message add karo
    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // API key check karo
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      setMessages(prev => [...prev, {
        text: 'Please set your Gemini API key in the .env file. Get it from Google AI Studio.',
        sender: 'bot'
      }]);
      setIsTyping(false);
      return;
    }

    // API call karne se pehle credential check kar rahe hain

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are CODEx, an intelligent coding assistant.

Your purpose:
- Help users with programming, debugging, errors, algorithms, and computer science concepts.
- Allow natural conversation (e.g., greetings, introductions like "my name is Mohan") but always guide the discussion back toward coding topics.
- Be friendly, clear, and concise in your explanations.
- Address users by their name if they have introduced themselves.

When explaining:
- Always give correct code and explain it in easy, beginner-friendly language.
- Avoid complex jargon unless you clearly explain it.
- Keep answers short, direct, and logical.
- Use examples when it helps understanding.
- Format code blocks properly using Markdown syntax (e.g., \`\`\`language\ncode\n\`\`\`).

If a user asks about "CODEx":
  Say:
  "CODEx is a focused coding learning platform that provides simplified coding notes, clear explanations, and a distraction-free coding path. Its main goal is to help learners master coding through structured, focused study without confusion or overload."

If a user asks about the developer or creator of CODEx:
  Say:
  "CODEx was developed by Kanhaiya Kumar.
  Email: kanhaiyakumarmailme@gmail.com
  GitHub: https://github.com/kumar-kanhaiya"

Behavior rules:
- Accept casual or polite user messages (like introductions or greetings).
- Politely redirect unrelated or off-topic questions toward coding.
- Never generate offensive or irrelevant content.
- Maintain a professional, helpful tone at all times.
- If the user has introduced themselves, address them by their name in responses.

${userName ? `User's name: ${userName}` : ''}
User message: ${inputMessage}`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // API response check karo aur bot message add karo
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        const botResponse = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Error:', error);
      // Error message set karo based on error type
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      if (error.message.includes('API request failed')) {
        errorMessage = 'API request failed. Please check your API key and try again.';
      } else if (error.message.includes('Invalid response format')) {
        errorMessage = 'Received invalid response from API. Please try again.';
      }
      setMessages(prev => [...prev, { text: errorMessage, sender: 'bot' }]);
    } finally {
      // Typing indicator off karo
      setIsTyping(false);
    }
  };

  // Enter key press par message send karne ke liye
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // JSX return kar rahe hain
  return (
    <>
      {/* Chatbot Icon - floating button */}
      <div className="chatbot-icon" onClick={toggleChat}>
        💬
      </div>

      {/* Chat Window - jab open ho */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header section */}
          <div className="chatbot-header">
            <h3>CODEx Assistant {userName && `- ${userName}`}</h3>
            <button className="close-btn" onClick={toggleChat}>×</button>
          </div>

          {/* Messages area */}
          <div className="chatbot-messages">
            {/* Messages map kar ke display kar rahe hain */}
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-bubble">
                  {/* Markdown rendering ke liye ReactMarkdown use kar rahe hain */}
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        // Code blocks ke liye syntax highlighting
                        const match = /language-(\w+)/.exec(className || '');
                        const codeText = String(children).replace(/\n$/, '');
                        const codeId = `${index}-${match ? match[1] : 'inline'}`;

                        return !inline && match ? (
                          <div className="code-block-container">
                            <SyntaxHighlighter
                              style={oneDark}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {codeText}
                            </SyntaxHighlighter>
                            <button
                              className="copy-button"
                              onClick={() => copyToClipboard(codeText, codeId)}
                              title="Copy code"
                            >
                              {copiedCode === codeId ? '✓' : '📋'}
                            </button>
                          </div>
                        ) : (
                          // Inline code ke liye simple code tag
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {/* Typing indicator */}
            {isTyping && (
              <div className="message bot">
                <div className="message-bubble typing">
                  ...
                </div>
              </div>
            )}
            {/* Scroll reference */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input section */}
          <div className="chatbot-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about coding..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
