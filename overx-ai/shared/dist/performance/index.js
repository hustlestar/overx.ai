'use strict';

var React3 = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React3__default = /*#__PURE__*/_interopDefault(React3);

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
    return /* @__PURE__ */ React3__default.default.createElement(
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
  return /* @__PURE__ */ React3__default.default.createElement(
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
  const [isVisible, setIsVisible] = React3.useState(false);
  const containerRef = React3.useRef(null);
  const hasBeenVisible = React3.useRef(false);
  React3.useEffect(() => {
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
  return /* @__PURE__ */ React3__default.default.createElement("div", { ref: containerRef, className }, isVisible ? children : placeholder);
};
var PreloadLink = ({ resources, HeadComponent }) => {
  const links = /* @__PURE__ */ React3__default.default.createElement(React3__default.default.Fragment, null, resources.map((resource, index) => /* @__PURE__ */ React3__default.default.createElement(
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
  return HeadComponent ? /* @__PURE__ */ React3__default.default.createElement(HeadComponent, null, links) : links;
};
var PrefetchLink = ({ urls, HeadComponent }) => {
  const links = /* @__PURE__ */ React3__default.default.createElement(React3__default.default.Fragment, null, urls.map((url, index) => /* @__PURE__ */ React3__default.default.createElement("link", { key: index, rel: "prefetch", href: url })));
  return HeadComponent ? /* @__PURE__ */ React3__default.default.createElement(HeadComponent, null, links) : links;
};
var PreconnectLink = ({ origins, HeadComponent }) => {
  const links = /* @__PURE__ */ React3__default.default.createElement(React3__default.default.Fragment, null, origins.map((origin, index) => /* @__PURE__ */ React3__default.default.createElement("link", { key: index, rel: "preconnect", href: origin })));
  return HeadComponent ? /* @__PURE__ */ React3__default.default.createElement(HeadComponent, null, links) : links;
};

exports.LazyLoad = LazyLoad;
exports.OptimizedImage = OptimizedImage;
exports.PreconnectLink = PreconnectLink;
exports.PrefetchLink = PrefetchLink;
exports.PreloadLink = PreloadLink;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map