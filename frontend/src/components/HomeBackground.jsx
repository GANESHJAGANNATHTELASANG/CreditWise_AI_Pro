const HomeBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Main gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.16),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.12),transparent_40%)]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Top-left glow */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />

      {/* Top-right glow */}
      <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-violet-500/20 blur-[120px]" />

      {/* Bottom glow */}
      <div className="absolute bottom-[-200px] left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[130px]" />

      {/* Page content */}
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
};

export default HomeBackground;
