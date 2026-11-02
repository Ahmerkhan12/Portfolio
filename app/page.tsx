import ClientPage from "./ClientPage";
import { existsSync } from "node:fs";
import path from "node:path";

export default function Page() {
  const portrait = ["portrait-cutout.webp", "portrait.webp", "portrait.jpg", "portrait.jpeg", "portrait.png"]
    .find((file) => existsSync(path.join(process.cwd(), "public", file)));

  return <ClientPage portraitSrc={portrait ? `/${portrait}` : undefined} />;
}
