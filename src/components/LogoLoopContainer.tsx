import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiMysql,
  SiGit,
  SiGithub,
  SiDocker,
  SiKubernetes,
  SiVite,
  SiRedux,
  SiGraphql,
  SiSass,
  SiPython,
  SiDjango,
  SiFlask,
  SiSpring,
  SiGooglecloud,
  SiLinux,
  SiUbuntu,
  SiFigma,
  SiFramer,
} from "react-icons/si";
import LogoLoop from "./LogoLoop";

const techLogos = [
  {
    node: <SiReact color="#61DAFB" />,
    title: "React",
    href: "https://react.dev",
  },
  {
    node: <SiNextdotjs color="#000000" />,
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    node: <SiTypescript color="#3178C6" />,
    title: "TypeScript",
    href: "https://typescriptlang.org",
  },
  {
    node: <SiTailwindcss color="#06B6D4" />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },

  {
    node: <SiJavascript color="#F7DF1E" />,
    title: "JavaScript",
    href: "https://developer.mozilla.org",
  },
  {
    node: <SiHtml5 color="#E34F26" />,
    title: "HTML5",
    href: "https://developer.mozilla.org",
  },
  {
    node: <SiCss3 color="#1572B6" />,
    title: "CSS3",
    href: "https://developer.mozilla.org",
  },

  {
    node: <SiNodedotjs color="#339933" />,
    title: "Node.js",
    href: "https://nodejs.org",
  },
  {
    node: <SiExpress color="#000000" />,
    title: "Express",
    href: "https://expressjs.com",
  },

  {
    node: <SiMongodb color="#47A248" />,
    title: "MongoDB",
    href: "https://mongodb.com",
  },
  {
    node: <SiPostgresql color="#4169E1" />,
    title: "PostgreSQL",
    href: "https://postgresql.org",
  },
  {
    node: <SiMysql color="#4479A1" />,
    title: "MySQL",
    href: "https://mysql.com",
  },
  {
    node: <SiFirebase color="#FFCA28" />,
    title: "Firebase",
    href: "https://firebase.google.com",
  },

  {
    node: <SiGit color="#F05032" />,
    title: "Git",
    href: "https://git-scm.com",
  },
  {
    node: <SiGithub color="#181717" />,
    title: "GitHub",
    href: "https://github.com",
  },

  {
    node: <SiDocker color="#2496ED" />,
    title: "Docker",
    href: "https://docker.com",
  },
  {
    node: <SiKubernetes color="#326CE5" />,
    title: "Kubernetes",
    href: "https://kubernetes.io",
  },

  {
    node: <SiVite color="#646CFF" />,
    title: "Vite",
    href: "https://vitejs.dev",
  },
  {
    node: <SiRedux color="#764ABC" />,
    title: "Redux",
    href: "https://redux.js.org",
  },
  {
    node: <SiGraphql color="#E10098" />,
    title: "GraphQL",
    href: "https://graphql.org",
  },
  {
    node: <SiSass color="#CC6699" />,
    title: "Sass",
    href: "https://sass-lang.com",
  },

  {
    node: <SiPython color="#3776AB" />,
    title: "Python",
    href: "https://python.org",
  },
  {
    node: <SiDjango color="#092E20" />,
    title: "Django",
    href: "https://djangoproject.com",
  },
  {
    node: <SiFlask color="#000000" />,
    title: "Flask",
    href: "https://flask.palletsprojects.com",
  },

  {
    node: <SiSpring color="#6DB33F" />,
    title: "Spring",
    href: "https://spring.io",
  },

  {
    node: <SiGooglecloud color="#4285F4" />,
    title: "Google Cloud",
    href: "https://cloud.google.com",
  },

  {
    node: <SiLinux color="#FCC624" />,
    title: "Linux",
    href: "https://kernel.org",
  },
  {
    node: <SiUbuntu color="#E95420" />,
    title: "Ubuntu",
    href: "https://ubuntu.com",
  },

  {
    node: <SiFigma color="#F24E1E" />,
    title: "Figma",
    href: "https://figma.com",
  },
  {
    node: <SiFramer color="#0055FF" />,
    title: "Framer",
    href: "https://framer.com",
  },
];

const LogoLoopContainer = () => {
  return (
    <div
      className="my-10 "
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Basic horizontal loop */}
      <LogoLoop
        logos={techLogos}
        speed={30}
        direction="right"
        logoHeight={55}
        gap={120}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="var(--loop-fade)"
        ariaLabel="Technology partners"
      />
    </div>
  );
};

export default LogoLoopContainer;
