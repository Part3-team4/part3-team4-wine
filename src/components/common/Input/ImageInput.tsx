import { Photo } from '@/assets';
import styles from './Input.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import { InputProps } from './Input';

type ImageInputProps = {
  label?: string;
  error?: string;
  preview?: boolean;
  onFileChange: (file: File | null) => void;
  accept?: string;
} & Omit<InputProps, 'type' | 'onChange'>;

export default function ImageInput({
  label,
  error,
  preview = true,
  onFileChange,
  accept = 'image/*',
  className,
  id = 'file-input',
  ...props
}: ImageInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (preview) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    onFileChange(file);
  };

  return (
    <div className={styles.inputContainer}>
      {label && <p className={styles.label}>{label}</p>}
      <div className={className}>
        <input
          id={id}
          type="file"
          accept={accept}
          onChange={handleChange}
          style={{ display: 'none' }}
          {...props}
        />

        <label htmlFor={id} className={styles.uploadArea}>
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className={styles.previewImage} />
          ) : (
            <div className={styles.placeholder}>
              <Image src={Photo} alt="사진 아이콘" width={24} height={24} />
            </div>
          )}
        </label>
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}
