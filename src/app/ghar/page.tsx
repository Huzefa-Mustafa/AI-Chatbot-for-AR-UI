// app/ghar.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';

const Ghar = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [context, setContext] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  // Handle PDF file upload
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
    }
  };

  // Handle summary request
  const handleSummarize = async () => {
    if (!pdfFile) return;

    const formData = new FormData();
    formData.append('file', pdfFile);

    try {
      const response = await axios.post('http://localhost:8000/summarize', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error summarizing PDF:', error);
    }
  };

  // Handle Q&A request
  const handleAsk = async () => {
    if (!question || !context) return;

    try {
      const response = await axios.post('http://localhost:8000/ask', {
        context,
        question,
      },{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error asking question:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Academic AI Chatbot</h1>

      {/* PDF Upload Section */}
      <div className="mb-4">
        <input type="file" onChange={handlePdfChange} accept="application/pdf" />
        <button
          onClick={handleSummarize}
          className="bg-blue-500 text-white py-2 px-4 mt-2"
        >
          Summarize PDF
        </button>
      </div>

      {/* Display PDF Summary */}
      {summary && (
        <div className="mt-4 p-4 border border-gray-300">
          <h2 className="text-xl font-semibold">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}

      {/* Q&A Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Ask a Question</h2>
        <textarea
          className="w-full p-2 border border-gray-300 mb-2"
          rows={4}
          placeholder="Enter the context here"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        ></textarea>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 mb-2"
          placeholder="Ask a question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={handleAsk}
          className="bg-green-500 text-white py-2 px-4"
        >
          Ask
        </button>
      </div>

      {/* Display Q&A Answer */}
      {answer && (
        <div className="mt-4 p-4 border border-gray-300">
          <h2 className="text-xl font-semibold">Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Ghar;
