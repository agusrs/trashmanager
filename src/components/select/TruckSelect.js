/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './TruckSelect.css'

export default class TruckSelect extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Autocomplete
            id="combo-box-demo"
            options={this.props.data}
            getOptionLabel={(truck) => truck.name}
            className="select"
            value={this.props.selected}
            onChange={(event, newValue) => {
                this.props.onChange(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="Seleccione conductor" variant="outlined" />}
            />
        )
    }
}