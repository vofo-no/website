import { useEffect, useRef, useState } from "react";

export function useHeadersObserver(ids: string[] = []) {
  const observer = useRef<IntersectionObserver>();
  const [activeId, setActiveId] = useState("");

  const handleObsever: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry?.isIntersecting) {
        setActiveId(entry.target.id);
      }
    });
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: "-20% 0% -35% 0px",
    });

    const elements = document.querySelectorAll(
      ids.map((value) => `#${value}`).join(", "),
    );
    elements.forEach((element) => observer.current!.observe(element));

    return () => observer.current?.disconnect();
  }, [ids]);

  return activeId;
}
