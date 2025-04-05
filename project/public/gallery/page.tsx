import fs from "fs";
import path from "path";

export default function GalleryPage() {
  const galleryPath = path.join(process.cwd(), "public", "gallery");
  const images = fs.readdirSync(galleryPath);

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((file, i) => (
          <img
            key={i}
            src={`/gallery/${file}`}
            alt={`Generated ${i}`}
            className="rounded shadow"
          />
        ))}
      </div>
    </div>
  );
}
