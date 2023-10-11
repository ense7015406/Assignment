import { FormEvent, useState } from "react";
import formStyles from "../../../styles/Form.module.scss";

const NewDiscussion = () => {
	const [title, setTitle] = useState("");
	const [authors, setAuthors] = useState<string[]>([]);
	const [journal, setJournal] = useState("");
	const [volume, setVolume] = useState("");
	const [number, setNumber] = useState("");
	const [pages, setPages] = useState("");
	const [pubyear, setPubYear] = useState<number>(0);
	const [doi, setDoi] = useState("");

	const formatAuthors = (authorsArray: string[]): string => {
		return authorsArray.join(", ");
	};

	const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const articleData = {
			title,
			authors: formatAuthors(authors),
			journal,
			volume,
			number,
			pages,
			pubyear,
			doi,
		};

		try {
			const response = await fetch("http://localhost:8082/api/article", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(articleData),
			});

			if (response.ok) {
				// Article was successfully added
				console.log("Article added successfully");
			} else {
				// Error occurred while adding the article
				console.error("Failed to add article");
			}
		} catch (error) {
			console.error(error);
		}
	};

	// Some helper methods for the authors array
	const addAuthor = () => {
		setAuthors(authors.concat([""]));
	};

	const removeAuthor = (index: number) => {
		setAuthors(authors.filter((_, i) => i !== index));
	};

	const changeAuthor = (index: number, value: string) => {
		setAuthors(
			authors.map((oldValue, i) => {
				return index === i ? value : oldValue;
			})
		);
	};
	// Return the full form
	return (
		<div className="container" style={{ textAlign: "center" }}>
			<h1>New Article</h1>
			<form className={formStyles.form} onSubmit={submitNewArticle}>
				<div className={formStyles.formGroup}>
					<label htmlFor="title">Title:</label>
					<input type="text" name="title" id="title" value={title} onChange={(event) => setTitle(event.target.value)} className={formStyles.formControl} />
				</div>
				<div className={formStyles.formGroup}>
					<label htmlFor="author">Authors:</label>
					{authors.map((author, index) => (
						<div key={`author ${index}`} className={formStyles.authorGroup}>
							<input type="text" name="author" value={author} onChange={(event) => changeAuthor(index, event.target.value)} className={formStyles.formControl} />
							<button onClick={() => removeAuthor(index)} className={formStyles.removeAuthor} type="button">
								Remove
							</button>
						</div>
					))}
					<button onClick={() => addAuthor()} className={formStyles.addAuthor} type="button">
						Add Author
					</button>
				</div>
				<div className={formStyles.formGroup}>
					<label htmlFor="journal">Journal:</label>
					<input type="text" name="journal" id="journal" value={journal} onChange={(event) => setJournal(event.target.value)} className={formStyles.formControl} />
				</div>
				<div className={formStyles.formGroup}>
					<label htmlFor="volume">Volume:</label>
					<input type="text" name="volume" id="volume" value={volume} onChange={(event) => setVolume(event.target.value)} className={formStyles.formControl} />
				</div>
				<div className={formStyles.formGroup}>
					<label htmlFor="number">Number:</label>
					<input type="text" name="number" id="number" value={number} onChange={(event) => setNumber(event.target.value)} className={formStyles.formControl} />
				</div>
				<div className={formStyles.formGroup}>
					<label htmlFor="pages">Pages:</label>
					<input type="text" name="pages" id="pages" value={pages} onChange={(event) => setPages(event.target.value)} className={formStyles.formControl} />
				</div>
				<div className={formStyles.formGroup}>
					<label htmlFor="pubyear">Publication Year:</label>
					<input type="number" name="pubYear" id="pubYear" value={pubyear} onChange={(event) => setPubYear(parseInt(event.target.value))} className={formStyles.formControl} />
				</div>
				<div className={formStyles.formGroup}>
					<label htmlFor="doi">DOI:</label>
					<input type="text" name="doi" id="doi" value={doi} onChange={(event) => setDoi(event.target.value)} className={formStyles.formControl} />
				</div>
				<button className={formStyles.submitButton} type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default NewDiscussion;
