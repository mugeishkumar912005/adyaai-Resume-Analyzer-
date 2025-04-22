from flask import Flask, request, jsonify
from flask_cors import CORS
import re
from PyPDF2 import PdfReader
import docx
import math
import matplotlib.pyplot as plt
import io
import base64
import tempfile
import os

app = Flask(__name__)
CORS(app)

SKILLS = {
    "languages": [
        "python", "java", "c++", "c", "c#", "javascript", "typescript", "Go", "ruby", "swift", "kotlin", "php", "rust", "R", "matlab", "scala", "sql", "bash", "perl"
    ],
    "frameworks_libraries": [
        "react", "angular", "vue", "node", "django", "flask", "spring", "laravel", "express", "next.js", "nuxt.js", "fastapi", "pandas", "numpy", "scikit-learn", "tensorflow", "keras", "pytorch", "tailwind", "bootstrap", "material-ui", "redux", "socket.io", "jquery", "rxjs", "nestjs"
    ],
    "tools_platforms": [
        "git", "docker", "kubernetes", "aws", "azure", "gcp", "jira", "figma", "linux", "jenkins", "github", "bitbucket", "notion", "postman", "firebase", "heroku", "airflow"
    ]
}
DEGREE_MAP = {
    'computer science': [
        'cs', 'it', 'information technology', 'computer science', 'cse', 'computing', 'software engineering', 'systems engineering', 'informatics'
    ],
    'mechanical engineering': [
        'mechanical', 'mechanical engineering', 'thermodynamics', 'heat transfer', 'fluid mechanics', 'materials science'
    ],
    'electronics and communication engineering': [
        'ece', 'electronics and communication', 'electronics', 'communication systems', 'digital electronics', 'analog electronics', 'embedded systems', 'vlsi'
    ],
    'aeronautical engineering': [
        'aeronotics', 'aircraft', 'aerodynamics', 'aerospace', 'flight mechanics', 'aviation', 'propulsion', 'space systems'
    ],
    'artificial intelligence and machine learning': [
        'aiml', 'artificial intelligence', 'ai ml', 'machine learning', 'deep learning', 'neural networks', 'natural language processing', 'computer vision'
    ],
    'data science and artificial intelligence': [
        'aids', 'artificial intelligence and data science', 'ai ds', 'data science', 'big data', 'predictive analytics', 'data mining'
    ],
    'bachelor of technology': [
        'btech', 'bachelor of technology', 'b.tech', 'b tech'
    ],
    'bachelor of engineering': [
        'be', 'bachelor of engineering', 'b.eng', 'b.e'
    ],
    'master of technology': [
        'mtech', 'master of technology', 'm.tech', 'm tech'
    ],
    'master of engineering': [
        'me', 'master of engineering', 'm.eng', 'm.e'
    ],
    'master of science': [
        'msc', 'master of science', 'm.sc', 'm science'
    ],
    'bachelor of science': [
        'bsc', 'bachelor of science', 'b.sc', 'b science'
    ],
    'phd': [
        'phd', 'doctorate', 'doctoral', 'phd in engineering', 'phd in computer science'
    ],
    'bachelors': [
        'bachelors', 'undergraduate', 'bachelor', 'undergrad'
    ],
    'masters': [
        'masters', 'postgraduate', 'master', 'postgrad'
    ],
    'other': [
        'diploma', 'certification', 'associate degree', 'higher secondary', 'vocational', 'associate'
    ]
}

def extract_text_from_file(file):
    if file.filename.lower().endswith('.pdf'):
        reader = PdfReader(file)
        text = ''
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
        return text
    elif file.filename.lower().endswith(('.doc', '.docx')):
        doc = docx.Document(file)
        return '\n'.join([para.text for para in doc.paragraphs])
    elif file.filename.lower().endswith('.txt'):
        return file.read().decode('utf-8')
    else:
        raise ValueError("Unsupported file format")

def extract_name(text):
    lines = text.strip().split('\n')
    ignore_keywords = ["resume", "curriculum vitae", "contact", "email", "phone", "mobile", "linkedin","Framework",'school']

    for line in lines[:10]: 
        line_clean = line.strip()
        if not line_clean:
            continue

        lower_line = line_clean.lower()
        if any(keyword in lower_line for keyword in ignore_keywords):
            continue
        line_clean = re.sub(r'(?i)^name\s*[:\-]?\s*', '', line_clean)

        words = line_clean.split()
        if 2 <= len(words) <= 4 and all(word[0].isupper() for word in words if word.isalpha()):
            return line_clean.strip()

    return "Name not found"

def clean_text(text):
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text).lower()
    return re.sub(r'\s+', ' ', text).strip()

def extract_skills(text, skills_list):
    text = text.lower()
    return [skill for skill in skills_list if skill in text]

