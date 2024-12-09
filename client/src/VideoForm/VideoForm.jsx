import "./VideoForm.scss";
const VideoForm = ({ handleSubmit }) => {
	return (
		<form onSubmit={handleSubmit} className="form">
      <label htmlFor="title" className="form__label">
				<input type="text" name="title" className="form__input" placeholder="Add video title here!!" required />
			</label>
			<label htmlFor="URL" className="form__label">
				<input type="text" name="src" className="form__input" placeholder="Add video link here!!" required />
			</label>
			<button type="submit" className="form__btn">
				Submit
			</button>
		</form>
	);
};

export default VideoForm;
