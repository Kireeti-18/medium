import { useState } from 'react';

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
  value?: string;
}

export default function LabeledInput({
  label,
  type,
  onChange,
  placeholder,
}: InputProps) {
  const [password, setPassword] = useState(false);
  const getType = (type: string): string => {
    let inputType: string = '';
    switch (type) {
      case 'text':
        inputType = 'text';
        break;
      case 'email':
        inputType = 'email';
        break;
      case 'password':
        if (password) {
          inputType = 'text';
        } else {
          inputType = 'password';
        }

        break;
      default:
        inputType = 'text';
    }
    return inputType;
  };
  return (
    <div className="px-5 sm:w-sm sm:px-0">
      <label className="block mb-2 text-sm font-medium text-gray-900 ">
        {label}
      </label>
      <div className="relative w-full">
        <input
          type={getType(type)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          required
        />
        {type == 'password' && (
          <img
            src={
              password
                ? '../../images/hide_pass.svg'
                : '../../images/show_pass.svg'
            }
            alt="Toggle Password"
            className="w-6 h-6 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setPassword((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );
}
