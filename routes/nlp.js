// const express = require('express');
// const natural = require('natural');
// const aposToLexForm = require('apos-to-lex-form');
// const SpellCorrector = require('spelling-corrector');

// const router = express.Router();

// const { WordTokenizer } = natural;
// const { SentimentAnalyzer, PorterStemmer } = natural;
// const spellCorrector = new SpellCorrector();
// spellCorrector.loadDictionary();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const natural = require('natural');
const aposToLexForm = require('apos-to-lex-form');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');

const router = express.Router();

const { WordTokenizer } = natural;
const { SentimentAnalyzer, PorterStemmer } = natural;
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

router.post('/s-analyzer', function(req, res, next) {
  const { review } = req.body;
//const { feedback } = request.body;
//const { review } = request.body;

var clean_review = aposToLexForm(review).toLowerCase();
clean_review = clean_review.replace(/[^a-zA-Z\s]+/g, '');

const tokenizer = new WordTokenizer();
clean_review = tokenizer.tokenize(clean_review);

clean_review.forEach((word, index) => {
  clean_review[index] = spellCorrector.correct(word);
})

clean_review = SW.removeStopwords(clean_review);

const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
const analysis = analyzer.getSentiment(clean_review);

res.status(200).json({ analysis });

});

module.exports = router;
