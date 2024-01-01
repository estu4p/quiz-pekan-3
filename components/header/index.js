import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-4 px-6 bg-blue-700">
      <div className="flex justify-between items-center">
        <div>
          <Image
            src={"/next.svg"}
            alt="Vercel Logo"
            width={110}
            height={10}
            className="text-white"
            style={{ filter: "invert(100%)" }}
          />
        </div>
        <div className="flex gap-4">
          <Link href={"/"} className="text-white hover:text-black">
            Home
          </Link>
          <Link href={"/notes"} className="text-white hover:text-black">
            Notes
          </Link>
        </div>
      </div>
    </header>
  );
}
