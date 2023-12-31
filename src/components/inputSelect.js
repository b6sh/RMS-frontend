const InputSelect = ({ disabled = false, className, options = [], ...props }) => (
    <select
        disabled={disabled}
        className={`${className} rounded-md shadow-sm border-gray-300 focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50`}
        {...props}
    >
        {options.map((option, index) => (
            <option
                value={index}
                key={index}
            >
                {option}
            </option>
        ))}
    </select>
)

export default InputSelect
