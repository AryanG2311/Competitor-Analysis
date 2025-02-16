import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FileUpload from '../components/FileUpload'
import MainLayout from '../components/MainLayout'
function UploadPage() {
  const [isUploading, setIsUploading] = useState(false)
  const navigate = useNavigate()

  const handleUploadSuccess = (documentId) => {
    navigate(`/analysis/${documentId}`)
  }

  return (
    <>
          <MainLayout>

    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-r from-white-600/30 to-purple-600/30 rounded-lg shadow-white-600">
      <h2 className="text-xl font-semibold mb-6 text-amber-50">Upload Competitor Documents</h2>
      <FileUpload 
        onUploadSuccess={handleUploadSuccess}
        setIsUploading={setIsUploading}
      />
      {isUploading && (
        <div className="mt-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Analyzing document...</p>
        </div>
      )}
    </div>
    </MainLayout>

    </>
  )
}

export default UploadPage