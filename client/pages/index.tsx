import { DarkMode, LightMode } from '@mui/icons-material';
import { Button, IconButton, NoSsr } from '@mui/material';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Footer from '@/components/shared/Footer';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import Logo from '@/components/shared/Logo';
import { FLAG_DISABLE_SIGNUPS } from '@/constants/flags';
import { logout } from '@/store/auth/authSlice';
import { setTheme } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import styles from '@/styles/pages/Home.module.scss';


export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'modals', 'landing'])),
  },
});


const Home: NextPage = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.build.theme);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const handleLogin = () => dispatch(setModalState({ modal: 'auth.login', state: { open: true } }));
  const handleRegister = () => dispatch(setModalState({ modal: 'auth.register', state: { open: true } }));
  const handleToggle = () => dispatch(setTheme({ theme: theme === 'light' ? 'dark' : 'light' }));
  const handleLogout = () => dispatch(logout());

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Logo size={256} />
        </div>

        <div className={styles.main}>
          <h1>{t<string>('common.title')}</h1>

          <h2>{t<string>('common.subtitle')}</h2>

          <NoSsr>
            <div className={styles.buttonWrapper}>
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" passHref>
                    <Button style={{ backgroundColor: '#EA14DA', color: 'white' }}>{t<string>('landing.actions.app')}</Button>
                  </Link>

                  <Button variant="outlined" style={{ color: '#EA14DA' }} onClick={handleLogout}>
                    {t<string>('landing.actions.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Button style={{ backgroundColor: '#EA14DA', color: 'white' }} onClick={handleLogin}>{t<string>('landing.actions.login')}</Button>

                  <Button variant="outlined" style={{ color: '#EA14DA' }} onClick={handleRegister} disabled={FLAG_DISABLE_SIGNUPS}>
                    {t<string>('landing.actions.register')}
                  </Button>
                </>
              )}
            </div>
          </NoSsr>
        </div>
      </div>

      
      
    

     

      <footer>
        <div className={styles.version}>
          <Footer className="font-semibold leading-5 opacity-50" />

          <div>v{process.env.appVersion}</div>
        </div>

        <div className={styles.actions}>
          <IconButton onClick={handleToggle}>{theme === 'dark' ? <DarkMode /> : <LightMode />}</IconButton>

          <LanguageSwitcher />
        </div>
      </footer>
    </main>
  );
};

export default Home;
