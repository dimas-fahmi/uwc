import Image from "next/image";
import Link from "next/link";
import LayoutGallery from "./LayoutComponents/Gallery";

const ParvusLayout = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Content */}
      <main className="p-4 md:p-12 flex flex-col gap-4 min-h-dvh max-h-dvh">
        {/* Header */}
        <header>
          <Link href={"/"}>
            <Image
              width={180}
              height={72}
              src={"/res/logo/label-cropped.png"}
              alt="UWC Logo"
              className="w-[180px]"
            />
          </Link>
        </header>

        <div className="flex-1 h-full overflow-x-hidden overflow-y-scroll custom-scrollbar no-track md:pe-[5px]">
          {children}
        </div>

        <footer>
          <p className="text-xs opacity-80">
            Designed and Developed by Dimas Fahmi with NextJS
          </p>
        </footer>
      </main>

      {/* Gallery */}
      <LayoutGallery />
    </div>
  );
};

export default ParvusLayout;
