interface BackgroundGlowProps {
  fixed?: boolean;
  blur?: number;
}

export default function BackgroundGlow({ fixed = false, blur = 120 }: BackgroundGlowProps) {
  const position = fixed ? "fixed" : "absolute";
  const z = fixed ? "z-0" : "";

  return (
    <>
      <div
        className={`${position} top-[-10%] right-[-10%] w-[60%] h-[60%] bg-teal-400/10 rounded-full pointer-events-none ${z}`}
        style={{ filter: `blur(${blur}px)` }}
      />
      <div
        className={`${position} bottom-[-5%] left-[-5%] w-[50%] h-[50%] bg-teal-400/5 rounded-full pointer-events-none ${z}`}
        style={{ filter: `blur(${blur - 20}px)` }}
      />
    </>
  );
}
