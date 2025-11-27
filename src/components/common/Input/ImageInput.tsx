import { Photo } from '@/assets';
import styles from './Input.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import { InputProps } from './Input';

/**
 * ImageInput 컴포넌트의 props 타입
 * @property {string} [label] - 입력 필드 위에 표시될 라벨 텍스트
 * @property {string} [error] - 에러 메시지 (있을 경우 입력 필드 아래 빨간색으로 표시)
 * @property {boolean} [preview=true] - 선택된 이미지 미리보기 표시 여부
 * @property {function} onFileChange - 파일 선택 시 호출되는 콜백 함수
 * @property {string} [accept='image/*'] - 허용할 파일 타입 (기본값: 모든 이미지)
 */
type ImageInputProps = {
  label?: string;
  error?: string;
  preview?: boolean;
  onFileChange: (file: File | null) => void;
  accept?: string;
} & Omit<InputProps, 'type' | 'onChange'>;

/**
 * 이미지 업로드를 위한 커스텀 Input 컴포넌트
 *
 * 사용자가 이미지를 선택하면 미리보기를 표시하고,
 * 선택한 파일을 부모 컴포넌트로 전달합니다.
 *
 * @example
 * // 기본 사용법
 * const [profileImage, setProfileImage] = useState<File | null>(null);
 *
 * <ImageInput
 *   label="프로필 이미지"
 *   onFileChange={(file) => setProfileImage(file)}
 * />
 *
 * @example
 * // 에러 메시지와 함께 사용
 * const [image, setImage] = useState<File | null>(null);
 * const [error, setError] = useState('');
 *
 * const handleFileChange = (file: File | null) => {
 *   if (file && file.size > 5 * 1024 * 1024) {
 *     setError('파일 크기는 5MB 이하여야 합니다.');
 *     return;
 *   }
 *   setError('');
 *   setImage(file);
 * };
 *
 * <ImageInput
 *   label="상품 이미지"
 *   error={error}
 *   onFileChange={handleFileChange}
 * />
 *
 * @example
 * // 특정 이미지 형식만 허용
 * <ImageInput
 *   label="증명사진 (JPG, PNG만)"
 *   accept="image/jpeg, image/png"
 *   onFileChange={(file) => console.log(file)}
 * />
 *
 *
 * @param {ImageInputProps} props - 컴포넌트 props
 * @returns {JSX.Element} 이미지 업로드 입력 컴포넌트
 */
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
          className={styles.fileInput}
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
