import HeroImg from "@/assets/images/Anand.jpg";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 text-slate-800 bg-transparent relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-sky-400/[0.08] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-400/[0.08] rounded-full blur-[150px]" />

      <div className="mx-auto max-w-5xl space-y-10 px-6 md:space-y-16 relative z-10">
        <div className="space-y-3">
          <p className="text-indigo-600 text-sm font-bold tracking-widest uppercase">About Me</p>
          <h2 className="relative z-10 max-w-xl text-3xl sm:text-4xl font-bold lg:text-5xl text-slate-900 leading-tight">
            Aspiring Software Engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">&</span> Backend Developer
          </h2>
        </div>

        <div className="grid items-center gap-10 sm:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-12 lg:gap-20">
          <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[320px]">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sky-500/10 to-indigo-500/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-xl backdrop-blur-sm">
              <div className="absolute inset-x-6 top-0 h-24 rounded-full bg-sky-500/10 blur-3xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-100">
                <img
                  src={HeroImg}
                  className="h-full w-full object-cover object-top"
                  alt="Portrait of Anand"
                  width={1074}
                  height={1432}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          <div className="relative space-y-5">
            <p className="text-lg font-bold text-indigo-600">Hi, I&apos;m Anand.</p>
            <p className="text-base leading-8 text-slate-600 md:text-lg font-medium">
              I am an aspiring Software Engineer & Backend Developer with a deep
              passion for coding and problem-solving. I enjoy working with
              technologies like Java, JavaScript, Node.js, and Python to build
              something new every day, whether it&apos;s an innovative project, a
              handy tool, or a creative solution to a challenge. Beyond writing
              code, I bring curiosity, adaptability, and a strong work ethic,
              allowing me to contribute effectively to teams and projects. I&apos;m
              always eager to take on new challenges, refine my skills, and
              explore fresh ideas.
            </p>
            <p className="text-base leading-8 text-slate-500 md:text-lg font-medium">
              Thank you for visiting my portfolio and taking the time to explore
              my work!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
