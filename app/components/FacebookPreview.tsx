"use client";

interface FacebookPreviewProps {
  text: string;
  imageUrl?: string;
}

export default function FacebookPreview({ text, imageUrl }: FacebookPreviewProps) {
  return (
    <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center p-4">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">SS</span>
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center">
            <p className="text-sm font-semibold text-gray-900">Strong Street Recyclers</p>
            <span className="ml-1 text-blue-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <span>2 min</span>
            <span className="mx-1">·</span>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-900 whitespace-pre-wrap">{text}</p>
      </div>

      {/* Image */}
      {imageUrl && (
        <div className="w-full">
          <img
            src={imageUrl}
            alt="Generated content"
            className="w-full max-h-96 object-cover"
          />
        </div>
      )}

      {/* Engagement Stats */}
      <div className="px-4 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-1">
              <div className="w-4 h-4 bg-blue-500 rounded-full border border-white flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
              </div>
              <div className="w-4 h-4 bg-red-500 rounded-full border border-white flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <span>47</span>
          </div>
          <span>12 comments · 3 shares</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-around py-2">
        <button className="flex items-center justify-center flex-1 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          <span className="text-sm">Like</span>
        </button>
        <button className="flex items-center justify-center flex-1 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-sm">Comment</span>
        </button>
        <button className="flex items-center justify-center flex-1 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          <span className="text-sm">Share</span>
        </button>
      </div>
    </div>
  );
}