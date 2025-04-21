from tools import analyze_resume_vs_jd

resume_path = "C:\\Users\\Mugeish\\OneDrive\\Desktop\\adyaai-Resume-Analyzer-\\Backend\\files\\kmugeis2005@gmail.com\\1745212006066-resume.pdf"
jd_path = "C:\\Users\\Mugeish\\OneDrive\\Desktop\\adyaai-Resume-Analyzer-\\Backend\\files\\kmugeis2005@gmail.com\\1745216843317-jd.pdf"


result = analyze_resume_vs_jd(resume_path, jd_path)

print("Resume Contact Details:", result['contact_details'])
print("Resume Skills:", result['resume_skills'])
print("Resume Experience:", result['experience'])
print("Resume Education:", result['education'])
print("JD Required Skills:", result['jd_skills'])
print("JD Experience Requirements:", result['jd_experience'])
print("JD Education Requirements:", result['jd_education'])
print("Skill Match Score:", result['match_scores']['skills'])
print("Experience Match Score:", result['match_scores']['experience'])
print("Education Match Score:", result['match_scores']['education'])
print("Overall Match Score:", result['match_scores']['overall'])
