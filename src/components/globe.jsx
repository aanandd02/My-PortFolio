import IconCloud from "./ui/icon-cloud";

const slugs = [
  "javascript",
  "java",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "amazonaws",
  "nginx",
  "docker",
  "git",
  "github",
  "visualstudiocode",
  "mysql",
  "mongodb",
  "elasticsearch",
];

function IconCloudDemo() {
  return (
    <div className="relative flex h-[190px] w-[190px] sm:h-[220px] sm:w-[220px] md:h-[250px] md:w-[250px] items-center justify-center overflow-hidden rounded-2xl bg-transparent">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}

export default IconCloudDemo;
