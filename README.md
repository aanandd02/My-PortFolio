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

## 🔐 Resume Admin (Latest Resume Auto-Update)
This portfolio now includes a password-protected `Resume Admin` panel.

How it works:
- Admin logs in with Supabase Auth email/password.
- Uploads a new PDF resume.
- File is uploaded with `upsert` at one fixed path: `latest-resume.pdf`.
- Old resume is automatically replaced (no manual delete needed).
- Public `Resume` button always opens the latest uploaded file.

Required `.env` vars:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_BUCKET=resumes
```

Supabase setup:
1. Create a bucket named `resumes` and keep it `public`.
2. Keep only authenticated users allowed for upload/update in Storage policies.
3. Create admin user in Supabase Auth (email/password).
4. Use that admin credential inside the `Resume Admin` panel in UI.

## 📬 Let’s Connect  
- 💼 [LinkedIn](https://www.linkedin.com/in/ananadshukla05/)  
- 🖥️ [GitHub](https://github.com/aanandd02)  
- 📧 **Email:** aanandd9076@gmail.com  

---

⭐️ Built with passion & dedication by **Aanand**
