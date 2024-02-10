import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0].message.content);
  } catch (error) {
    // Ici, assurez-vous que vous vous référez à la classe d'erreur correctement.
    // Si 'OpenAI.RateLimitError' n'est pas défini, vous pourriez avoir besoin de référencer l'erreur différemment.
    if (error.name === 'RateLimitError') {
      console.error("Quota dépassé : ", error.message);
      // Logique de gestion du quota dépassé
    } else {
      console.error("Erreur inattendue : ", error);
    }
  }
}

main();
