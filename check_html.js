const http = require('http');

http.get('http://localhost:3000', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    const cssMatches = body.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi) || [];
    console.log('CSS Link Tags:', cssMatches);
    const styles = body.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
    console.log('Inline Style Tags count:', styles.length);
    console.log('Body length:', body.length);
    console.log('First 600 chars of body:');
    console.log(body.substring(0, 600));

    // Also test fetching the CSS file if link exists
    if (cssMatches.length > 0) {
      const hrefMatch = cssMatches[0].match(/href=["']([^"']+)["']/i);
      if (hrefMatch) {
        const cssUrl = 'http://localhost:3000' + hrefMatch[1];
        console.log('Fetching CSS from:', cssUrl);
        http.get(cssUrl, (cssRes) => {
          console.log('CSS Status:', cssRes.statusCode, cssRes.headers['content-type']);
        });
      }
    }
  });
}).on('error', (err) => {
  console.error('Fetch error:', err.message);
});
