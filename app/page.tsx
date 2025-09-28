
export default function Home() {
  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="space-y-8">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">🛠️</span>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-slate-900 tracking-tight">
                Welcome to StrongStreet
                <span className="block text-blue-600">Internal Tools</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Streamline your daily operations with our collection of purpose-built tools.
                From delivery manifests to data reconciliation, we&apos;ve got your workflow covered.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600">All systems operational</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>🚀</span>
                <span>Built for efficiency</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            What can you accomplish today?
          </h2>
          <p className="text-lg text-slate-600">
            Each tool is designed to save you time and reduce manual work
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Manifest Generation */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Delivery Manifests</h3>
            <p className="text-slate-600 mb-6">
              Upload your customer lists and instantly generate professional delivery manifests ready for print or editing.
            </p>
            <div className="flex items-center text-sm text-emerald-600 font-medium">
              <span>Excel → DOCX</span>
              <span className="ml-2">✨</span>
            </div>
          </div>

          {/* Data Reconciliation */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-violet-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Usage Reconciliation</h3>
            <p className="text-slate-600 mb-6">
              Streamline your spreadsheet reconciliation process with automated data matching and validation tools.
            </p>
            <div className="flex items-center text-sm text-violet-600 font-medium">
              <span>Coming Soon</span>
              <span className="ml-2">🔜</span>
            </div>
          </div>

          {/* More Tools */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">More Tools</h3>
            <p className="text-slate-600 mb-6">
              Additional workflow automation tools are being developed based on your team&apos;s needs and feedback.
            </p>
            <div className="flex items-center text-sm text-red-500 font-medium">
              <span>In Development</span>
              <span className="ml-2">🚧</span>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Ready to get started?
              </h2>
              <p className="text-lg text-slate-600">
                Choose a tool from the sidebar to begin streamlining your workflow
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-lg shadow-sm border border-slate-200">
                <span className="text-2xl">👈</span>
                <span className="text-slate-700 font-medium">Browse tools in the sidebar</span>
              </div>
              <div className="text-slate-400">or</div>
              <div className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors cursor-pointer">
                <span className="text-xl">📋</span>
                <span className="font-medium">Start with Manifest Generation</span>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-500">
                Need help? Each tool includes step-by-step instructions and helpful tips.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
