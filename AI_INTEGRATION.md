# AI Integration Guide

## Current Status
The social media generator tool is currently using mock responses for AI-generated content. To enable real AI integration with Cloudflare Workers AI, follow these steps:

## Enabling Real AI Integration

### 1. Update Wrangler Configuration
Add AI binding to your `wrangler.jsonc`:

```json
{
  // ... existing config
  "ai": {
    "binding": "AI"
  }
}
```

### 2. Update the API Route
Replace the mock functions in `/app/api/generate-post/route.ts` with real AI calls. The commented code at the bottom of the file shows the correct implementation.

### 3. Environment Setup
Ensure your Cloudflare account has Workers AI enabled and sufficient quotas for:
- Text generation (recommended: `@cf/meta/llama-3.1-8b-instruct`)
- Image generation (recommended: `@cf/stabilityai/stable-diffusion-xl-base-1.0`)

### 4. Security Best Practices
- Never expose AI binding in client-side code
- Implement rate limiting to prevent abuse
- Validate and sanitize all user inputs
- Use proper error handling for AI API failures

### 5. Cost Considerations
- Monitor AI usage through Cloudflare dashboard
- Set usage limits appropriate for your use case
- Consider caching frequently requested content

## Testing
Once real AI is enabled:
1. Test with various topic inputs
2. Verify image generation works with suggestions
3. Check error handling for failed AI requests
4. Validate output quality and appropriateness

## Mock Mode
The current mock implementation provides realistic responses for development and testing without incurring AI costs.