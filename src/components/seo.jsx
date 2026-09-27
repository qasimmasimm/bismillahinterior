import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Reusable SEO component for managing on-page and technical metadata per route.
 */
export default function SEO({
  title,
  description,
  image = "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  type = "website",
  schema = null,
}) {
  const location = useLocation();
  const siteUrl = "https://bismillahinteriors.pk";
  const canonicalUrl = `${siteUrl}${location.pathname}`;
  const fullTitle = title
    ? `${title} | Bismillah Interiors Lahore`
    : "Bismillah Interiors | Premium Wall Panels, Ceiling & Flooring Lahore";
  const metaDescription =
    description ||
    "Bismillah Interiors Lahore provides premium wall panels, 2x2 ceiling solutions, wallpapers, wood/SPC flooring, and decorative interior finishes for homes and commercial spaces.";

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Set Standard Meta Tags
    setMetaTag("name", "description", metaDescription);
    setMetaTag("name", "robots", "index, follow");

    // 3. Set Open Graph Tags
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", metaDescription);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:site_name", "Bismillah Interiors");
    setMetaTag("property", "og:locale", "en_PK");

    // 4. Set Twitter/X Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", metaDescription);
    setMetaTag("name", "twitter:image", image);

    // 5. Set Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 6. Set Structured Data if provided
    let schemaScript = document.getElementById("route-structured-data");
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.id = "route-structured-data";
        schemaScript.type = "application/ld+json";
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [fullTitle, metaDescription, canonicalUrl, image, type, schema]);

  return null;
}
