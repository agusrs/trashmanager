import React from 'react'
import { DataGrid } from '@material-ui/data-grid';

export default class MonitorGrid extends React.Component {
    constructor(props) {
        super(props)
        this.columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'address', headerName: 'Dirección', width: 250 },
            {
              field: 'garbageLevel',
              headerName: 'Nivel de basura',
              width: 130,
            },
          ];
          
          this.rows = [
            { id: 1, address: 'Av Callao 7523', garbageLevel: '35%' },
            { id: 2, address: 'Corrientes 2000 ', garbageLevel: '42%' },
            { id: 3, address: 'Lannister', garbageLevel: '45%' },
            { id: 4, address: 'Stark', garbageLevel: '16%' },
            { id: 5, address: 'Targaryen', garbageLevel: null },
            { id: 6, address: 'Melisandre', garbageLevel: '150%' },
            { id: 7, address: 'Clifford', garbageLevel: '44%' },
            { id: 8, address: 'Frances', garbageLevel: '36%' },
            { id: 9, address: 'Roxie', garbageLevel: '65%' },
          ];
    } 

    render() {
        return (
        <div style={{ height: 550, width: '100%' }}>
            Contenedores
            <DataGrid rows={this.rows} columns={this.columns} pageSize={8} autoHeight={true} />
        </div>
        );
    }
  }
