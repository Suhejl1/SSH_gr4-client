import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, List, ListItem, ListItemText } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState({});
  const history = useHistory();

  const token = sessionStorage.getItem('token');
  const isLoggedIn = !!token;
  const isAdmin = sessionStorage.getItem('role') === 'ADMIN';
  const isMaster = sessionStorage.getItem('role') === 'MASTER';


  console.log('Token:', token);
  console.log('Is logged in:', isLoggedIn);

  axios.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        console.log("Bearer token:", token);
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const fetchFaqs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/faq`);
      setFaqs(response.data);
    } catch (error) {
      console.error('Error fetching FAQs', error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('You must be logged in to submit a question.');
      console.log('User not logged in');
      history.push('/login');
      return;
    }
    try {
      console.log('Submitting question:', question);
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/faq`, { question, answer: '' });
      setQuestion('');
      alert('Question submitted successfully!');
      console.log('Response:', response.data);
      fetchFaqs();
    } catch (error) {
      console.error('Error submitting question:', error.response ? error.response.data : error.message);
      alert('There was an error submitting your question. Please try again.');
    }
  };

  const handleAnswerChange = (faqId, value) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [faqId]: value }));
  };

  const handleAnswerSubmit = async (faqId) => {
    try {
      console.log('Submitting answer:', answers[faqId]);
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/v1/faq/${faqId}`, { answer: answers[faqId] });
      setAnswers((prevAnswers) => ({ ...prevAnswers, [faqId]: '' }));
      alert('Answer submitted successfully!');
      console.log('Response:', response.data);
      fetchFaqs();
    } catch (error) {
      console.error('Error submitting answer:', error.response ? error.response.data : error.message);
      alert('There was an error submitting your answer. Please try again.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>
      <List>
        {faqs.map((faq) => (
          <ListItem key={faq.id}>
            <ListItemText 
              primary={<span style={{ fontWeight: 'bold', fontSize: '14px' }}>{faq.question}</span>}
              secondary={<span style={{ fontSize: '12px' }}>{faq.answer}</span>}
            />
            {(isAdmin || isMaster) && !faq.answer && (
              <form onSubmit={(e) => { e.preventDefault(); handleAnswerSubmit(faq.id); }}>
                <TextField
                  label="Answer"
                  value={answers[faq.id] || ''}
                  onChange={(e) => handleAnswerChange(faq.id, e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                  Submit Answer
                </Button>
              </form>
            )}
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Your Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Question
        </Button>
      </form>
    </Container>
  );
};

export default Faq;
