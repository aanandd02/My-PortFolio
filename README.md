# 🚀 Aanand's Portfolio  

Welcome to my personal portfolio!  
This website is a reflection of my journey as a **Software Developer**, showcasing projects, skills, and experiences that highlight my passion for building scalable, efficient, and user-friendly web applications.  

## 🌐 Live Website  
[🔗 Visit My Portfolio](https://anand-shukla02.onrender.com/)


## ✨ Highlights  
- 📂 **Projects** – A curated collection of applications and solutions demonstrating problem-solving, creativity, and technical expertise.  
- 💼 **Experience** – Hands-on exposure to modern web development practices, collaborative workflows, and continuous learning.  
- 🛠️ **Skills** – Strong foundation in frontend technologies with a focus on building responsive, scalable, and user-centric applications.  
- 🤝 **Collaboration** – Open to connecting, contributing, and working on innovative ideas that make an impact.  

## ⚙️ Tech Stack  
- **Frontend:** React, Vite, Tailwind CSS  
- **Deployment:** Render  
- **Version Control:** Git & GitHub  

## 🔐 Resume Link Config
Resume button now uses a direct public link.

Required `.env` var:
```env
VITE_RESUME_PUBLIC_URL=your_resume_public_link
```
If `VITE_RESUME_PUBLIC_URL` is not set, fallback resume link is used.

## 🤖 Portfolio Assistant Config
The `Ask Assistant` chat now supports Groq-powered replies, but it is intentionally limited to Anand-related questions only. If someone asks something outside Anand's profile, the assistant will refuse and redirect back to portfolio topics.

Set these vars in `.env.local`:
```env
VITE_RESUME_PUBLIC_URL=your_public_resume_link
VITE_GROQ_API_KEY=your_groq_api_key
VITE_GROQ_MODEL=llama-3.3-70b-versatile
```

Notes:
- If `VITE_GROQ_API_KEY` is missing, the chatbot falls back to built-in portfolio answers.
- Since this is a Vite frontend app, `VITE_` env values are exposed to the browser. For production-grade security, move the Groq call behind a backend or serverless API route.

## 📬 Let’s Connect  
- 💼 [LinkedIn](https://www.linkedin.com/in/ananadshukla05/)  
- 🖥️ [GitHub](https://github.com/aanandd02)  
- 📧 **Email:** aanandd9076@gmail.com  

---

⭐️ Built with passion & dedication by **Aanand**
