"use client";

import { useState, useRef } from "react";

type ProcessingState = 'idle' | 'processing' | 'success' | 'error';

export default function CoexReconciliationPage() {
  const [coexFile, setCoexFile] = useState<File | null>(null);
  const [grafanaFile, setGrafanaFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState<'none' | 'coex' | 'grafana'>('none');
  const [processingState, setProcessingState] = useState<ProcessingState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const coexInputRef = useRef<HTMLInputElement>(null);
  const grafanaInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    // Accept common data formats
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'application/json'
    ];

    const validExtensions = /\.(xls|xlsx|csv|json)$/i;

    if (!validTypes.includes(file.type) && !validExtensions.test(file.name)) {
      return { isValid: false, error: 'Please upload a data file (.xls, .xlsx, .csv, or .json)' };
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      return { isValid: false, error: 'File size must be less than 50MB' };
    }

    return { isValid: true };
  };

  const handleFileSelect = (file: File, type: 'coex' | 'grafana') => {
    const validation = validateFile(file);
    if (validation.isValid) {
      if (type === 'coex') {
        setCoexFile(file);
      } else {
        setGrafanaFile(file);
      }
      setErrorMessage('');
      setProcessingState('idle');
    } else {
      setErrorMessage(validation.error || 'Invalid file');
      setProcessingState('error');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'coex' | 'grafana') => {
    if (e.target.files?.length) {
      handleFileSelect(e.target.files[0], type);
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'coex' | 'grafana') => {
    e.preventDefault();
    setIsDragOver('none');

    const files = e.dataTransfer.files;
    if (files?.length) {
      handleFileSelect(files[0], type);
    }
  };

  const handleDragOver = (e: React.DragEvent, type: 'coex' | 'grafana') => {
    e.preventDefault();
    setIsDragOver(type);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver('none');
  };

  const handleUploadClick = (type: 'coex' | 'grafana') => {
    if (type === 'coex') {
      coexInputRef.current?.click();
    } else {
      grafanaInputRef.current?.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coexFile || !grafanaFile) return;

    setProcessingState('processing');

    try {
      // Create FormData to send both files
      const formData = new FormData();
      formData.append('coexFile', coexFile);
      formData.append('grafanaFile', grafanaFile);

      // Call the coex_upload endpoint
      const response = await fetch('/api/coex_upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      // Get the reconciliation result as a blob (could be Excel, PDF, etc.)
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `coex_reconciliation_${new Date().toISOString().split('T')[0]}.xlsx`;
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
          ? `Failed to process reconciliation: ${error.message}`
          : 'Failed to process reconciliation. Please try again.'
      );
    }
  };

  const resetForm = () => {
    setCoexFile(null);
    setGrafanaFile(null);
    setProcessingState('idle');
    setErrorMessage('');
    if (coexInputRef.current) coexInputRef.current.value = '';
    if (grafanaInputRef.current) grafanaInputRef.current.value = '';
  };

  const FileUploadZone = ({
    file,
    type,
    title,
    description
  }: {
    file: File | null;
    type: 'coex' | 'grafana';
    title: string;
    description: string;
  }) => (
    <div
      className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer ${
        isDragOver === type
          ? 'border-blue-400 bg-blue-50'
          : file
          ? 'border-green-300 bg-green-50'
          : errorMessage
          ? 'border-red-300 bg-red-50'
          : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
      }`}
      onDrop={(e) => handleDrop(e, type)}
      onDragOver={(e) => handleDragOver(e, type)}
      onDragLeave={handleDragLeave}
      onClick={() => handleUploadClick(type)}
    >
      <input
        ref={type === 'coex' ? coexInputRef : grafanaInputRef}
        type="file"
        accept=".xls,.xlsx,.csv,.json"
        onChange={(e) => handleFileChange(e, type)}
        style={{ display: 'none' }}
      />

      <div className="space-y-3">
        {file ? (
          <>
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <p className="font-medium text-green-800">{file.name}</p>
              <p className="text-sm text-green-600">
                {(file.size / 1024 / 1024).toFixed(2)} MB • Ready
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="w-12 h-12 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
              <span className="text-xl">📤</span>
            </div>
            <div>
              <p className="font-medium text-slate-700">{title}</p>
              <p className="text-sm text-slate-500">{description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
          📊 Coex Reconciliation
        </h1>
        <p className="mt-2 text-slate-600">Reconcile Coex output with Grafana data</p>
      </div>

      {/* Step-by-step Instructions */}
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-purple-900 mb-4 flex items-center gap-2">
            📝 How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                1
              </div>
              <div>
                <h3 className="font-medium text-purple-900">Upload Coex Output</h3>
                <p className="text-sm text-purple-700 mt-1">
                  Upload the Coex system output file (.xls, .xlsx, .csv, or .json)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                2
              </div>
              <div>
                <h3 className="font-medium text-purple-900">Upload Grafana Data</h3>
                <p className="text-sm text-purple-700 mt-1">
                  Upload the corresponding Grafana output file for comparison
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                3
              </div>
              <div>
                <h3 className="font-medium text-purple-900">Get Reconciliation</h3>
                <p className="text-sm text-purple-700 mt-1">
                  Download the reconciliation report showing matches and discrepancies
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
            📁 Upload Files for Reconciliation
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload Areas */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Step 1: Coex Output File
                </label>
                <FileUploadZone
                  file={coexFile}
                  type="coex"
                  title="Drop Coex file here"
                  description="Supports .xls, .xlsx, .csv, .json up to 50MB"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Step 2: Grafana Output File
                </label>
                <FileUploadZone
                  file={grafanaFile}
                  type="grafana"
                  title="Drop Grafana file here"
                  description="Supports .xls, .xlsx, .csv, .json up to 50MB"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-red-500">⚠️</span>
                  <p className="text-red-700 font-medium">Error</p>
                </div>
                <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4">
              {(coexFile || grafanaFile) && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-sm text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Clear all files
                </button>
              )}

              <div className="flex gap-3 ml-auto">
                {processingState === 'processing' ? (
                  <div className="flex items-center gap-3 px-6 py-3 bg-purple-50 text-purple-700 rounded-lg">
                    <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-medium">Processing reconciliation...</span>
                  </div>
                ) : processingState === 'success' ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
                      <span className="text-lg">✅</span>
                      <span className="font-medium">Reconciliation downloaded!</span>
                    </div>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
                    >
                      <span>🔄</span>
                      Process Another
                    </button>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={!coexFile || !grafanaFile}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                      coexFile && grafanaFile
                        ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg'
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <span>🔍</span>
                    Start Reconciliation
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