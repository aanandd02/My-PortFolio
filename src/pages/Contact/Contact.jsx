import { useState } from "react";
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
      className="bg-transparent py-14 md:py-24 relative overflow-hidden text-slate-800"
    >
      {/* background glow */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-sky-400/[0.08] blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/[0.08] blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-indigo-600 text-sm font-bold tracking-widest uppercase mb-3">Connect</p>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto font-semibold">
            Have an opportunity or idea? Let's build something impactful.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          {/* CONTACT INFO */}
          <motion.div variants={item} className="space-y-5 md:space-y-7">
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
              <div key={i} className="flex items-center gap-4 group">
                <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 group-hover:border-indigo-500/30 group-hover:bg-indigo-50">
                  <c.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">{c.label}</p>
                  {c.link ? (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-indigo-600 transition-colors font-semibold"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-slate-500 font-semibold">{c.value}</p>
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
            <div className="absolute -inset-[1.5px] bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition duration-500" />

            <div className="relative bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-5 sm:p-7 transition-all duration-300 group-hover:border-slate-300 shadow-md">
              <form onSubmit={handleSubmit} className="space-y-5">
                {["name", "email", "subject"].map((field) => (
                  <div key={field}>
                    <input
                      type={field === "email" ? "email" : "text"}
                      placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500/50 focus:bg-white outline-none text-slate-800 placeholder:text-slate-400 transition-all duration-300"
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-sm mt-1 font-semibold">
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
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500/50 focus:bg-white outline-none text-slate-800 placeholder:text-slate-400 transition-all duration-300 resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1 font-semibold">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-650 hover:from-sky-400 hover:to-indigo-500 font-bold flex items-center justify-center gap-2.5 transition-all duration-300 text-white shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>

              {status && (
                <p
                  className={`mt-4 text-center text-sm font-bold ${
                    status.includes("successfully")
                      ? "text-emerald-600"
                      : "text-red-500"
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
