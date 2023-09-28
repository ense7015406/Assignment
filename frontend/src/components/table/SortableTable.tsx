import React from "react";
import styles from "./SortableTable.module.scss";


interface SortableTableProps {
	headers: { key: string; label: string }[];
	data: any[];
}

const hideColumnFunction = (para : any) => {
	
	const checklist = document.getElementById(para);
	let array : string[] = [];
	if (checklist !== null) {
		// To hide the element:
		const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
		checkboxes.forEach((checkbox) => {
			if (checkbox instanceof HTMLInputElement && checkbox.checked) {
			  array.push(checkbox.id);
			  console.log(array);
			}
		});
	}	

	const table = document.getElementById("table") as HTMLTableElement;
	const headerRow = table.getElementsByTagName("tr")[0] as HTMLTableRowElement;
	const rows = table.getElementsByTagName("tr");

	//reset the whole table visibility
	for (let i = 0; i < rows.length; i++) {
		const cells = rows[i].getElementsByTagName("td");
		const headerCells = headerRow.getElementsByTagName("th");
	
		for (let j = 0; j < cells.length; j++) {
		  cells[j].style.display = ""; // Reset data cell display
		}
	
		headerCells[i].style.display = ""; // Reset header cell display
	}

	//hide column base on value of the array
	for(let k = 0; k < array.length; k++)
	{
		let columnIndex : number = parseInt(array[k]);
		for (let i = 0; i < rows.length; i++) {
			const cells = rows[i].getElementsByTagName("td");
			const headerCell = headerRow.getElementsByTagName("th")[columnIndex];
		
			if (cells.length > columnIndex) {
			  cells[columnIndex].style.display = "none";
			  headerCell.style.display = "none";
			}
		  }
	}
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data}) => (
	<div className={styles["table-container"]} id="table">
		<div className="dropdown-check-list" key="filter" id="checklist" onChange={ () => hideColumnFunction("checklist")}>
			<span className="anchor" key="filter-span">Hide Columns</span>
			<ul className="items">
				{headers.map((header, index) => (
					<li key={header.key}><input type="checkbox" key={header.key} value={header.key} id={"" + index++}></input>{header.label}<br></br></li>
				))}
			</ul>
		</div>
		<table className={styles.table}>
			<thead>
				<tr>
					{headers.map((header) => (
						<th key={header.key}>{header.label}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, i) => (
					<tr key={i}>
						{headers.map((header) => (
							<td key={header.key}>{row[header.key]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	</div>
	
);

export default SortableTable;
