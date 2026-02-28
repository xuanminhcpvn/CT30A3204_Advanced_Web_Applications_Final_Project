import { Link } from "react-router-dom"

const StartPage = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to your Drive
        </h1>
        <p className="text-muted-foreground">
          Store, edit and share your documents securely. Please log in or create an account to continue.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow transition hover:bg-primary/90"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StartPage;
