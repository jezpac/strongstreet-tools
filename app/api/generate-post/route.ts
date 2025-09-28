import { NextRequest, NextResponse } from 'next/server';

interface PostGenerationRequest {
  topic: string;
  imageSuggestion?: string;
  platform?: 'instagram' | 'facebook' | 'both';
}

interface PostGenerationResponse {
  success: boolean;
  data?: {
    text: string;
    imageUrl?: string;
  };
  error?: string;
}

const SYSTEM_PROMPT = `You are a social media content creator for Strong Street Recyclers, a Container Refund Point (CRP) in Baringa, Queensland, Australia. Generate engaging, authentic social media posts that:

BRAND CONTEXT:
- Strong Street Recyclers operates a Containers for Change recycling center
- Serves 6 local communities: Baringa, Little Mountain, Aroona, Pelican Waters, Bells Creek, and Golden Beach
- Purpose-built facility with reverse parking and dedicated machine spots
- Open 7 days a week (except public holidays)
- Focus on sustainability, community support, and environmental conservation

CONTENT REQUIREMENTS:
- Write for local community members who recycle containers for 10-cent refunds
- Use Australian spelling and terminology
- Maintain a friendly, community-focused, and environmentally conscious tone
- Include relevant hashtags (3-5 for Instagram, 1-3 for Facebook)
- Keep Instagram posts under 2200 characters and Facebook posts under 500 characters
- Use emojis appropriately (♻️ 🌱 💚 🗂️ etc.)

MESSAGING FOCUS:
- Encourage recycling and sustainability
- Highlight community benefits and environmental impact
- Promote the convenience and accessibility of the facility
- Share tips about eligible containers and recycling processes
- Celebrate community participation in waste reduction

CALL-TO-ACTIONS:
- Visit the CRP at Aura Business Park, Baringa
- Bring eligible containers for cash refunds
- Join the Containers for Change movement
- Reduce landfill waste in the local community`;

