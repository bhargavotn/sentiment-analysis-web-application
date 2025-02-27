import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ANALYZE_SENTIMENT = gql`
  mutation AnalyzeSentiment($text: String!) {
    analyzeSentiment(text: $text) {
      label
      score
    }
  }
`;

function App() {
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState<{ label: string; score: number } | null>(null);
  const [analyze, { loading, error }] = useMutation(ANALYZE_SENTIMENT, {
    onCompleted: (data) => {
      setPrediction(data.analyzeSentiment);
    },
  });

  const handleSubmit = () => {
    if (text.trim()) {
      analyze({ variables: { text } });
    } else {
      alert('Please enter some text');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Sentiment Analysis</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here (up to 10,000 characters)"
        rows={5}
        cols={50}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button onClick={handleSubmit} disabled={loading} style={{ padding: '10px 20px' }}>
        Analyze
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {prediction && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Sentiment:</strong> {prediction.label}</p>
          <p><strong>Score:</strong> {prediction.score.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
}
export default App;