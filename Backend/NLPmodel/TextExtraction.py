import re
import nltk
from nltk.corpus import stopwords
from pypdf import PdfReader as PR

nltk.download('stopwords')
nltk.download('punkt')

reader_Resume = PR("C:\\Users\\Mugeish\\OneDrive\\Desktop\\adyaai-Resume-Analyzer-\\Backend\\files\\kmugeis2005@gmail.com\\1745161542417-resume.pdf")
page_Resume = reader_Resume.pages[0]
text_Resume = page_Resume.extract_text()

reader_JD=PR("C:\\Users\\Mugeish\\OneDrive\\Desktop\\adyaai-Resume-Analyzer-\\Backend\\files\\kmugeis2005@gmail.com\\1745161542423-jd.pdf")
page_JD=reader_JD.pages[0]
text_JD=page_JD.extract_text()

def clean_text(text):
    text = re.sub(r'[^a-zA-Z\s]', '', text) 
    text = text.lower() 
    text = re.sub(r'\s+', ' ', text).strip() 
    words = nltk.word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    
    cleaned_words = []
    for word in words:
        if word not in stop_words:
            cleaned_words.append(word)
    cleaned_text = ' '.join(cleaned_words)
    
    return cleaned_text

cleaned_text_Resume = clean_text(text_Resume)

cleaned_text_JD=clean_text(text_JD)

print("Resume:",cleaned_text_Resume)

print("JD:",cleaned_text_JD)
