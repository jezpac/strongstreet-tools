"use client";

import { useState, useRef } from "react";

type ProcessingState = 'idle' | 'processing' | 'success' | 'error';

export default function ManifestGenerationPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [processingState, setProcessingState] = useState<ProcessingState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(xls|xlsx)$/i)) {
      return { isValid: false, error: 'Please upload an Excel file (.xls or .xlsx)' };
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      return { isValid: false, error: 'File size must be less than 10MB' };
    }

    return { isValid: true };
  };

  const handleFileSelect = (selectedFile: File) => {
    const validation = validateFile(selectedFile);
    if (validation.isValid) {
      setFile(selectedFile);
      setErrorMessage('');
      setProcessingState('idle');
    } else {
      setFile(null);
      setErrorMessage(validation.error || 'Invalid file');
      setProcessingState('error');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files?.length) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setProcessingState('processing');

    try {
      // Create FormData to send the file
      const formData = new FormData();
      formData.append('customerList', file);

      // Call the upload_manifest endpoint
      const response = await fetch('/api/upload_manifest', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      // Get the DOCX file as a blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `manifest_${new Date().toISOString().split('T')[0]}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setProcessingState('success');
    } catch (error) {
      console.error('Upload error:', error);
      setProcessingState('error');
      setErrorMessage(
        error instanceof Error
          ? `Failed to generate manifest: ${error.message}`
          : 'Failed to generate manifest. Please try again.'
      );
    }
  };

  const resetForm = () => {
    setFile(null);
    setProcessingState('idle');
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
          📋 Manifest Generation
        </h1>
        <p className="mt-2 text-slate-600">Generate delivery manifests from customer lists</p>
      </div>

      {/* Step-by-step Instructions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
            📝 How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                1
              </div>
              <div>
                <h3 className="font-medium text-blue-900">Upload Customer List</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Upload an Excel file (.xls or .xlsx) containing your filtered customer data
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                2
              </div>
              <div>
                <h3 className="font-medium text-blue-900">Generate Manifest</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Our system processes your data and creates a formatted delivery manifest
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                3
              </div>
              <div>
                <h3 className="font-medium text-blue-900">Download & Print</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Download the DOCX manifest file for editing, printing, or sharing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            📁 Upload Customer List
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Drag & Drop Zone */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
                isDragOver
                  ? 'border-blue-400 bg-blue-50'
                  : file
                  ? 'border-green-300 bg-green-50'
                  : errorMessage
                  ? 'border-red-300 bg-red-50'
                  : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={handleUploadClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xls,.xlsx"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <div className="space-y-4">
                {file ? (
                  <>
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-green-800">{file.name}</p>
                      <p className="text-sm text-green-600">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to process
                      </p>
                    </div>
                  </>
                ) : errorMessage ? (
                  <>
                    <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-red-800">Upload Error</p>
                      <p className="text-sm text-red-600">{errorMessage}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📤</span>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-slate-700">
                        Drop your Excel file here or click to browse
                      </p>
                      <p className="text-sm text-slate-500">
                        Supports .xls and .xlsx files up to 10MB
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4">
              {file && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-sm text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Choose different file
                </button>
              )}

              <div className="flex gap-3 ml-auto">
                {processingState === 'processing' ? (
                  <div className="flex items-center gap-3 px-6 py-3 bg-blue-50 text-blue-700 rounded-lg">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-medium">Generating manifest...</span>
                  </div>
                ) : processingState === 'success' ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
                      <span className="text-lg">✅</span>
                      <span className="font-medium">Manifest downloaded!</span>
                    </div>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                    >
                      <span>🔄</span>
                      Generate Another
                    </button>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={!file}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                      file
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <span>🚀</span>
                    Generate Manifest
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}