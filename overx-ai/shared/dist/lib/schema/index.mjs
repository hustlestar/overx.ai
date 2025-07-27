// lib/schema/organization.ts
function createOrganizationSchema(config) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: config.name,
    url: config.url,
    logo: config.logo
  };
  if (config.sameAs) {
    schema.sameAs = config.sameAs;
  }
  if (config.contactPoint) {
    schema.contactPoint = {
      "@type": "ContactPoint",
      ...config.contactPoint
    };
  }
  if (config.address) {
    schema.address = {
      "@type": "PostalAddress",
      ...config.address
    };
  }
  return schema;
}
function createWebSiteSchema(config) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.name,
    url: config.url
  };
  if (config.potentialAction) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${config.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    };
  }
  return schema;
}

// lib/schema/article.ts
function createArticleSchema(config) {
  const authors = Array.isArray(config.author) ? config.author : [config.author];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: config.headline,
    description: config.description,
    image: config.image,
    datePublished: config.datePublished,
    dateModified: config.dateModified || config.datePublished,
    author: authors.map((author) => ({
      "@type": "Person",
      name: author.name,
      ...author.url && { url: author.url },
      ...author.image && { image: author.image }
    })),
    publisher: {
      "@type": "Organization",
      name: config.publisher.name,
      logo: {
        "@type": "ImageObject",
        url: config.publisher.logo
      }
    }
  };
  if (config.mainEntityOfPage) {
    schema.mainEntityOfPage = {
      "@type": "WebPage",
      "@id": config.mainEntityOfPage
    };
  }
  if (config.keywords) {
    schema.keywords = config.keywords.join(", ");
  }
  if (config.articleSection) {
    schema.articleSection = config.articleSection;
  }
  if (config.wordCount) {
    schema.wordCount = config.wordCount;
  }
  return schema;
}
function createBlogPostingSchema(config) {
  const schema = createArticleSchema(config);
  schema["@type"] = "BlogPosting";
  if (config.blogUrl) {
    schema.isPartOf = {
      "@type": "Blog",
      "@id": config.blogUrl
    };
  }
  return schema;
}

// lib/schema/product.ts
function createProductSchema(config) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: config.name,
    description: config.description,
    image: config.image,
    brand: {
      "@type": "Brand",
      name: config.brand
    }
  };
  if (config.sku) {
    schema.sku = config.sku;
  }
  if (config.mpn) {
    schema.mpn = config.mpn;
  }
  if (config.offers) {
    const offers = Array.isArray(config.offers) ? config.offers : [config.offers];
    schema.offers = offers.map((offer) => ({
      "@type": "Offer",
      ...offer
    }));
  }
  if (config.aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ...config.aggregateRating
    };
  }
  if (config.review) {
    schema.review = config.review.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author
      },
      reviewRating: {
        "@type": "Rating",
        ...review.reviewRating
      },
      ...review.reviewBody && { reviewBody: review.reviewBody },
      ...review.datePublished && { datePublished: review.datePublished }
    }));
  }
  return schema;
}
function createSoftwareApplicationSchema(config) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: config.name,
    description: config.description,
    image: config.image,
    applicationCategory: config.applicationCategory,
    offers: config.offers,
    aggregateRating: config.aggregateRating,
    review: config.review
  };
  if (config.operatingSystem) {
    schema.operatingSystem = config.operatingSystem;
  }
  if (config.applicationSubCategory) {
    schema.applicationSubCategory = config.applicationSubCategory;
  }
  if (config.permissions) {
    schema.permissions = config.permissions.join(", ");
  }
  if (config.screenshot) {
    schema.screenshot = config.screenshot;
  }
  return schema;
}

export { createArticleSchema, createBlogPostingSchema, createOrganizationSchema, createProductSchema, createSoftwareApplicationSchema, createWebSiteSchema };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map