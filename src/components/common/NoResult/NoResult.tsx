import Image from 'next/image';
import styles from './NoResult.module.scss';
import { Warning } from '@/assets';
import Button from '../Button/Button';

interface NoResultProps {
  content: string;
  buttonText?: string;
  onButtonClick?: () => void;
  showButton?: boolean;
  className?: string;
}

export default function NoResult({
  content,
  buttonText,
  onButtonClick,
  showButton = false,
  className,
}: NoResultProps) {
  return (
    <div className={styles.wrapper}>
      <Image src={Warning} alt="경고 아이콘" width={136} height={136} />
      <p className={styles.content}>{content}</p>
      {showButton && buttonText && (
        <Button onClick={onButtonClick} className={styles.button}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
