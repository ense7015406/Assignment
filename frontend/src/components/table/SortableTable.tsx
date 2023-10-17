import React from "react";
import styles from "./SortableTable.module.scss";

interface SortableTableProps {
	headers: { key: string; label: string }[];
	data: any[];
}

const showCheckBoxes = (id : any) =>{
	var dropdown = document.getElementById(id);
	if(dropdown != null)
	{
		var checkboxes = dropdown.querySelector("ul") as HTMLElement;
		if(checkboxes != null)
		{
			checkboxes.style.display = checkboxes.style.display === "block" ? "none" : "block";
		}
	}
}

const hideColumnFunction = (para: any) => {
	const checklist = document.getElementById(para);
	let array: string[] = [];
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
	const headerRow = table.querySelector("thead tr") as HTMLTableRowElement;
	const rows = table.getElementsByTagName("tr");

	// Reset the whole table visibility
	for (let i = 0; i < rows.length; i++) {
		const cells = rows[i].getElementsByTagName("td");

		for (let j = 0; j < cells.length; j++) {
			cells[j].style.display = ""; // Reset data cell display
		}
	}

	// Reset header cells' visibility
	for (let i = 0; i < headerRow.cells.length; i++) {
		headerRow.cells[i].style.display = ""; // Reset header cell display
	}

	// Hide column based on the value of the array
	for (let k = 0; k < array.length; k++) {
		let columnIndex: number = parseInt(array[k]);
		for (let i = 0; i < rows.length; i++) {
			const cells = rows[i].getElementsByTagName("td");

			if (cells.length > columnIndex) {
				cells[columnIndex].style.display = "none";
			}
		}

		// Also hide the header cell
		if (headerRow.cells.length > columnIndex) {
			headerRow.cells[columnIndex].style.display = "none";
		}
	}
};

let sortByColumnNumber: number;
const sortByColumn = (para: number) => {
	if (sortByColumnNumber === para) {
		location.reload();
	}
	const table = document.getElementById("tableContent") as HTMLTableElement;
	let i, x, y;
	let rows: HTMLCollectionOf<HTMLTableRowElement>;
	let switchFlag = true;
	while (switchFlag) {
		switchFlag = false;
		let shouldSwitch = false;
		rows = table.rows;
		for (i = 1; i < rows.length - 1; i++) {
			x = rows[i].getElementsByTagName("TD")[para];
			y = rows[i + 1].getElementsByTagName("TD")[para];

			//check if the two row should be switch
			if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				//if so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			}
		}
		if (shouldSwitch) {
			/*If a switch has been marked, make the switch
			and mark that a switch has been done:*/
			rows[i].parentNode?.insertBefore(rows[i + 1], rows[i]);
			switchFlag = true;
		}
	}

	sortByColumnNumber = para;
};

const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => (
	<div className={styles["table-container"]} id="table">
		<div className={styles["dropdown-check-list"]} key="filter" id="checklist" onChange={() => hideColumnFunction("checklist")}>
			<span className={styles["anchor"]} key="filter-span" onClick={()=> showCheckBoxes("checklist")}>
				Hide Columns
			</span>
			<ul className={styles["items"]} >
				{headers.map((header, index) => (
					<li key={header.key}>
						<input type="checkbox" key={header.key} value={header.key} id={"" + index++} />
						{header.label}
						<br />
					</li>
				))}
			</ul>
		</div>
		<table className={styles.table} id="tableContent">
			<thead>
				<tr>
					{headers.map((header, index) => (
						<th key={header.key} id={"" + index} onClick={() => sortByColumn(index)}>
							{header.label}
						</th>
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
