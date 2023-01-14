import React from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import 'primereact/resources/themes/md-light-deeppurple/theme.css';

function Resulttable(props) {

    return (
        <DataTable id="resultTable" value={props.checks} responsiveLayout="scroll" size="small">
            <Column header="R" field="r"/>
            <Column header="X" field="x"/>
            <Column header="Y" field="y"/>
            <Column header="Hit" field="result"/>
        </DataTable>
    )
}

export default Resulttable;