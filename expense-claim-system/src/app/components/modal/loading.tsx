
const Loading = ({loading}: {loading: boolean}) => {
    return (
        <>
        {loading && (
            <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-3 font-medium">Loading...</p>
              </div>
            </div>
          )}
          </>
    )
}
export default Loading;