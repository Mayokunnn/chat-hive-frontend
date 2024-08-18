import React, { useState } from 'react';

interface OtpInputProps {
  length: number;
  onChange: (otp: string) => void;
  autoFocus?: boolean;
  isNumeric?: boolean;
  inputStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length,
  onChange,
  autoFocus = true,
  isNumeric = true,
  inputStyle = {},
  containerStyle = {},
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));

  const handleChange = (value: string, index: number) => {
    if (isNumeric && !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }

    setOtp(newOtp);
    onChange(newOtp.join(''));
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData('text');
    if (isNumeric && !/^\d*$/.test(pasteData)) return;

    const pasteOtp = pasteData.slice(0, length).split('');
    setOtp(pasteOtp);
    onChange(pasteOtp.join(''));

    // Focus the last filled input
    const lastFilledIndex = pasteOtp.length - 1;
    if (lastFilledIndex < length - 1) {
      document.getElementById(`otp-input-${lastFilledIndex + 1}`)?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      const previousIndex = index - 1;
      document.getElementById(`otp-input-${previousIndex}`)?.focus();
    }
  };

  return (
    <div className={`flex items-center gap-3`} style={{ ...containerStyle }}>
      {otp.map((value, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type={isNumeric ? 'text' : 'tel'}
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          maxLength={1}
          autoFocus={autoFocus && index === 0}
          className='bg-transparent border-2 border-secondary rounded-md focus:border-secondary outline-none'
          style={{
            width: '40px',
            height: '40px',
            textAlign: 'center',
            fontSize: '20px',
            ...inputStyle,
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
