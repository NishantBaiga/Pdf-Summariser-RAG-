export const SectionTitle = ({ 
  children, 
  className = '',
  align = 'left',
  size = 'default',
  withUnderline = false 
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const sizeClasses = {
    small: 'text-2xl md:text-3xl',
    default: 'text-3xl md:text-4xl',
    large: 'text-4xl md:text-5xl'
  };

  return (
    <div className={`${alignmentClasses[align]} ${className}`}>
      <h2 className={`
        font-extrabold text-gray-900 dark:text-white mb-4 leading-tight
        ${sizeClasses[size]}
      `}>
        {children}
      </h2>
      {withUnderline && (
        <div className={`
          w-20 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full
          ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}
          mt-4
        `} />
      )}
    </div>
  );
};