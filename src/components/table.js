import React, { useState, useEffect } from 'react'
/*import axios from 'axios'*/
import MaterialTable from 'material-table'
import { Button } from '@material-ui/core'

function Table()  { 


    const [data, setData] = useState([])
    const columns = [
      {title: "Id", field: "id" },
        {title: "Crust", field: "Crust" },
        {title: "Flavor", field: "Flavor" },
        {title: "Size", field: "Size" },
        {title: "Table_No", field: "Table_No" }

    ]
   useEffect(()=>{
         fetch("https://61b6012ac95dd70017d40dcd.mockapi.io/api/V1/Pizza")
        .then (resp=>resp.json())
        .then(resp => {
            console.log(resp)
            setData(resp)
          })
            
    }, [])

    return (
        <div className="table-container">
      <MaterialTable
      title="Ordering list"
        data={data}
        columns={columns}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
         const updatedRows = [...data,newRow]
         setTimeout(() => {
           setData(updatedRows)
           resolve()
         },2000)
      
         }),
         onRowDelete:selectedRow => new Promise((resolve, reject) => { 
          const index = selectedRow.tableData.id;
            const updatedData = [...data]
            updatedData.splice(selectedRow,data.id,1)
            setTimeout(() => {
              setData(updatedData)
              resolve()
         }, 2000)
        }),

        /*onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
          const index=oldRow.tableData.id;
          const updatedRows=[...data]
          updatedRows[index]=updatedRow
          setTimeout(() => {
            setData(updatedRows)
            resolve()
          }, 2000)
        })*/
      }}
        options={{
          actionsColumnIndex:-1,addRowPosition:"first",
          search:true,searchFieldAlignment:"left",searchFieldVariant:"outlined",
          paging:true,pageSizeOptions:[5,10,20,25,50,100],
          paginationPosition:"bottom",
          actionsColumnIndex:-1,addRowPosition:"first",
          addRow:"false",addFieldAlignment:"left"

        

        }}

      />
        </div> 
    );
}
    export default Table; 