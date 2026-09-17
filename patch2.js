const fs = require('fs');
let content = fs.readFileSync('src/app/api/generate-questions/route.js', 'utf8');

content = content.replace(
  'const { skills, difficulty, count, language = \"English\" } = body;',
  'const { skills, difficulty, count, language = \"English\", experience } = body;'
);

content = content.replace(
  '    const validDifficulties = [\"easy\", \"medium\", \"hard\"];\r\n    const difficultyValue = (difficulty || \"easy\").toLowerCase();',
  '    let difficultyValue = (difficulty || \"easy\").toLowerCase();\r\n    if (difficultyValue === \"beginner\") difficultyValue = \"easy\";\r\n    else if (difficultyValue === \"intermediate\") difficultyValue = \"medium\";\r\n    else if (difficultyValue === \"advanced\") difficultyValue = \"hard\";\r\n    const validDifficulties = [\"easy\", \"medium\", \"hard\"];'
);

content = content.replace(
  '    const diffLevel = difficultyMap[difficultyValue] || \"beginner\";\r\n\r\n    const prompt = \Generate \ unique multiple-choice questions for a \ level assessment covering these skills: \.',
  '    const diffLevel = difficultyMap[difficultyValue] || \"beginner\";\r\n\r\n    const prompt = \Generate \ unique multiple-choice questions for a \ level assessment covering these skills: \.\\nExperience level of the candidate: \.'
);

fs.writeFileSync('src/app/api/generate-questions/route.js', content);
console.log('route.js patched');
