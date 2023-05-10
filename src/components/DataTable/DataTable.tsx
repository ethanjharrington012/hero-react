import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api'; // ADD THIS
import { useGetData } from '../../custom-hooks'; // ADD THIS
import { Button,Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@mui/material'; // ADD THESE
import { HeroForm } from '../../components/HeroForm'; // ADD THIS


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'name',
    width: 150,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: true,
  },
  {
    field: 'comic_in',
    headerName: 'Comic in',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
   field: 'super_power',
   headerName: 'Super Power',
   width: 150,
   editable: true,
  }
];

interface gridData{
    data:{
      id?:string;
    }
}

export const DataTable = () => {
    let { heroData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridRowSelectionModel>([])

    let handleOpen = () => {
    setOpen(true)
    }

    let handleClose = () => {
    setOpen(false)
    }

    let deleteData = () => {
        serverCalls.delete(`${gridData[0]}`)
        getData()
    }

    console.log(gridData) // a list of id's from checked rows

    const MyAuth = localStorage.getItem('myAuth')
    console.log(MyAuth)
    if (MyAuth == 'true'){
    return (
      <div style={{ height: 600, width: '100%' }}>
            <h2>Heros in your Collection</h2>
            <DataGrid
            rows={heroData}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(newSelectionModel: React.SetStateAction<GridRowSelectionModel>) => (setData(newSelectionModel))}
                    {...heroData}
        />
            <Button onClick={handleOpen}>Update</Button>
                    <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Update Drone</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Drone id: {gridData[0]}</DialogContentText>
                            <HeroForm id={`${gridData[0]}`} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={handleClose} color="secondary">Done</Button>
                        </DialogActions>
                    </Dialog>
                </div>
    )
        } else { 
            return( // **new** does not render datatable if user is not authenticated
                <div>
                    <h3>Please Sign In to View Your Drone Collection</h3>
                </div>
        )};

}