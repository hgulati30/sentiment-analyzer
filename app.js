var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
//var logger = require('morgan');
// const natural = require('natural');
// const aposToLexForm = require('apos-to-lex-form');
// const SpellCorrector = require('spelling-corrector');
// const SW = require('stopword');

// const { WordTokenizer } = natural;
// const { SentimentAnalyzer, PorterStemmer } = natural;
// const spellCorrector = new SpellCorrector();
// spellCorrector.loadDictionary();

// Port and Host
const port = 3000;
const host = "127.0.0.1";

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var nlpRouter = require('./routes/nlp');

var app = express();

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.post("/analyzer",(request,response)=>{
//     //const { feedback } = request.body;
//     const { review } = request.body;
//     //console.log(review);
//     var clean_review = aposToLexForm(review).toLowerCase();
//     clean_review = clean_review.replace(/[^a-zA-Z\s]+/g, '');

//     const tokenizer = new WordTokenizer();
//     clean_review = tokenizer.tokenize(clean_review);

//     clean_review.forEach((word, index) => {
//       clean_review[index] = spellCorrector.correct(word);
//     })

//     clean_review = SW.removeStopwords(clean_review);

//     const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
//     const analysis = analyzer.getSentiment(clean_review);

//     response.status(200).json({ analysis });
// });


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/nlp', nlpRouter);

app.listen(port,host,()=>{
    console.log("Server is running...");
});

module.exports = app;
