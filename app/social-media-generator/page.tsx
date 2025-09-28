"use client";

import { useState } from "react";
import InstagramPreview from "../components/InstagramPreview";
import FacebookPreview from "../components/FacebookPreview";

interface GeneratedContent {
  text: string;
  imageUrl?: string;
}

export default function SocialMediaGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [imageSuggestion, setImageSuggestion] = useState("");
  const [platform, setPlatform] = useState<"instagram" | "facebook" | "both">("both");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!topic.trim()) {
      setError("Please enter a topic for your post");
      return;
    }

    setLoading(true);
    setError("");
    setGeneratedContent(null);

    try {
      const response = await fetch("/api/generate-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          imageSuggestion: imageSuggestion.trim() || undefined,
          platform,
        }),
      });

      const data: { success: boolean; data?: GeneratedContent; error?: string } = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to generate content");
      }

      if (data.data) {
        setGeneratedContent(data.data);
      }
    } catch (err) {
      console.error("Error generating content:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedContent(null);
    setError("");
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Instructions Section */}
      <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h2 className="text-lg font-semibold text-blue-800">Social Media Post Generator</h2>
        <p className="mt-2 text-sm text-blue-700">
          Generate engaging social media posts with AI assistance. Describe your topic and optionally suggest imagery.
          The AI will create platform-optimized content with appropriate hashtags and calls-to-action.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-6 shadow">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                Post Topic *
              </label>
              <textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Describe what you want to post about..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={3}
                maxLength={500}
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">{topic.length}/500 characters</p>
            </div>

            <div>
              <label htmlFor="imageSuggestion" className="block text-sm font-medium text-gray-700 mb-2">
                Image Suggestion (Optional)
              </label>
              <input
                type="text"
                id="imageSuggestion"
                value={imageSuggestion}
                onChange={(e) => setImageSuggestion(e.target.value)}
                placeholder="Describe what kind of image would complement your post..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={200}
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">{imageSuggestion.length}/200 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Platform
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="instagram"
                    checked={platform === "instagram"}
                    onChange={(e) => setPlatform(e.target.value as "instagram")}
                    className="mr-2"
                    disabled={loading}
                  />
                  Instagram
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="facebook"
                    checked={platform === "facebook"}
                    onChange={(e) => setPlatform(e.target.value as "facebook")}
                    className="mr-2"
                    disabled={loading}
                  />
                  Facebook
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="both"
                    checked={platform === "both"}
                    onChange={(e) => setPlatform(e.target.value as "both")}
                    className="mr-2"
                    disabled={loading}
                  />
                  Both
                </label>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading || !topic.trim()}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Generating..." : "Generate Post"}
              </button>

              {generatedContent && (
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={loading}
                  className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Reset
                </button>
              )}
            </div>
          </form>

          {/* Generated Text Display */}
          {generatedContent && (
            <div className="rounded-lg border bg-white p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Generated Text</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-800 whitespace-pre-wrap">
                  {generatedContent.text}
                </p>
              </div>
              <div className="flex justify-end mt-3">
                <button
                  onClick={() => navigator.clipboard.writeText(generatedContent.text)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Copy Text
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          {generatedContent && (
            <>
              {platform === "instagram" || platform === "both" ? (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Instagram Preview</h3>
                  <InstagramPreview
                    text={generatedContent.text}
                    imageUrl={generatedContent.imageUrl}
                  />
                </div>
              ) : null}

              {platform === "facebook" || platform === "both" ? (
                <div className={platform === "both" ? "mt-8" : ""}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Facebook Preview</h3>
                  <FacebookPreview
                    text={generatedContent.text}
                    imageUrl={generatedContent.imageUrl}
                  />
                </div>
              ) : null}
            </>
          )}

          {!generatedContent && (
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7H3a1 1 0 01-1-1V5a1 1 0 011-1h4zM9 7v10h6V7H9z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No content generated yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Fill out the form and click &quot;Generate Post&quot; to see your social media previews here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}