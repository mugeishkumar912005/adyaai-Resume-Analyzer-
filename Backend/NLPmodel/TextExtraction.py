from tools import extract_text_from_pdf
import re
from PyPDF2 import PdfReader
from nltk.corpus import stopwords
import nltk
resume_path = "C:\\Users\\Mugeish\\OneDrive\\Desktop\\adyaai-Resume-Analyzer-\\Backend\\files\\kmugeis2005@gmail.com\\1745240626635-resume.pdf"
# jd_path = "C:\\Users\\Mugeish\\OneDrive\\Desktop\\adyaai-Resume-Analyzer-\\Backend\\files\\kmugeis2005@gmail.com\\1745216843317-jd.pdf"

import re
from PyPDF2 import PdfReader
from nltk.corpus import stopwords
import nltk

# Download stopwords if not already downloaded
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

def extract_pdf_text(resume_path):
    reader = PdfReader(resume_path)
    text = ''
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text
    return text

def clean_text(text):

    text = re.sub(r'[^a-zA-Z0-9\s]', '', text).lower()
    words = text.split()
    filtered_words = [word for word in words if word not in stop_words]
    return ' '.join(filtered_words)
def name_from_email(text):
    match = re.search(r'Email:\s*([a-zA-Z.]+)@', text)
    if match:
        parts = match.group(1).replace('.', ' ').split()
        return ' '.join([p.capitalize() for p in parts])
    return "Name not found"



Text=extract_text_from_pdf(resume_path)

name=name_from_email(Text)

print(Text)

print("Name:",name)

import re

import re

import re

def extract_name(text):
    # Look for lines with personal identifiers that might contain a name nearby
    lines = text.split('\n')
    possible_name = None

    for i, line in enumerate(lines):
        line = line.strip()
        # Check if the line includes "Phone", "Email", etc.
        if re.search(r'(phone|email|linkedin|github)', line, re.IGNORECASE):
            # Go back a line or two if possible to see if name is above it
            for j in range(i-2, i+2):
                if 0 <= j < len(lines):
                    match = re.search(r'\b([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)\b', lines[j])
                    if match:
                        candidate = match.group(1)
                        # Exclude common non-name words
                        if not any(word.lower() in candidate.lower() for word in ['project', 'system', 'framework', 'stack', 'university']):
                            return candidate

    # Fallback: Get the first two-word capitalized phrase (likely a name)
    all_caps_phrases = re.findall(r'\b([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)\b', text)
    for phrase in all_caps_phrases:
        if not any(word.lower() in phrase.lower() for word in ['project', 'system', 'framework', 'stack', 'university', 'data', 'structures']):
            return phrase

    return "Name not found"



# Example usage:
name = extract_name(Text)
print("Extracted Name:", name)


