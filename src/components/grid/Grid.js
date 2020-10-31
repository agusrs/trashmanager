import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import './Grid.css';
import { Typography } from '@material-ui/core';

export default class MonitorGrid extends React.Component {
    constructor(props) {
      super(props)
      
    }

    componentDidMount() {
      this.props.onRef(this)
    }

    render() {
        return (
        <div style={{ height: 550, width: '98%' }}>
            <DataGrid ref={gridOrder => this.gridInstance = gridOrder} rows={this.props.rows} columns={this.props.columns} pageSize={8} autoHeight={true} 
              hideFooterSelectedRowCount={true} className="containerGrid" sortModel={this.props.sortModel} onRowClick={this.props.rowClick}
            />
        </div>
        );
    }
  }
