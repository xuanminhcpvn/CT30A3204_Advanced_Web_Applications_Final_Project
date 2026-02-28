
export interface IDriveFilePermission {
  userId: string;
  role: "viewer" | "editor" | "owner";
}

export interface IDriveFile {
  _id: string;
  name: string;
  type: "text" | "spreadsheet" | "slide" | "image";
  contents: string;
  ownerId: string;
  folderId?: string | null;
  permissions: IDriveFilePermission[];
  visibility: "private" | "public" | "link";
  shareLink?: string | null;
  isFavorite: boolean;
  isSoftDeleted: boolean;
  softDeletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
