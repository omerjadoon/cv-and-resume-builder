import { BugReport, Coffee, GitHub, Link, Savings } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useTranslation } from 'next-i18next';

import Heading from '@/components/shared/Heading';
import { DOCS_URL, DONATION_URL, GITHUB_ISSUES_URL, GITHUB_URL, REDDIT_URL } from '@/constants/index';

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
