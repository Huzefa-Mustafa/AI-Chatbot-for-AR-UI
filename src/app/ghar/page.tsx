"use client";

import { useState } from "react";

export default function Ghar() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "You", text: input }]);
    setInput(""); // Clear input
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Chat Box */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-xl font-bold mb-2 text-gray-800">AI for Academic Research</h1>
        <div className="h-64 overflow-y-auto border rounded p-3 bg-gray-50">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center">No messages yet.</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded-lg ${
                  msg.sender === "You" ? "bg-blue-500 text-white self-end" : "bg-gray-300"
                }`}
              >
                <span className="font-semibold">{msg.sender}:</span> {msg.text}
              </div>
            ))
          )}
        </div>

        {/* Chat Input */}
        <div className="flex mt-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 border rounded-l-md focus:outline-none"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r-md">
            Send
          </button>
        </div>
      </div>

      {/* File Upload */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 mt-4">
        <h2 className="text-lg font-bold mb-2 text-gray-800">Upload Your Research PDF</h2>
        <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-2" />
        {selectedFile && <p className="text-sm text-gray-600">Selected: {selectedFile.name}</p>}
      </div>
    </div>
  );
}
