import { useState, useRef } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function App() {
  const [original, setOriginal] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('请上传图片文件')
      return
    }
    setError(null)
    setResult(null)
    setOriginal(URL.createObjectURL(file))
    processImage(file)
  }

  const processImage = async (file) => {
    setLoading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch(`${API_URL}/remove-bg`, { method: 'POST', body: form })
      if (!res.ok) throw new Error('处理失败，请重试')
      const blob = await res.blob()
      setResult(URL.createObjectURL(blob))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold text-indigo-700 mb-2">Image Background Remover</h1>
      <p className="text-gray-500 mb-10">上传图片，一键去除背景，免费使用</p>

      {/* Upload Area */}
      <div
        className={`w-full max-w-xl border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors
          ${dragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-white hover:border-indigo-400'}`}
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => handleFile(e.target.files[0])} />
        <div className="text-5xl mb-3">🖼️</div>
        <p className="text-gray-600 font-medium">拖拽图片到这里，或点击上传</p>
        <p className="text-gray-400 text-sm mt-1">支持 JPG、PNG、WEBP</p>
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Preview */}
      {(original || result) && (
        <div className="mt-10 w-full max-w-3xl grid grid-cols-2 gap-6">
          {original && (
            <div className="bg-white rounded-2xl shadow p-4">
              <p className="text-sm text-gray-500 mb-2 font-medium">原图</p>
              <img src={original} alt="original" className="w-full rounded-lg object-contain max-h-64" />
            </div>
          )}
          <div className="bg-white rounded-2xl shadow p-4 relative">
            <p className="text-sm text-gray-500 mb-2 font-medium">去背景结果</p>
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
              </div>
            ) : result ? (
              <>
                <div className="rounded-lg overflow-hidden max-h-64 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZTVlN2ViIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=')]">
                  <img src={result} alt="result" className="w-full object-contain max-h-64" />
                </div>
                <a href={result} download="removed_bg.png"
                  className="mt-3 block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors">
                  ⬇️ 下载 PNG
                </a>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}
