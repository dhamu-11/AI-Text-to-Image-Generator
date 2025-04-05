"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ImageIcon, Loader2 } from "lucide-react";
import * as fal from "@fal-ai/serverless-client";
import Image from "next/image";

fal.config({
  credentials: process.env.NEXT_PUBLIC_FAL_KEY!,
});

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("english");
  const [mode, setMode] = useState<"single" | "story">("single");

  // 🔁 Translate Tamil to English using Argos
  const translateToEnglish = async (text: string): Promise<string> => {
    try {
      const response = await fetch(
        "https://translate.argosopentech.com/translate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            q: text,
            source: "ta",
            target: "en",
            format: "text",
          }),
        }
      );

      if (!response.ok) {
        console.error("Translation API Error:", await response.text());
        return text;
      }

      const data = await response.json();
      console.log("✅ Translated Text:", data.translatedText);
      return data.translatedText || text;
    } catch (err) {
      console.error("❌ Translation failed:", err);
      return text;
    }
  };

  const enhanceTamilPrompt = (text: string) => {
    if (text.trim().split(" ").length <= 3) {
      return `ஒரு அழகான காட்சி: ${text}`;
    }
    return text;
  };

  const generateImage = async () => {
    try {
      setLoading(true);
      let finalPrompt = prompt;

      if (language === "tamil") {
        const enhanced = enhanceTamilPrompt(prompt);
        finalPrompt = await translateToEnglish(enhanced);
        console.log("🈶 Translated Prompt:", finalPrompt);
      }

      const count = mode === "story" ? 3 : 1;
      const urls: string[] = [];

      for (let i = 0; i < count; i++) {
        const result = await fal.run("fal-ai/fast-sdxl", {
          input: {
            prompt: finalPrompt,
            negative_prompt: "blurry, bad quality, distorted, disfigured",
            num_inference_steps: 40,
            guidance_scale: 7.5,
          },
        });

        const imageUrl = result.images[0].url;
        urls.push(imageUrl);

        await fetch("/api/save-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl }),
        });
      }

      setImageUrls(urls);
    } catch (error) {
      console.error("Error generating or saving image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Image
                src="/favicon.ico"
                alt="Logo"
                width={60}
                height={60}
                className="rounded"
              />
              <h1 className="text-4xl font-bold">AI Text to Image Generator</h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Generate images using prompts in <strong>English or Tamil</strong>
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex gap-4 justify-center">
            <label
              className={`cursor-pointer px-4 py-2 rounded-lg border transition-all ${
                language === "english"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
              }`}
            >
              <input
                type="radio"
                value="english"
                checked={language === "english"}
                onChange={() => setLanguage("english")}
                className="hidden"
              />
              English
            </label>

            <label
              className={`cursor-pointer px-4 py-2 rounded-lg border transition-all ${
                language === "tamil"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
              }`}
            >
              <input
                type="radio"
                value="tamil"
                checked={language === "tamil"}
                onChange={() => setLanguage("tamil")}
                className="hidden"
              />
              தமிழ்
            </label>
          </div>

          {/* Prompt Input + Mode Selection */}
          <Card className="p-6 space-y-4">
            <label className="block text-sm font-medium">
              Describe your image ({language === "tamil" ? "தமிழ்" : "English"})
            </label>
            <Textarea
              placeholder={
                language === "tamil"
                  ? "ஒரு தங்க சூரிய அஸ்தமனத்தின் போது மேகங்களுக்கு மேலே மிதக்கும் ஒரு கம்பீரமான கோட்டை, ஒளிரும் மின்மினிப் பூச்சிகளால் சூழப்பட்டுள்ளது"
                  : "A majestic castle floating above the clouds during a golden sunset, surrounded by glowing fireflies."
              }
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-32"
            />

            {/* Image Mode Selector */}
            <div className="flex justify-center gap-4">
              {["single", "story"].map((option) => (
                <label
                  key={option}
                  className={`cursor-pointer px-6 py-2 rounded-lg border text-sm font-medium transition-all duration-200 shadow-sm
        ${
          mode === option
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:shadow"
        }`}
                >
                  <input
                    type="radio"
                    value={option}
                    checked={mode === option}
                    onChange={() => setMode(option as "single" | "story")}
                    className="hidden"
                  />
                  {option === "single" ? "Single Image" : "Story (3 Images)"}
                </label>
              ))}
            </div>

            <Button
              onClick={generateImage}
              disabled={loading || !prompt}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Generate Image
                </>
              )}
            </Button>
          </Card>

          {/* Output Images */}
          {imageUrls.length > 0 && (
            <Card className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">
                {mode === "story"
                  ? "Generated Story Images"
                  : "Generated Image"}
              </h2>
              <div
                className={`grid ${
                  mode === "story" ? "md:grid-cols-3" : ""
                } gap-4`}
              >
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-square w-full overflow-hidden rounded-lg"
                  >
                    <Image
                      src={url}
                      alt={`Generated image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
