const fs = require('fs');
let content = fs.readFileSync('src/app/test/page.js', 'utf8');

content = content.replace(
  'data.language || \"English\"',
  'data.language || \"English\",\n          data.experience || \"\"'
);

content = content.replace(
  '      const userAnswer = answers[item.id]?.trim().toLowerCase();\r\n      const correctAnswer = item.answer?.trim().toLowerCase();\r\n\r\n      if (userAnswer && correctAnswer && userAnswer === correctAnswer) {',
  '      const userAnswerIndex = answers[item.id];\r\n      const correctAnswerIndex = item.correct;\r\n\r\n      if (userAnswerIndex !== undefined && correctAnswerIndex !== undefined && userAnswerIndex === correctAnswerIndex) {'
);

fs.writeFileSync('src/app/test/page.js', content);
console.log('test/page.js patched');
