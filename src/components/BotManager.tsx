import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addResponse, deleteResponse } from '../features/bot/botSlice';
import { RootState } from '../store/storeTypes';
import { analyzeText } from '../api/nlpService';
import './BotManager.scss';

const BotManager = () => {
  const [keyword, setKeyword] = useState('');
  const [response, setResponse] = useState('');
  const dispatch = useDispatch();
  const botResponses = useSelector((state: RootState) => state.bot.responses);

  const handleAddResponse = () => {
    dispatch(addResponse({ id: Date.now().toString(), keyword, response }));
    setKeyword('');
    setResponse('');
  };

  const handleAnalyze = async () => {
    console.log("Analyzing text:", keyword);
    const result = await analyzeText(keyword);
    console.log("Result:", result);
    setResponse(result ?? '');
  };

  return (
    <div className="container">
      <h1>Manage Bot Responses</h1>
      <div>
        <input
          type="text"
          placeholder="Keyword"
          value={keyword || ''}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Response"
          value={response || ''}
          onChange={(e) => setResponse(e.target.value)}
        />
        <button onClick={handleAddResponse}>Add Response</button>
        <button onClick={handleAnalyze}>Analyze Text</button>
      </div>
      <ul>
        {botResponses.map((item) => (
          <li key={item.id}>
            <strong>{item.keyword}</strong> {item.response}
            <div>
              <button className="delete-btn" onClick={() => dispatch(deleteResponse(item.id))}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BotManager;