import { http, HttpResponse } from 'msw';

export const handlers = [
  // Intercept the request to fetch posts from Ghost API
  http.get('https://example.com/ghost/api/admin/posts', () => {
    return HttpResponse.json({
      posts:
        [
          {
            title: 'Test Post 1',
            published_at: new Date().toISOString(),
            feature_image: 'https://example.com/image1.jpg',
            excerpt: 'Excerpt of test post 1',
            url: 'https://example.com/test-post-1'
          },
          {
            title: 'Test Post 2',
            published_at: new Date().toISOString(),
            feature_image: 'https://example.com/image2.jpg',
            excerpt: 'Excerpt of test post 2',
            url: 'https://example.com/test-post-2'
          }
        ]
    });
  }),
  http.post('https://example.com/ghost/api/admin/posts', () => {
    return HttpResponse.json({ success: true });
  })
];
