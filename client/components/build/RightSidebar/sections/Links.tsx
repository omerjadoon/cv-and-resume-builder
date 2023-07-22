import { useTranslation } from 'next-i18next';

import Heading from '@/components/shared/Heading';

import styles from './Links.module.scss';

const Links = () => {
  const { t } = useTranslation();

  return (
    <>
      <Heading path="metadata.links" name={t<string>('builder.rightSidebar.sections.links.heading')} />

      <div className={styles.container}>
        

        
      </div>
    </>
  );
};

export default Links;
