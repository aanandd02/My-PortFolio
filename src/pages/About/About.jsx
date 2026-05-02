import HeroImg from "@/assets/images/Anand.png";

export default function About() {
  return (
    <section id="about" className="py-16 md:py-32 text-white bg-transparent">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl text-white">
          Aspiring Software Engineer & Backend Developer
        </h2>

        <div className="grid items-center gap-10 sm:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-12 lg:gap-20">
          <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[320px]">
            <div className="absolute -inset-4 rounded-[2rem] bg-cyan-400/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900/70 p-3 shadow-[0_18px_60px_rgba(8,145,178,0.18)] backdrop-blur-sm">
              <div className="absolute inset-x-6 top-0 h-24 rounded-full bg-cyan-300/15 blur-3xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-800">
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
            <p className="text-lg font-medium text-cyan-200">Hi, I&apos;m Anand.</p>
            <p className="text-base leading-8 text-slate-200 md:text-lg">
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
            <p className="text-base leading-8 text-slate-300 md:text-lg">
              Thank you for visiting my portfolio and taking the time to explore
              my work!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
