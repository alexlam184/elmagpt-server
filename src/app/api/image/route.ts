// http://localhost:3000/api/image

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    // Get the JSON data from the request
    const data = await request.json();

    // Prepare the API request configuration
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.openai.com/v1/images/generations",
      headers: {
        accept: "application/json",
        "accept-language":
          "en-US,en;q=0.9,zh-TW;q=0.8,zh-HK;q=0.7,zh-Hant;q=0.6,zh;q=0.5",
        authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use environment variable for security
        "content-type": "application/json",
        origin: "https://fkis-chat-web.vercel.app",
        priority: "u=1, i",
        referer: "https://fkis-chat-web.vercel.app/",
        "sec-ch-ua":
          '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "sec-gpc": "1",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        // Add any additional headers if needed
      },
      data: {
        model: "dall-e-3",
        prompt: data.prompt, // Assuming prompt is sent in the request body
        n: 1,
        size: "1792x1024",
      },
    };

    // Make the API request
    const response = await axios.request(config);

    // Return the response from OpenAI
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Request Error",
      //@ts-expect-error error is unknown
      error: error.response ? error.response.data : error.message,
    });
  }
}
