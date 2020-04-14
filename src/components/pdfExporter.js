import React from 'react';
import jsPDF from 'jspdf';
import "./exporter.css";

const ExportPDF = (props)=>{
    var doc = new jsPDF();
    doc.fromHTML(props.body, 1, 1)
    return (
        <div>
        <button className="button" onClick={()=>doc.save("name.pdf")}><span>PDF</span></button>
        </div>
    )
}

export default ExportPDF;