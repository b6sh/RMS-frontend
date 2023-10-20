const Input = ({ disabled = false, className, ...props }) => (
    <textarea
        disabled={disabled}
        className={`${className} rounded-md shadow-sm border-gray-300 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50`}
        {...props}
    />
)

export default Input
