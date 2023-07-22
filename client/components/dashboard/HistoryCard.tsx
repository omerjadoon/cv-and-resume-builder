
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'next-i18next';
import { useEffect,useState } from 'react';

import {getScrapByUser,Scrap } from '@/services/scrap';

import styles from './HistoryCard.module.scss';

type Props = {
  id: string;
};

const HistoryCard: React.FC<Props> = () => {

  const [rows,setRows] = useState<Scrap[]>([]);

  const { t } = useTranslation();


useEffect(() => {
  getScrapByUser({userId:2}).then(res => {
          console.log(res);
          setRows(res);

        });
        
    })
  


  const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', headerClassName: 'superHeader', width: 70 },
  { field: 'website', headerName: 'Source', width: 130 },
  { field: 'title', headerName: 'Job title', width: 200 },
  { field: 'company', headerName: 'Company name', width: 130 },
  { field: 'location', headerName: 'Location', width: 130 },
  
 
  { field: 'date', headerName: 'Date', width: 130 },
 
  
];






  



  

  

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
