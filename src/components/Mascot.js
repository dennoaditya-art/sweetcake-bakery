export default function Mascot({ size = 'md', className = '', animate = true }) {
  const sizes = { sm: 'text-2xl', md: 'text-4xl', lg: 'text-6xl', xl: 'text-8xl' };

  return (
    <div className={`inline-flex items-center justify-center ${animate ? 'animate-bounce-gentle' : ''} ${className}`}>
      <span className={`${sizes[size] || sizes.md} drop-shadow-lg`} role="img" aria-label="Cupcake mascot">
        🧁
      </span>
    </div>
  );
}
