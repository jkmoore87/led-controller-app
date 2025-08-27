export default function GlowCard({ title, children, className = '' }) {
  return (
    <div className={`bg-panel/70 rounded-2xl p-6 border border-glow/20 shadow-glow ${className}`}>
      {title && <h2 className="text-glow glow-text text-xl mb-3">{title}</h2>}
      {children}
    </div>
  );
}
