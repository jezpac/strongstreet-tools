"use client";

interface InstagramPreviewProps {
  text: string;
  imageUrl?: string;
}

export default function InstagramPreview({ text, imageUrl }: InstagramPreviewProps) {
  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center p-3 border-b border-gray-100">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">SS</span>
        </div>
        <div className="ml-3">
          <p className="text-sm font-semibold text-gray-900">strongstreetrecyclers</p>
          <p className="text-xs text-gray-500">2 min</p>
        </div>
        <div className="ml-auto">
          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image */}
      {imageUrl && (
        <div className="w-full aspect-square bg-gray-100">
          <img
            src={imageUrl}
            alt="Generated content"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-4">
          <button className="hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <button className="hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <button className="hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

      {/* Likes */}
      <div className="px-3 pb-1">
        <p className="text-sm font-semibold text-gray-900">127 likes</p>
      </div>

      {/* Caption */}
      <div className="px-3 pb-3">
        <div className="text-sm text-gray-900">
          <span className="font-semibold">strongstreetrecyclers</span>{' '}
          <span className="whitespace-pre-wrap">{text}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">View all 23 comments</p>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">2 minutes ago</p>
      </div>
    </div>
  );
}