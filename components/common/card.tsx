export const Card = ({ children , className = '' } : { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 md:p-8 ${className}`}>
        {children}
    </div>
);