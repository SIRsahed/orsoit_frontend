import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex h-[650px] w-full flex-col items-center justify-center bg-black">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Cybersecurity background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Red glow effect */}
      <div className="absolute bottom-[-100px] left-1/2 z-10 w-full -translate-x-1/2">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ellipse%204-zLJMw8o58uhWtflwNCUN2IGlrP8txt.png"
          alt=""
          width={1200}
          height={200}
          className="w-full"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 mx-auto mt-auto translate-y-[400px] px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-[56px]">
          YOUR 1 IT SECURITY AND SERVICE PROVIDERS
        </h1>
        <p className="mx-auto mb-8 text-base text-white/90 md:text-lg">
          At Orso, we are dedicated to protecting your business in the
          ever-evolving digital landscape. From proactive threat assessments to
          building tailor-made security solutions, our expert team delivers
          cutting-edge strategies to safeguard your assets. Whether you&apos;re
          a startup or an enterprise, we&apos;ve got you covered.
        </p>
        <Link
          href="#"
          className="inline-block min-w-[250px] bg-red-600 px-8 py-3 text-center font-medium text-white transition-colors duration-200 hover:bg-red-700"
        >
          Explore More
        </Link>
      </div>
    </section>
  );
}
