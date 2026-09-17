const fs = require('fs');
const path = require('path');

const filesToPatch = [
  'src/lib/certificate.js',
  'src/components/Navbar.jsx',
  'src/components/Certificate.jsx',
  'src/app/metadata.js',
  'src/app/test/page.js',
  'src/app/HomeClient.js',
  'src/app/evaluate/page.js',
  'src/app/dashboard/page.js',
  'src/app/dashboard/results/page.js',
  'src/app/dashboard/evaluations/page.js',
  'src/app/auth/register/RegisterClient.jsx',
  'src/app/auth/login/LoginClient.jsx',
  'src/app/auth/AuthClient.jsx',
  'src/app/admin/login/page.jsx',
  'src/app/admin/(dashboard)/settings/page.js',
  'src/app/admin/(dashboard)/layout.jsx'
];

for (const relPath of filesToPatch) {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log('Skipping ' + relPath + ' - not found');
    continue;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace text "SkillEval AI"
  content = content.replace(/SkillEval AI/g, "Let's do I.T");
  // Replace text "Skill Evaluator"
  content = content.replace(/Skill Evaluator/g, "Let's do I.T");
  // Replace standalone "SkillEval" text not part of a technical string or url
  // Match "SkillEval" not preceded by "-" or ".com" or followed by "-"
  content = content.replace(/(?<![-a-zA-Z])SkillEval(?![a-zA-Z0-9-]?)/g, "Let's do I.T");
  
  // Also fix Alt tags specifically in case regex missed
  content = content.replace(/alt="SkillEval"/g, 'alt="Let\'s do I.T"');
  content = content.replace(/alt="SkillEval Admin"/g, 'alt="Let\'s do I.T Admin"');
  content = content.replace(/alt="Skill Evaluator"/g, 'alt="Let\'s do I.T"');

  // Also fix specific references like "Why SkillEval" 
  content = content.replace(/Why SkillEval/g, "Why Let's do I.T");

  // Also "SkillEval helps candidates" -> "Let's do I.T helps candidates"
  
  // Resize logos
  // h-10 w-auto -> h-8 w-auto
  content = content.replace(/className="h-10 w-auto/g, 'className="h-8 w-auto');
  // h-11 w-auto -> h-8 w-auto
  content = content.replace(/className="h-11 w-auto/g, 'className="h-8 w-auto');
  // h-12 w-auto -> h-9 w-auto
  content = content.replace(/className="h-12 w-auto/g, 'className="h-9 w-auto');

  fs.writeFileSync(fullPath, content);
}
console.log('Branding and logo sizes updated');
