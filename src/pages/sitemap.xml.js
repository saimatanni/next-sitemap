// import fs from 'fs';
// import path from 'path';

// export async function getServerSideProps({ res }) {
//   // Static pages data
//   const staticPages = [
//     { url: "https://www.example.com", changefreq: "monthly", priority: "1.0" },
//     { url: "https://www.example.com/details", changefreq: "yearly", priority: "1.0" },
//     { url: "https://www.example.com/product", changefreq: "daily", priority: "1.0" },
//     { url: "https://www.example.com/about", changefreq: "weekly", priority: "0.8" },
//   ];

//   // Fetch dynamic pages data from JSONPlaceholder API
//   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await response.json();
//   const dynamicPages = data.map((post) => ({
//     url: `https://www.example.com/posts/${post.id}`,
//     changefreq: "daily",
//     priority: "0.7",
//   }));

//   // Combine static and dynamic pages
//   const pages = [ ...dynamicPages];

//   // Generate sitemap
//   const sitemap = generateSitemapXml(pages);

//   // Write XML sitemap to the public directory
//   fs.writeFileSync(path.resolve('./public/sitemap.xml'), sitemap);

//   // Write sitemap to response
//   res.setHeader('Content-Type', 'application/xml');
//   res.write(sitemap);
//   res.end();

//   return { props: {} };
// }

// const Sitemap = () => {
//   return null;
// };

// export default Sitemap;

// function generateSitemapXml(pages) {
//   let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
//   xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

//   pages.forEach((page) => {
//     xml += `  <url>\n`;
//     xml += `    <loc>${page.url}</loc>\n`;
//     xml += `    <changefreq>${page.changefreq || "daily"}</changefreq>\n`;
//     xml += `    <priority>${page.priority || "0.5"}</priority>\n`;
//     xml += `  </url>\n`;
//   });

//   xml += `</urlset>`;
//   return xml;
// }


import fs from 'fs';
import path from 'path';

export async function getServerSideProps({ res }) {
  // Fetch dynamic pages data from JSONPlaceholder API
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  const dynamicPages = data.map((post) => ({
    url: `https://www.example.com/posts/${post.id}/?${post.title}`,
    changefreq: "daily",
    priority: "0.7",
  }));

  // Generate dynamic sitemap
  const dynamicSitemap = generateSitemapXml(dynamicPages);

  // Read static sitemap
  const staticSitemapPath = path.resolve('./public/sitemap-static.xml');
  const staticSitemap = fs.readFileSync(staticSitemapPath, 'utf8');

  // Combine static and dynamic sitemaps
  const combinedSitemap = combineSitemaps(staticSitemap, dynamicSitemap);

  // Write combined sitemap to the public directory
  fs.writeFileSync(path.resolve('./public/sitemap.xml'), combinedSitemap);

  // Write sitemap to response
  res.setHeader('Content-Type', 'application/xml');
  res.write(combinedSitemap);
  res.end();

  return { props: {} };
}

const Sitemap = () => {
  return null;
};

export default Sitemap;

function generateSitemapXml(pages) {
  let xml = '';
  pages.forEach((page) => {
    xml += `  <url>\n`;
    xml += `    <loc>${page.url}</loc>\n`;
    xml += `    <changefreq>${page.changefreq || "daily"}</changefreq>\n`;
    xml += `    <priority>${page.priority || "0.5"}</priority>\n`;
    xml += `  </url>\n`;
  });
  return xml;
}

function combineSitemaps(staticSitemap, dynamicSitemap) {
  // Remove closing </urlset> tag from static sitemap
  const staticSitemapWithoutClosingTag = staticSitemap.replace('</urlset>', '');
  
  // Combine static sitemap and dynamic sitemap content
//   const combinedSitemap = `${staticSitemapWithoutClosingTag}</urlset>`;
  const combinedSitemap = `${staticSitemapWithoutClosingTag}\n${dynamicSitemap}</urlset>`;
  
  return combinedSitemap;
}
