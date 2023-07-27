import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEI,
});
if (!configuration.apiKey) throw new Error("OPENAI_API_KEI is not defined");
const openai = new OpenAIApi(configuration);

export async function POST(request) {
  const body = await request.json();
  if (!body.prompt || body.prompt.lenght === 0)
    return NextResponse.error(new Error("Pronpt is required", { status: 400 }));
  //----------------------------------------
  try {
    const response = await openai.createCompletion({
      prompt: `Da-me uma piada engraçadas com o tema ${body.prompt}`,
      model: "text-davinci-003",
      temperature: 0.7,
      max_tokens: 60,
    });
    return NextResponse.json(response.data.choices[0].text);
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}
