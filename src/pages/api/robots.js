// src/pages/api/robots.js

export default function handler(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    
    // Basic robots.txt content
    const robotsContent = `
      User-agent: *
      Disallow: /orders/
      Disallow: /profile/
      Disallow: /login/
      Allow: /
      Sitemap: https://yourdomain.com/sitemap.xml
    `;
  
    // Write the content to the response
    res.write(robotsContent);
    res.end();
  }
  