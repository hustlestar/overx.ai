import React3, { useState, useRef, useEffect } from 'react';

// components/Performance/OptimizedImage.tsx
var OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  eager = false,
  className = "",
  ImageComponent,
  ...rest
}) => {
  const loading = priority || eager ? "eager" : "lazy";
  if (ImageComponent) {
    return /* @__PURE__ */ React3.createElement(
      ImageComponent,
      {
        src,
        alt,
        width,
        height,
        loading,
        priority,
        className,
        placeholder: "blur",
        quality: 85,
        ...rest
      }
    );
  }
  return /* @__PURE__ */ React3.createElement(
    "img",
    {
      src,
      alt,
      width,
      height,
      loading,
      className,
      ...rest
    }
  );
};
var LazyLoad = ({
  children,
  offset = 100,
  placeholder = null,
  className = "",
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const hasBeenVisible = useRef(false);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            hasBeenVisible.current = true;
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once && hasBeenVisible.current) {
            setIsVisible(false);
          }
        });
      },
      {
        rootMargin: `${offset}px`
      }
    );
    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [offset, once]);
  return /* @__PURE__ */ React3.createElement("div", { ref: containerRef, className }, isVisible ? children : placeholder);
};
var PreloadLink = ({ resources, HeadComponent }) => {
  const links = /* @__PURE__ */ React3.createElement(React3.Fragment, null, resources.map((resource, index) => /* @__PURE__ */ React3.createElement(
    "link",
    {
      key: index,
      rel: "preload",
      href: resource.href,
      as: resource.as,
      type: resource.type,
      crossOrigin: resource.crossOrigin
    }
  )));
  return HeadComponent ? /* @__PURE__ */ React3.createElement(HeadComponent, null, links) : links;
};
var PrefetchLink = ({ urls, HeadComponent }) => {
  const links = /* @__PURE__ */ React3.createElement(React3.Fragment, null, urls.map((url, index) => /* @__PURE__ */ React3.createElement("link", { key: index, rel: "prefetch", href: url })));
  return HeadComponent ? /* @__PURE__ */ React3.createElement(HeadComponent, null, links) : links;
};
var PreconnectLink = ({ origins, HeadComponent }) => {
  const links = /* @__PURE__ */ React3.createElement(React3.Fragment, null, origins.map((origin, index) => /* @__PURE__ */ React3.createElement("link", { key: index, rel: "preconnect", href: origin })));
  return HeadComponent ? /* @__PURE__ */ React3.createElement(HeadComponent, null, links) : links;
};

export { LazyLoad, OptimizedImage, PreconnectLink, PrefetchLink, PreloadLink };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map