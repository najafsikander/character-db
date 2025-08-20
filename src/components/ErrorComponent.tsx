const ErrorComponent = ({error}:{error:unknown}) => {
    return (
    <main className="p-6">
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <pre className="mt-3 whitespace-pre-wrap">{String(error)}</pre>
    </main>
  )
}

export default ErrorComponent;