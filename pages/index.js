import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layouts"));

export default function Home() {
  return (
    <LayoutComponent
      metaTitle={"Home Page"}
      metaDescription={"Halaman home web quis sanbercode"}
    >
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">Ini halaman home</h1>
      </div>
    </LayoutComponent>
  );
}
