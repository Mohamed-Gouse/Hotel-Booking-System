import React from 'react'

function MessageInput({ handleSendMessage, currentMessage, setCurrentMessage }) {
    return (
      <form onSubmit={handleSendMessage}>
        <div className="form-group my-1">
          <input
            type="text"
            className="form-control"
            placeholder="Enter the message to send"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
        </div>
        <div className="text-right">
          <input type="submit" value="Send" className="btn btn-primary" />
        </div>
      </form>
    );
  }

export default MessageInput