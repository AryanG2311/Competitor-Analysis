import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';

function FileUpload({ onUploadSuccess, setIsUploading }) {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
      toast.success('File selected successfully!');
    } else {
      toast.error('Please upload a PDF file');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxSize: 10000000, // 10MB
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('document', file);

    try {
      setIsUploading(true);
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 5;
        });
      }, 100);

      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await response.json();
      onUploadSuccess(data.documentId);
      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload document');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-violet-300 to-white p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#F5F5F5] backdrop-blur-lg rounded-2xl shadow-xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 via-purple-400/10 to-violet-500/10 animate-gradient-xy" />
          
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <motion.div
              {...getRootProps()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative rounded-xl p-8
                border-2 border-dashed
                ${isDragActive 
                  ? 'border-violet-500 bg-violet-50/50' 
                  : 'border-gray-300 hover:border-violet-400 hover:bg-violet-50/30'
                }
                transition-colors duration-200
              `}
            >
              <input {...getInputProps()} />
              <motion.div 
                className="flex flex-col items-center space-y-4"
                initial={false}
                animate={{ scale: isDragActive ? 1.1 : 1 }}
              >
                <Upload className={`w-16 h-16 ${isDragActive ? 'text-violet-500' : 'text-gray-400'}`} />
                <div className="text-center">
                  <span className="relative cursor-pointer inline-block px-4 py-2 rounded-lg font-medium text-violet-600 
                    hover:text-violet-500 transition-colors duration-200">
                    Upload a file
                  </span>
                  <p className="text-sm text-gray-500 mt-2">
                    or drag and drop
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF files only (max. 10MB)
                </p>
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {file && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-lg backdrop-blur-sm shadow-sm">
                    <span className="text-sm text-gray-600 truncate flex-1 mr-4">
                      {file.name}
                    </span>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setFile(null)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                    >
                      <X size={20} />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {uploadProgress > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2"
              >
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-gray-500 text-center">{uploadProgress}% uploaded</p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={!file}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full py-3 px-4 rounded-lg
                font-medium text-sm relative
                transition-all duration-200
                ${!file
                  ? 'bg-[#F5F5F5] text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-violet-600 to-violet-700 text-white hover:from-violet-500 hover:to-violet-600'
                }
                focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
                shadow-lg hover:shadow-xl
              `}
            >
              {file ? 'Upload and Analyze' : 'Select a file to upload'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default FileUpload;
