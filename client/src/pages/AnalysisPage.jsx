import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import MainLayout from '../components/MainLayout'
function AnalysisPage() {
  const { documentId } = useParams()
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/analysis/${documentId}`)
        setAnalysis(response.data)
      } catch (error) {
        console.error('Failed to fetch analysis:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysis()
  }, [documentId])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <>
          <MainLayout>

    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Document Analysis</h2>
      
      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-3">Key Insights</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <ul className="space-y-2">
              {analysis?.insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Market Positioning</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p>{analysis?.marketPositioning}</p>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-6">
          <section>
            <h3 className="text-xl font-semibold mb-3">Strengths</h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <ul className="space-y-2">
                {analysis?.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Weaknesses</h3>
            <div className="bg-red-50 p-4 rounded-lg">
              <ul className="space-y-2">
                {analysis?.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">⚠</span>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <section>
          <h3 className="text-xl font-semibold mb-3">Opportunities</h3>
          <div className="bg-purple-50 p-4 rounded-lg">
            <ul className="space-y-2">
              {analysis?.opportunities.map((opportunity, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-500 mr-2">→</span>
                  {opportunity}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
    </MainLayout>
    </>
  )
}

export default AnalysisPage