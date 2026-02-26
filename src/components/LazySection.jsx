import { useEffect, useRef, useState } from "react";

export default function LazySection({
  children,
  minHeight = "80vh",
  rootMargin = "300px 0px",
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={sectionRef} style={{ minHeight }}>
      {isVisible ? children : null}
    </div>
  );
}
