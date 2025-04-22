
# 📄 Resume Analyser

  


**Resume Analyser** is a web application that provides section-wise analysis of resumes with respect to a given job description. Built using **React** (frontend), **Express.js** (backend), and **Python NLP** (analysis engine), it helps candidates or recruiters evaluate how well a resume aligns with job requirements.

  Video Link ->https://drive.google.com/file/d/1Dbs0ZGJtmbjWZ7EBXMRUJdiIYRgMHImI/view?usp=drivesdk 

  ![Screenshot (207)](https://github.com/user-attachments/assets/8343e71c-269a-415b-ac7f-185e9cedcf7e)
![Screenshot 2025-04-22 201558](https://github.com/user-attachments/assets/10fb7410-c136-404a-a239-28d0ef747085)
![Screenshot 2025-04-22 201512](https://github.com/user-attachments/assets/3b464ba3-eaa8-4cc8-ade4-1817b7a5afe0)
![Screenshot 2025-04-22 201247](https://github.com/user-attachments/assets/f0b1f35a-4fd9-4ecf-aa06-de2a205fc5c1)
![Screenshot 2025-04-22 200608](https://github.com/user-attachments/assets/8f5946d2-3234-4caf-b348-31ca0157b796)
![Screenshot 2025-04-22 200558](https://github.com/user-attachments/assets/b1939934-04a4-48a6-bda2-d8a1accd5ec5)
![Screenshot 2025-04-22 200544](https://github.com/user-attachments/assets/d4a6249c-73ed-4f84-94c6-5529ff9ed104)
![Screenshot 2025-04-22 200504](https://github.com/user-attachments/assets/aca2b8ac-4579-4a7b-9f3e-41d4037731a0)
![Screenshot (208)](https://github.com/user-attachments/assets/9ab7d372-c37e-42f5-944f-362a1a129071)


---

  

## 🚀 Features


  

- 🔍 Upload and extract text from both Resume and Job Description (JD)

- ✂️ Intelligent section-wise segmentation of resume content

- 🤖 NLP-based analysis to compare each section with JD-relevant skills

- 📊 Section-wise scoring based on relevance

- 📈 Cumulative match score out of 100

- 🧠 Insightful feedback to improve resume alignment

  

---

  

## 🛠️ Tech Stack

  

-  **Frontend**: React.js

-  **Backend**: Node.js, Express.js

-  **NLP Engine**: Python (spaCy, NLTK, PyPDF)

  

---

## 📂 Folder Structure

  

```

resume-analyser/

│

├── frontend/ # React frontend

│ └── ...

│

├── backend/ # Express backend

│ └── ...

│

├── NLPModel/ # Python NLP logic

│ └── tools.py

│

├── README.md

└── package.json

```

  

---

  

## ⚙️ How It Works

  

1.  **Upload** your resume and the job description via the web interface.

2. The backend extracts text from the uploaded documents.

3. Python NLP script:

- Segments resume into key sections (e.g., Skills, Experience, Projects).

- Matches section content with required skills and keywords from JD.

- Scores each section individually.

4. A **cumulative relevance score** out of 100 is generated and displayed.

5. Results are visualized on the frontend with section-wise insights.

  

---

  

## 📦 Installation

  

1.  **Clone the repository**

```bash

git clone https://github.com/yourusername/resume-analyser.git

cd resume-analyser

```

  

2.  **Install dependencies**

  

- Backend:

```bash

cd backend

npm install

```

  

- Frontend:

```bash

cd ../frontend

npm install

```

  

- Python NLP:

```bash

cd ../NLPModel

pip install -r requirements.txt

```

  

3.  **Run the application**

  

- Start backend:

```bash

cd frontend

npm run dev

```

  

- Start frontend:

```bash

cd ../backend

node index.js

```
 
---

 

## 🧪 Sample Use Cases

  

- Job seekers optimizing resumes for better ATS matching

- Recruiters assessing candidate fit quickly

- Career services providing resume review tools

  

---

  

## 📌 Future Improvements

  

- PDF preview and highlight matching

- Suggestive improvements based on score

- Support for multiple resume formats

- Integration with job portals

  

---

  

## 🧑‍💻 Author

  

**Mugeish Kumar S**

[GitHub](https://github.com/mugeishkumar912005) • [LinkedIn]([https://linkedin.com/in/vrdev/](https://www.linkedin.com/in/mugeish-kumar-3a9258251/]) • [Website]([https://linktr.ee/mvram](https://adyaai-resume-analyzer-frontend-app.onrender.com])

  

---

