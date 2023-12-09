import Image from 'next/image';

type Props = {
  size?: 256 | 64 | 48 | 40 | 32;
};

const Logo: React.FC<Props> = ({ size = 64 }) => (
  <Image alt="CV & Job Portal" src="/images/logos/logonew.png" className="rounded" width={size} height={size} priority />
);

export default Logo;