def extract_education_keywords(text):
    text = text.lower().replace('\n', ' ').replace('\r', ' ')

    def extract_number(text, patterns):
        for pattern in patterns:
            match = re.search(pattern, text)
            if match:
                try:
                    return float(match.group(1))
                except:
                    continue
        return None

    cgpa_patterns = [
        r'cgpa\s*[:\-]?\s*([0-9]\.\d{1,2})',
        r'gpa\s*[:\-]?\s*([0-9]\.\d{1,2})',
        r'grade\s*point\s*average\s*[:\-]?\s*([0-9]\.\d{1,2})',
        r'([7-9]\.\d|10(?:\.0{1,2})?)\s*/\s*10',
    ]
    cgpa = extract_number(text, cgpa_patterns)

    found_degree = None
    for canonical, aliases in DEGREE_MAP.items():
        for alias in aliases:
            if re.search(r'\b' + re.escape(alias) + r'\b', text):
                found_degree = canonical
                break
        if found_degree:
            break

    return {
        'cgpa': cgpa,
        'degree': found_degree
    }

def analyze_resume_vs_jd(resume_text, jd_text):
    cleaned_resume = clean_text(resume_text)
    cleaned_jd = clean_text(jd_text)

    all_skills = SKILLS["languages"] + SKILLS["frameworks_libraries"] + SKILLS["tools_platforms"]
    resume_skills = extract_skills(cleaned_resume, all_skills)
    jd_skills = extract_skills(cleaned_jd, all_skills)

    extracted_name = extract_name(resume_text)
    resume_edu = extract_education_keywords(resume_text)
    jd_edu = extract_education_keywords(jd_text)

    edu_score = 0
    edu_total = 0

    if jd_edu['degree']:
        edu_total += 1
        if resume_edu['degree'] == jd_edu['degree']:
            edu_score += 1

    if jd_edu['cgpa'] is not None:
        edu_total += 1
        if resume_edu['cgpa'] is not None and resume_edu['cgpa'] >= jd_edu['cgpa']:
            edu_score += 1

    edu_match_score = math.floor((edu_score / edu_total) * 100) if edu_total > 0 else 0
    skill_match_score = math.floor((len(set(resume_skills).intersection(set(jd_skills))) / len(jd_skills)) * 100) if jd_skills else 0
    overall_score = math.floor((0.7 * skill_match_score) + (0.3 * edu_match_score))

    return {
        "name": extracted_name,
        "resume_skills": resume_skills,
        "jd_skills": jd_skills,
        "resume_education_keywords": resume_edu,
        "jd_education_keywords": jd_edu,
        "match_scores": {
            "skills": skill_match_score,
            "education": edu_match_score,
            "overall": overall_score
        }
    }

def generate_suggestions(resume_skills, jd_skills, resume_edu, jd_edu):
    suggestions = []

    missing_skills = list(set(jd_skills) - set(resume_skills))
    if missing_skills:
        suggestions.append(f"Consider learning or highlighting: {', '.join(missing_skills)}")

    if jd_edu['cgpa'] is not None and (resume_edu['cgpa'] is None or resume_edu['cgpa'] < jd_edu['cgpa']):
        suggestions.append(f"Consider improving or showcasing your CGPA (required: {jd_edu['cgpa']})")

    if jd_edu['degree'] and resume_edu['degree'] != jd_edu['degree']:
        suggestions.append(f"Ensure your degree matches the requirement: {jd_edu['degree']}")

    if not suggestions:
        suggestions.append("Great! Your resume matches the job description well.")

    return suggestions

def generate_match_score_chart(match_scores):
    labels = ['Skills', 'Education', 'Overall']
    values = [match_scores['skills'], match_scores['education'], match_scores['overall']]

    plt.figure(figsize=(6, 4))
    bars = plt.bar(labels, values, color=['skyblue', 'orange', 'green'])
    plt.ylim(0, 100)
    plt.title('Match Score Breakdown')
    plt.ylabel('Score (%)')
    plt.grid(axis='y', linestyle='--', alpha=0.7)

    for bar in bars:
        yval = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2.0, yval + 1, f'{int(yval)}%', ha='center', va='bottom')

    buf = io.BytesIO()
    plt.tight_layout()
    plt.savefig(buf, format='png')
    plt.close()
    buf.seek(0)

    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    return f"data:image/png;base64,{img_base64}"

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'resumeFile' not in request.files or 'jdFile' not in request.files:
        return jsonify({"error": "Missing resume or JD file"}), 400

    resume_file = request.files['resumeFile']
    jd_file = request.files['jdFile']

    if not resume_file or not jd_file:
        return jsonify({"error": "Empty file upload"}), 400

    try:
        resume_text = extract_text_from_file(resume_file)
        jd_text = extract_text_from_file(jd_file)
        result = analyze_resume_vs_jd(resume_text, jd_text)
        suggestions = generate_suggestions(
            result['resume_skills'],
            result['jd_skills'],
            result['resume_education_keywords'],
            result['jd_education_keywords']
        )

        result["suggestions"] = suggestions
        result["visualization"] = generate_match_score_chart(result["match_scores"])

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    print("🚀 Resume Analyzer server is running at http://127.0.0.1:5000")
    app.run(debug=True)