import SelectBox2 from '@/components/common/SelectBox2/SelectBox2';

export const metadata = {
  title: '회원가입',
};

export default function Page() {
  return (
    <>
      {' '}
      <SelectBox2
        options={[
          { label: '체리', value: 'CHERRY' },
          { label: '베리', value: 'BERRY' },
          { label: '오크', value: 'OAK' },
        ]}
      />
    </>
  );
}
