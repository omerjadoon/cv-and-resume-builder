/* eslint-disable unused-imports/no-unused-vars */

import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Resume } from '@reactive-resume/schema';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation } from 'react-query';

import { ServerError } from '@/services/axios';
import { deleteResume, DeleteResumeParams, duplicateResume, DuplicateResumeParams } from '@/services/resume';
import { createScrap,CreateScrapParams } from '@/services/scrap';

import styles from './ResumePreview.module.scss';


type Props = {
  rows: any[];
};

const RecommendationCard: React.FC<Props> = ({rows}) => {
  const router = useRouter();



  const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', headerClassName: 'superHeader', width: 70 },
  { field: 'website', headerName: 'Source', width: 130 },
  { field: 'title', headerName: 'Job title', width: 200 },
  { field: 'company', headerName: 'Company name', width: 130 },
  { field: 'location', headerName: 'Location', width: 130 },
  
 
  { field: 'date', headerName: 'Date', width: 130 },
  {
    field: "link",
    headerName: "Job Url",

    sortable: false,

    renderCell: (params) => {
      const onClick = (e:any) => {
        e.stopPropagation(); // don't select this row after clicking


        sendRowToServer(params.row);
        

        return true;
      };

      return <Button onClick={onClick}>Apply</Button>;
    }
  },
  
];

  const sendRowToServer = (myrow:CreateScrapParams)=>{

    const mylink = "http:www.google.com";
   
    createScrap(myrow).then(res => {
      const url = myrow?.link ?? "https://www.linkedin.com/";

      // Open the URL in a new tab
      window.open(url, '_blank')?.focus();

      })
      .catch(err => console.log(err));
    }




  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const { mutateAsync: duplicateMutation } = useMutation<Resume, ServerError, DuplicateResumeParams>(duplicateResume);

  const { mutateAsync: deleteMutation } = useMutation<void, ServerError, DeleteResumeParams>(deleteResume);

  

  

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

export default RecommendationCard;
