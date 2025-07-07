import React, { type ChangeEvent } from "react";

interface TextAreaFieldProps {
    label?: string;
    value?: string;
    name?: string;
    placeholder?: string;
    rows?: number;
    required?: boolean;
    readOnly?: boolean;
    message?: string;
    wrapperClass?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    onChange?: ((value: string) => void) | ((event: ChangeEvent<HTMLTextAreaElement>) => void);
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
    label,
    value = "",
    name,
    placeholder = "",
    rows = 4,
    required = false,
    readOnly = false,
    message,
    wrapperClass = "",
    icon,
    disabled = false,
    onChange,
}) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            if (onChange.length === 1 && typeof (onChange as any).toString() === "function") {
                (onChange as (value: string) => void)(e.target.value);
            } else {
                (onChange as (event: ChangeEvent<HTMLTextAreaElement>) => void)(e);
            }
        }
    };

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="text-sm font-medium text-gray-700 block mb-1">
                    {label} {required && <span className="text-red-600">*</span>}
                </label>
            )}

            <div
                className={`flex items-start w-full transition-all duration-300 border rounded-lg px-2 py-1
          ${message ? "border-red-500" : "border-gray-600"}
          bg-white text-black text-lg
          ${wrapperClass}`}
            >
                {icon && <div className="pt-1 pr-2">{icon}</div>}

                <textarea
                    id={name}
                    name={name}
                    rows={rows}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    readOnly={readOnly}
                    onChange={handleChange}
                    className={`w-full resize-none focus:outline-none placeholder:text-sm px-1.5 text-base bg-transparent
            ${disabled ? "cursor-not-allowed opacity-50" : "cursor-text"}`}
                />
            </div>

            {message && <p className="text-xs text-red-500 mt-1">{message}</p>}
        </div>
    );
};

export default TextAreaField;
