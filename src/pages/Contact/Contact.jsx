import React, { useState } from "react";
import { Send, Phone, MapPin, Mail, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validateForm = () => {
    let temp = {};
    if (!formData.name.trim()) temp.name = "Name is required";
    if (!formData.email.trim()) temp.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) temp.email = "Invalid email";
    if (!formData.subject.trim()) temp.subject = "Subject is required";
    if (!formData.message.trim()) temp.message = "Message is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const form = new FormData();
    form.append("access_key", "f94db06b-b8c1-42b1-b610-48429b0adf32");
    Object.entries(formData).forEach(([k, v]) => form.append(k, v));

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else setStatus(data.message || "Error sending message");
    } catch {
      setStatus("Something went wrong. Try again.");
    }
  };

  return (
    <section
      className="min-h-screen bg-[#04081A] py-32 relative overflow-hidden"
    >
      {/* background glow */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Have an opportunity or idea? Let’s build something impactful.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* CONTACT INFO */}
          <motion.div variants={item} className="space-y-8">
            {[
              {
                icon: Mail,
                label: "Email",
                value: "aanandd9076@gmail.com",
                link: "mailto:aanandd9076@gmail.com",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+91-9076823328",
                link: "tel:+919076823328",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Mirzapur, Uttar Pradesh, India",
              },
              {
                icon: Linkedin,
                label: "LinkedIn",
                value: "linkedin.com/in/aanandd02",
                link: "https://www.linkedin.com/in/aanandd02/",
              },
              {
                icon: Github,
                label: "GitHub",
                value: "github.com/aanandd02",
                link: "https://github.com/aanandd02",
              },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <c.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="font-medium">{c.label}</p>
                  {c.link ? (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-gray-400">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* FORM */}
          <motion.div
            variants={item}
            className="relative group rounded-2xl"
          >
            {/* glow border */}
            <div className="absolute -inset-[1.5px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition duration-500" />

            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {["name", "email", "subject"].map((field) => (
                  <div key={field}>
                    <input
                      type={field === "email" ? "email" : "text"}
                      placeholder={`Your ${field}`}
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 outline-none"
                    />
                    {errors[field] && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors[field]}
                      </p>
                    )}
                  </div>
                ))}

                <div>
                  <textarea
                    rows="4"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 outline-none resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>

              {status && (
                <p
                  className={`mt-4 text-center ${
                    status.includes("success")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {status}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
