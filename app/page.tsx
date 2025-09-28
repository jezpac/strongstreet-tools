
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 text-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl sm:text-3xl">🛠️</span>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                Welcome to StrongStreet
                <span className="block text-blue-600">Internal Tools</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
                Streamline your daily operations with our collection of purpose-built tools.
                From delivery manifests to data reconciliation, we&apos;ve got your workflow covered.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm text-slate-600">All systems operational</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                <span>🚀</span>
                <span>Built for efficiency</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
            What can you accomplish today?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 px-4">
            Each tool is designed to save you time and reduce manual work
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Manifest Generation */}
          <Link href="/manifest-generation" className="block group">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <span className="text-xl sm:text-2xl">📋</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3">Delivery Manifests</h3>
              <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
                Upload your customer lists and instantly generate professional delivery manifests ready for print or editing.
              </p>
              <div className="flex items-center text-xs sm:text-sm text-emerald-600 font-medium">
                <span>Excel → DOCX</span>
                <span className="ml-2">✨</span>
              </div>
            </div>
          </Link>

          {/* Data Reconciliation */}
          <Link href="/coex-reconciliation" className="block group">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-400 to-violet-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <span className="text-xl sm:text-2xl">📊</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3">Coex Reconciliation</h3>
              <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
                Reconcile Coex output with Grafana data to identify discrepancies and ensure data accuracy.
              </p>
              <div className="flex items-center text-xs sm:text-sm text-violet-600 font-medium">
                <span>Ready to use</span>
                <span className="ml-2">✅</span>
              </div>
            </div>
          </Link>

          {/* More Tools */}
          <div className="group bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <span className="text-xl sm:text-2xl">🎯</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 sm:mb-3">More Tools</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
              Additional workflow automation tools are being developed based on your team&apos;s needs and feedback.
            </p>
            <div className="flex items-center text-xs sm:text-sm text-red-500 font-medium">
              <span>In Development</span>
              <span className="ml-2">🚧</span>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 text-center">
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                Ready to get started?
              </h2>
              <p className="text-base sm:text-lg text-slate-600 px-4">
                Choose a tool from the navigation to begin streamlining your workflow
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center">
              <div className="flex items-center gap-3 px-4 sm:px-6 py-3 bg-white rounded-lg shadow-sm border border-slate-200 text-sm sm:text-base">
                <span className="text-lg sm:text-2xl">☝️</span>
                <span className="text-slate-700 font-medium">Browse tools above</span>
              </div>
              <div className="text-slate-400 text-sm sm:text-base">or</div>
              <Link
                href="/manifest-generation"
                className="flex items-center gap-3 px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                <span className="text-lg sm:text-xl">📋</span>
                <span className="font-medium">Start with Manifest Generation</span>
              </Link>
            </div>

            <div className="pt-6 sm:pt-8 border-t border-slate-200">
              <p className="text-xs sm:text-sm text-slate-500 px-4">
                Need help? Each tool includes step-by-step instructions and helpful tips.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
