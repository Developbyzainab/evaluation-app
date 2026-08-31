# Evaluator App - Certificate System Design

## Overview
Add logo (white.png), certificate generation, and print functionality to the SkillEval app.

## Current State
- 200+ IT skills in `skills.js` (comprehensive)
- Questions for ~15 skills in `questions.js`
- Assessment flow: Evaluate → Test → Result → Dashboard
- LocalStorage for assessment data

## Requirements

### 1. Logo Integration
- Replace 'S' logo with `white.png` in Navbar and Homepage
- Keep "SkillEval AI" text branding alongside logo

### 2. Certificate Generation
- Trigger: When user completes an assessment (navigates to `/result`)
- Certificate data stored in localStorage alongside result
- Unique certificate ID per assessment

### 3. Certificate Page (`/certificate`)
- Printable web page with professional certificate design
- Display: Name, Skills, Overall Score, Skill Level, Date, Certificate ID
- Print button using `window.print()`
- Accessible from Result page and Dashboard

### 4. Certificate Access
- "View Certificate" button on Result page
- "Certificates" section in Dashboard listing all past certificates
- Direct URL access via certificate ID

## Technical Design

### New Files
- `src/app/certificate/page.js` - Certificate display page
- `src/components/Certificate.jsx` - Certificate component
- `src/lib/certificate.js` - Certificate utilities (generate ID, format date)

### Modified Files
- `src/components/Navbar.jsx` - Add white.png logo
- `src/app/page.js` - Add white.png logo to homepage
- `src/app/result/page.js` - Add "View Certificate" button
- `src/app/dashboard/page.js` - Add certificates list
- `src/app/test/page.js` - Store certificate data on completion

### Data Structure
```javascript
certificate: {
  id: "CERT-XXXXXX",
  name: string,
  skills: string[],
  score: number,
  total: number,
  percentage: number,
  level: string,
  date: ISOString,
  strengths: string[],
  weaknesses: string[]
}
```

## Implementation Steps
1. Add white.png logo to Navbar and Homepage
2. Create certificate utility functions
3. Create Certificate component
4. Create /certificate page
5. Modify test/page.js to generate certificate on completion
6. Add certificate button to result page
7. Add certificates list to dashboard
8. Add print styles for certificate