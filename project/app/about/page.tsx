"use client";

import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">
        📱 AI Image Generator App
      </h1>

      {/* Overview */}
      <Card className="p-6 mb-6 space-y-4">
        <h2 className="text-2xl font-semibold">📖 Project Overview</h2>
        <p className="text-gray-700 dark:text-gray-300">
          This application was developed as our final year project for the B.E.
          Information Technology course at <strong>Annamalai University</strong>
          . It allows users to generate AI-powered images from simple text
          prompts in both English and Tamil. A built-in translator ensures
          high-quality results from Tamil inputs.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          In addition to generating single images, the app includes a unique{" "}
          <strong>"Story Mode"</strong> that creates a sequence of three images
          based on a single prompt — allowing users to visualize short stories
          or scenes in multiple frames.
        </p>
      </Card>

      {/* Tools */}
      <Card className="p-6 mb-6 space-y-4">
        <h2 className="text-2xl font-semibold">🛠️ Tools & Technologies Used</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>Next.js 14 (App Router + TypeScript)</li>
          <li>Tailwind CSS (Modern Responsive Design)</li>
          <li>Argos OpenTech Translation API (Tamil → English)</li>
          <li>Serverless API Routes (Image saving and gallery)</li>
          <li>Custom Story Mode (Multi-image rendering)</li>
        </ul>
      </Card>

      {/* Team */}
      <Card className="p-6 mb-6 space-y-4">
        <h2 className="text-2xl font-semibold">👨‍💻 Project Team Members</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="px-4 py-2 border">S.No</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Roll Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border">1</td>
                <td className="px-4 py-2 border">Team Mate 1</td>
                <td className="px-4 py-2 border">21380100xx</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">2</td>
                <td className="px-4 py-2 border">Nusra</td>
                <td className="px-4 py-2 border">21380100XX</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">3</td>
                <td className="px-4 py-2 border">Team Mate 3</td>
                <td className="px-4 py-2 border">21380100XX</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">4</td>
                <td className="px-4 py-2 border">Team Mate 4</td>
                <td className="px-4 py-2 border">21380100XX</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Features */}
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold">📌 Key Features</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>Image generation based on natural language prompts</li>
          <li>Supports English and Tamil input</li>
          <li>
            Automatic Tamil-to-English translation for better AI understanding
          </li>
          <li>Single Image and Story Mode (3-image sequence) options</li>
          <li>Real-time image preview with modern UI</li>
          <li>Image gallery saved locally for future reference</li>
        </ul>
      </Card>
    </main>
  );
}
