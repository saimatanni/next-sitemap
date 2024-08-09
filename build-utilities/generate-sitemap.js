//static sitemap

const fs = require("fs");
const path = require("path");

function generateSitemap() {
  // pages data
  const pages = [
    { url: "https://getyourtiqet.com/", lastmod: "2024-06-06T15:43:45+00:00", priority: "1.0" },
    { url: "https://getyourtiqet.com/services", lastmod: "2024-06-06T15:43:45+00:00", priority: "0.8" },
    { url: "https://getyourtiqet.com/blogs", lastmod: "2024-06-06T15:43:45+00:00", priority: "0.8" },
    { url: "https://getyourtiqet.com/sales_point", lastmod: "2024-06-06T15:43:45+00:00", priority: "0.8" },
    { url: "https://getyourtiqet.com/dashboard", lastmod: "2024-06-06T15:43:45+00:00", priority: "0.8" },
  ];

  // generate sitemap
  const sitemap = generateSitemapXml(pages);
  
  // Write xml site map
  fs.writeFileSync(path.resolve("./public/sitemap.xml"), sitemap);
}

function generateSitemapXml(pages) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  pages.forEach((page) => {
    xml += `  <url>\n`;
    xml += `    <loc>${page.url}</loc>\n`;
    xml += `    <lastmod>${page.changefreq || "daily"}</lastmod>\n`;
    xml += `    <priority>${page.priority || "0.5"}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}

generateSitemap();