export async function POST(request: NextRequest) {
  try {
    const body: PostGenerationRequest = await request.json();

    if (!body.topic || typeof body.topic !== 'string' || body.topic.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Topic is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Sanitize input to prevent prompt injection
    const sanitizedTopic = body.topic.replace(/[<>]/g, '').trim();
    const sanitizedImageSuggestion = body.imageSuggestion?.replace(/[<>]/g, '').trim() || '';

    const platform = body.platform || 'instagram';
    const charLimit = platform === 'facebook' ? 500 : 2200;

    // In a real implementation, this would call Cloudflare Workers AI
    // For now, we'll simulate the API call with a mock response
    const textResponse = await generateMockText(sanitizedTopic, platform);

    let imageUrl: string | undefined;

    // Generate image if suggestion provided
    if (sanitizedImageSuggestion) {
      imageUrl = await generateMockImage(sanitizedImageSuggestion);
    }

    const response: PostGenerationResponse = {
      success: true,
      data: {
        text: textResponse,
        imageUrl
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Error generating social media post:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error occurred while generating content'
      },
      { status: 500 }
    );
  }
}

// Mock functions - In production, these would call Cloudflare Workers AI
async function generateMockText(topic: string, platform: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Sample recycling-focused content variations
  const recyclingPosts = {
    instagram: [
      `♻️ Did you know that every container you bring to Strong Street Recyclers makes a real difference?

${topic} is just one of the many ways our Baringa community is leading the charge in sustainability! 🌱

Our purpose-built CRP makes it easier than ever - with reverse parking and dedicated spots for each machine. Plus, you get 10 cents for every eligible container! 💚

Come visit us at Aura Business Park and join the Containers for Change movement. Together, we're reducing landfill waste and building a greener future for our local communities.

Open 7 days a week (except public holidays) 📅

#ContainersForChange #StrongStreetRecyclers #Baringa #Sustainability #Recycling #Community #Environment`,

      `🌟 Amazing news from our Strong Street Recyclers community!

${topic} continues to inspire us every day. It's incredible to see how our neighbours in Baringa, Little Mountain, Aroona, Pelican Waters, Bells Creek, and Golden Beach are embracing sustainable living!

Every bottle, can, and container you bring helps reduce waste and supports our local environment. Plus, those 10-cent refunds really add up! 💰

Ready to make a difference? Visit our CRP today and see how easy recycling can be with our convenient facility design.

What's your favourite thing about recycling? Share below! 👇

#Recycling #Community #GreenLiving #ContainersForChange #Queensland #EcoFriendly`,

      `💚 Here's something special about ${topic} and our recycling journey...

At Strong Street Recyclers, we believe every small action creates a big impact! Whether you're a regular visitor or thinking about your first trip to our CRP, you're part of something amazing.

Our facility at Aura Business Park is designed with YOU in mind - easy parking, simple process, and friendly service every time. We're open 7 days a week because sustainability doesn't take holidays!

Bring your eligible containers and turn your recycling into cash while helping our beautiful Queensland communities stay clean and green 🌱

#StrongStreetRecyclers #SustainableLiving #Baringa #RecyclingMatters #CommunityFirst #ContainersForChange`
    ],
    facebook: [
      `♻️ ${topic} reminds us why recycling matters! Every container you bring to Strong Street Recyclers helps our local communities reduce waste and earn cash refunds. Visit our CRP at Aura Business Park, Baringa - open 7 days a week!

#ContainersForChange #Recycling`,

      `Great to see our community embracing ${topic}! At Strong Street Recyclers, we make sustainability simple and rewarding. 10 cents per eligible container + helping the environment = a win-win for everyone! 🌱

#StrongStreetRecyclers #Community`,

      `${topic} is close to our hearts at Strong Street Recyclers. Our purpose-built facility in Baringa serves 6 local areas with convenient recycling solutions. Together, we're making a real difference! 💚

#Sustainability #Baringa`
    ]
  };

  const posts = recyclingPosts[platform as keyof typeof recyclingPosts] || recyclingPosts.instagram;
  const randomPost = posts[Math.floor(Math.random() * posts.length)];

  return randomPost;
}

async function generateMockImage(imageSuggestion: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Local recycling-themed images stored in public/images/recycling/
  const recyclingImages = [
    '/images/recycling/recycling-bins.jpg', // Recycling bins
    '/images/recycling/recycling-symbol.jpg', // Green recycling symbol
    '/images/recycling/plastic-bottles.jpg', // Plastic bottles
    '/images/recycling/cans-containers.jpg', // Cans and containers
    '/images/recycling/sustainable-living.jpg', // Sustainable living
    '/images/recycling/environmental-conservation.jpg', // Environmental conservation
  ];

  // If image suggestion contains recycling-related keywords, use relevant image
  const suggestion = imageSuggestion.toLowerCase();
  if (suggestion.includes('bin') || suggestion.includes('container')) {
    return recyclingImages[0]; // Recycling bins
  } else if (suggestion.includes('bottle') || suggestion.includes('plastic')) {
    return recyclingImages[2]; // Plastic bottles
  } else if (suggestion.includes('can') || suggestion.includes('aluminum')) {
    return recyclingImages[3]; // Cans and containers
  } else if (suggestion.includes('facility') || suggestion.includes('center')) {
    return recyclingImages[4]; // Sustainable facility
  } else if (suggestion.includes('environment') || suggestion.includes('green')) {
    return recyclingImages[5]; // Environmental conservation
  }

  // Default to random recycling image
  return recyclingImages[Math.floor(Math.random() * recyclingImages.length)];
}

// In production, here's how you would call Cloudflare Workers AI:
/*
async function generateTextWithAI(prompt: string, env: any): Promise<string> {
  const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt }
    ],
    max_tokens: 512,
    temperature: 0.7,
  });

  return response.response;
}

async function generateImageWithAI(prompt: string, env: any): Promise<string> {
  const response = await env.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', {
    prompt: `Professional, high-quality image for social media: ${prompt}`,
    num_steps: 20,
    guidance: 7.5,
  });

  // Convert blob to base64 or upload to R2 and return URL
  return response;
}
*/