

const ErrorAlert = ({message} :{message:string}) => { 

    return (
        <div className="flex justify-center items-center">
        <div role="alert" className="w-2xs h-2xs">
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 ">
          Error
        </div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>{message}</p>
        </div>
      </div>
      </div>
    )
}

export default ErrorAlert;