// http://localhost:3000/api/text

import { NextResponse } from "next/server";
import axios from "axios";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface RequestPayload {
  model: string;
  messages: Message[];
  max_tokens: number;
  stop?: string;
  temperature: number;
  frequency_penalty: number;
  presence_penalty: number;
}

const API_KEY = process.env.OPENAI_API_KEY ?? "no_key";

export async function POST(request: Request) {
  try {
    const data: RequestPayload = await request.json();
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language":
          "en-US,en;q=0.9,zh-TW;q=0.8,zh-HK;q=0.7,zh-Hant;q=0.6,zh;q=0.5",
        Authorization: `Bearer ${API_KEY}`,
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
        Cookie:
          "__cf_bm=LWgPM_N2g5U3fV7tllHifyuAPMQ51W2V783PkXnfDQI-1730308182-1.0.1.1-J8zqWxwu79seVx.rFb4TN41gkM2ZD_Amrwh4qyuAhCORAjeRBD9GdzI8rOLfhJqg.pQwXgcqDgdicqIszX3IIA; _cfuvid=rrhOMoZexwtOFJGchUwnV85i_j7USRf2k..yGAMFun8-1730308182272-0.0.1.1-604800000",
      },
      data: data,
    };

    const response = await axios.request(config);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Request Error",
      //@ts-expect-error error is unknown
      error: error.message,
    });
  }
}
