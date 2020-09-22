import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import './Grid.css';

export default class MonitorGrid extends React.Component {
    constructor(props) {
      super(props)
      
    }

    componentDidMount() {

    }

    render() {
        return (
        <div style={{ height: 550, width: '100%' }}>
            Contenedores
            <DataGrid ref={gridOrder => this.gridInstance = gridOrder} rows={this.props.rows} columns={this.props.columns} pageSize={8} autoHeight={true} 
              hideFooterSelectedRowCount={true} className="containerGrid" 
            />
        </div>
        );
    }
  }
