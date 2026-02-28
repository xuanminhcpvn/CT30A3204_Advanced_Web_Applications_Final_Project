
import Logout from "@/components/auth/Logout";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";

const DriveHomePage = () => {
  const profilePicture = null; // TODO: implement profile picture preview
  const user = useAuthStore((s) => s.user);

  function handleProfileChange(): void {
  }

  return (
    
    <div className="flex min-h-svh bg-background">
      {/* Sidebar */}
      <aside className="w-56 border-r bg-muted/40 p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">My Drive</h2>
          <p className="text-xs ">
            Manage your files and folders
          </p>
        </div>
        
    {/* Profile picture section */}
    <div className="mb-4 flex items-center gap-3">
      <div className="h-20 w-20 overflow-hidden rounded-full bg-background shadow">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            {user?.displayName}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-xs font-medium">Your profile</span>
        <label className="cursor-pointer text-xs text-primary hover:underline">
          Change picture
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileChange} // TODO: implement handler in component
          />
        </label>
      </div>
    </div>

        <nav className="space-y-1 text-sm">
          <button className="flex w-full items-center justify-between rounded-md bg-background px-3 py-2 text-left font-medium shadow-sm">
            <span>All files</span>
          </button>
          <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-muted-foreground hover:bg-background">
            <span>Favorites</span>
          </button>
          <button className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-muted-foreground hover:bg-background">
            <span>Trash</span>
          </button>
          <Logout></Logout>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 space-y-4 p-4 md:p-6">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Files
            </h1>
            <p className="text-sm text-muted-foreground">
              Upload, organize and share your documents.
            </p>
          </div>
        </header>

                 
        {/* Toolbar */}
        <section className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Upload + create new file */}
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Upload</Button>
            <Button size="sm" variant="outline">
              Create a new file
            </Button>
            {/* Later: dropdown for Move to trash / Delete permanently, Share, etc. */}
          </div>

          {/* Right: search + sort */}
          <div className="flex items-center gap-2">
            {/* Sort by */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Sort by</span>
              <select
                //value={sortBy}
                //</div>onChange={(e) =>
                  //setSortBy(e.target.value as "name" | "createdAt" | "updatedAt")
                //}
                className="rounded-md border bg-background px-2 py-1 text-xs"
              >
                <option value="name">Name</option>
                <option value="createdAt">Created</option>
                <option value="updatedAt">Last edited</option>
              </select>
            </div>
            {/* Search input */}
            <div className="w-40 sm:w-56">
              <input
                type="text"
                //value={searchQuery}
                //onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files..."
                className="w-full rounded-md border bg-background px-3 py-1.5 text-xs sm:text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
        </section>
        {/* File list placeholder */}
        <section className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
          No files yet. Upload or create a new file to get started.
        </section>
      </main>
    </div>
  );
};

export default DriveHomePage;
