import Image from "next/image";

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
      {/* r-gradient */}
      <div className="hero_line_gradient absolute"></div>
      {/* Red glow effect */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ellipse%204-zLJMw8o58uhWtflwNCUN2IGlrP8txt.png"
        alt=""
        width={1200}
        height={200}
        className="absolute -bottom-20 z-10 h-40 w-full backdrop-blur-[2px]"
      />
    </section>
  );
}
