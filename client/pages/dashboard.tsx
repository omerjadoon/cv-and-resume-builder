import { Add, ImportExport } from '@mui/icons-material';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { ActionCreators } from 'redux-undo';
import RecommendationCard from '@/components/dashboard/RecommendationCard';
import HistoryCard from '@/components/dashboard/HistoryCard';
import ResumeCard from '@/components/dashboard/ResumeCard';
import ResumePreview from '@/components/dashboard/ResumePreview';
import Avatar from '@/components/shared/Avatar';
import Logo from '@/components/shared/Logo';
import { RESUMES_QUERY } from '@/constants/index';
import { fetchResumes } from '@/services/resume';
import { useAppDispatch } from '@/store/hooks';
import styles from '@/styles/pages/Dashboard.module.scss';
import axios from "axios";


export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'modals', 'dashboard'])),
  },
});



const rows_jobs = [
  { id: 1,
  source:"Indeed", 
  title: 'Data Scientist', 
  company: 'Express Scripts',
  skills:"['SAP', 'SQL']",
  city:"St. Louis",
  date: "24/05/2023" ,
  url:"https://www.indeed.com/rc/clk?jk=6a105f495c36afe3&fccid=281a27deb89bbe92&vjs=3"
},
   

   { id: 2,
  source:"Indeed", 
  title: 'Data Scientist', 
  company: 'Money Mart Financial Services',
  skills:"['Machine Learning', 'R', 'SAS', 'SQL', 'Python']",
  city:"Dallas",
  date: "24/05/2023" ,
  url:"https://www.indeed.com/rc/clk?jk=86afd561ea8c60bc&fccid=b584cf601069b5d0&vjs=3"
}, 
 { id: 3,
  source:"Indeed", 
  title: 'Machine Learning Scientist II', 
  company: 'Microsoft',
  skills:"['Natural Language Processing', 'Hive', 'Spark', 'Microsoft Powerpoint', 'Machine Learning', 'Hadoop', 'MATLAB', 'Python']",
  city:"Redmond",
  date: "24/05/2023" ,
  url:"https://www.indeed.com/rc/clk?jk=b0b692b299eeeac4&fccid=734cb5a01ee60f80&vjs=3"
},
   

   { id: 4,
  source:"Indeed", 
  title: 'Supply Chain Data Scientist', 
  company: 'Ford Motor Company',
  skills:"['Java', 'Alteryx', 'Data Mining', 'MATLAB', 'R', 'SAS', 'Python', 'SQL']",
  city:"Dearborn",
  date: "24/05/2023" ,
  url:"https://www.indeed.com/rc/clk?jk=1f173ff8b3a0337a&fccid=761c44c17d636bfe&vjs=3"
}, 
];
const rows_history = [
  { id: 3,
  source:"Indeed", 
  title: 'Machine Learning Scientist II', 
  company: 'Microsoft',
  skills:"['Natural Language Processing', 'Hive', 'Spark', 'Microsoft Powerpoint', 'Machine Learning', 'Hadoop', 'MATLAB', 'Python']",
  city:"Redmond",
  date: "24/05/2023" ,
  url:"https://www.indeed.com/rc/clk?jk=b0b692b299eeeac4&fccid=734cb5a01ee60f80&vjs=3"
},
   

   { id: 4,
  source:"Indeed", 
  title: 'Supply Chain Data Scientist', 
  company: 'Ford Motor Company',
  skills:"['Java', 'Alteryx', 'Data Mining', 'MATLAB', 'R', 'SAS', 'Python', 'SQL']",
  city:"Dearborn",
  date: "24/05/2023" ,
  url:"https://www.indeed.com/rc/clk?jk=1f173ff8b3a0337a&fccid=761c44c17d636bfe&vjs=3"
}, 
];
const Dashboard: NextPage = () => {

const [scrape, setScrape] = useState([]);
const [title, setTitle] = useState("");
const [location, setLocation] = useState("");
const [selectedJob, setSelectedJob] = useState("linkedin");



function search() {
  console.log("search")
    setScrape([]);
    let body = {
      title: title,
      location: location
    };
    console.log(title);
    console.log(location);
    axios.post(`http://localhost:3100/scrap/${selectedJob}`, body)
      .then(res => {
        console.log(res.data);
        setScrape(res.data);
      })
      .catch(err => console.log(err));
  }
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { data } = useQuery(RESUMES_QUERY, fetchResumes);

  useEffect(() => {
    dispatch(ActionCreators.clearHistory());
  }, []);

  if (!data) return null;

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {t<string>('dashboard.title')} | {t<string>('common.title')}
        </title>
      </Head>

      <header>
        <Link href="/">
          <Logo size={40} />
        </Link>
        <h2>Job and Resume Dashboard</h2>
        <Avatar size={40} />
      </header>

      <main className={styles.resumes}>
        <ResumeCard
          icon={Add}
          modal="dashboard.create-resume"
          title={t<string>('dashboard.create-resume.title')}
          subtitle={t<string>('dashboard.create-resume.subtitle')}
        />

        <ResumeCard
          icon={ImportExport}
          modal="dashboard.import-external"
          title={t<string>('dashboard.import-external.title')}
          subtitle={t<string>('dashboard.import-external.subtitle')}
        />

        {data.map((resume) => (
          <ResumePreview key={resume.id} resume={resume} />
        ))}



      </main>
      <div>
       <input
            type="text"
            onChange={e => setTitle(e.target.value)}
            placeholder="Job Title"
            name="title"
            className={styles.input}
          />
         {/* <div>
          <label class="input">
            <input type="email" class="input__field" placeholder="Email">
            <span class="input__label">Email</span>
            <div class="input__icon-hold">
              <span class="input__icon" data-feather="mail"></span>
            </div>
          </label>
          </div>*/}
          <input
            type="text"
            onChange={e => setLocation(e.target.value)}
            placeholder="Location"
            name="location"
            className={styles.input}
          />
           <button className={styles.button} onClick={search}>Search</button>
      </div>
      <div><h3>JOB Recommendations</h3></div>
       <RecommendationCard key="12" rows={scrape} />
       <div><h3>Job History / Applied Jobs</h3></div>
      <HistoryCard key="16"  />
    </div>
  );
};

export default Dashboard;
