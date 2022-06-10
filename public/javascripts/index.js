//const Logger = require("nodemon/lib/utils/log");

const submitReview = (e) => {
    e.preventDefault();
    const review = document.getElementById('review').value;
    console.log(review);
    //Logger.use(review);
    const options = {
      method: 'POST',
      body: JSON.stringify({ review }),
      headers: new Headers({ 'Content-Type': 'application/json' })
    }

    const emojiSection = document.getElementById('emojiSection');
    const title = document.getElementById('title');
    const outline = document.querySelector(':focus');

    fetch('/api/nlp/s-analyzer', options)
        .then(res => res.json())
        .then (({ analysis }) => {
            console.log(analysis);
         if (analysis < 0) {
             emojiSection.innerHTML = '<img src="/images/angry_emoji.jpg" width="10%" height="auto">';
             title.style.color = 'red';
             outline.style.borderColor = 'red';
         };
         if (analysis === 0) {
             emojiSection.innerHTML = '<img src="/images/neutral_emoji.png" width="10%" height="auto">';
             title.style.color = 'yellow';
             outline.style.borderColor = 'yellow';
         }
         if (analysis > 0) {
             emojiSection.innerHTML = '<img src="/images/happy_emoji.png" width="10%" height="auto">';
             title.style.color = 'green';
             outline.style.borderColor = 'green'
         }
        })
        .catch(err => {
        emojiSection.innerHTML = 'There was an error processing your request!'
        })

}

document.getElementById('review').addEventListener('input', submitReview);
document.getElementById('review').addEventListener('submit', submitReview);
