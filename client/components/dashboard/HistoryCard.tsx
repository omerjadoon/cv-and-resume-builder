
import env from '@beam-australia/react-env';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Resume } from '@reactive-resume/schema';
import axios from "axios";
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState,useEffect } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import { RESUMES_QUERY } from '@/constants/index';
import { ServerError } from '@/services/axios';
import queryClient from '@/services/react-query';
import { deleteResume, DeleteResumeParams, duplicateResume, DuplicateResumeParams } from '@/services/resume';
import { useAppDispatch } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import getResumeUrl from '@/utils/getResumeUrl';
import { Scrap } from 'src/scrap/entities/scrap.entity';

import styles from './HistoryCard.module.scss';
import { createScrap,getScrapByUser } from '@/services/scrap';
import { useQuery } from 'react-query';

type Props = {
  resume: Resume;
};

const HistoryCard: React.FC<Props> = () => {
  const router = useRouter();
  const [rows,setRows] = useState([]);

  const { t } = useTranslation();


useEffect(() => {
  getScrapByUser(2).then(res => {
          console.log(res);
          setRows(res);

        });
        
    })
  

  const dispatch = useAppDispatch();

  const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', headerClassName: 'superHeader', width: 70 },
  { field: 'website', headerName: 'Source', width: 130 },
  { field: 'title', headerName: 'Job title', width: 200 },
  { field: 'company', headerName: 'Company name', width: 130 },
  { field: 'location', headerName: 'Location', width: 130 },
  
 
  { field: 'date', headerName: 'Date', width: 130 },
 
  
];

  const sendRowToServer = (myrow)=>{
    createScrap(myrow).then(res => {
      console.log("hello"+res);
        console.log(myrow);
        // console.log(params.row)
        window.open(myrow.link, '_blank').focus();
      })
      .catch(err => console.log(err));
    }




  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const { mutateAsync: duplicateMutation } = useMutation<Resume, ServerError, DuplicateResumeParams>(duplicateResume);

  const { mutateAsync: deleteMutation } = useMutation<void, ServerError, DeleteResumeParams>(deleteResume);

  const handleOpen = () => {
    handleClose();

    router.push({
      pathname: '/[username]/[slug]/build',
      query: { username: resume.user.username, slug: resume.slug },
    });
  };

  const handleOpenMenu = (event: React.MouseEvent<Element>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRename = () => {
    handleClose();

    dispatch(
      setModalState({
        modal: 'dashboard.rename-resume',
        state: {
          open: true,
          payload: {
            item: resume,
            onComplete: () => {
              queryClient.invalidateQueries(RESUMES_QUERY);
            },
          },
        },
      })
    );
  };

  const handleDuplicate = async () => {
    handleClose();

    await duplicateMutation({ id: resume.id });

    queryClient.invalidateQueries(RESUMES_QUERY);
  };

  const handleShareLink = async () => {
    handleClose();

    const url = getResumeUrl(resume, { withHost: true });
    await navigator.clipboard.writeText(url);

    toast.success(t<string>('common.toast.success.resume-link-copied'));
  };

  const handleDelete = async () => {
    handleClose();

    await deleteMutation({ id: resume.id });

    queryClient.invalidateQueries(RESUMES_QUERY);
  };


  

  

  function generateRandom() {
    // eslint-disable-next-line prefer-const
    let length = 8,
        // eslint-disable-next-line prefer-const
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}




  return (
    <section className={styles.resume}>
     <div style={{ height: 400, width: '100%' }}>

      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row: any) =>  generateRandom()}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
          columns: {
            columnVisibilityModel: {
              // Hide columns status and traderName, the other columns will remain visible
              
              
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
     

      
    </section>
  );
};

export default HistoryCard;
