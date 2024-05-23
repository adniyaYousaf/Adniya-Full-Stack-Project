import { Router } from "express";
import db from "./db.js";
const router = Router();
import getVideoId from 'get-video-id';
// import { errorMonitor } from "pg-pool";

router.get("/videos", async (_, res) => {
	const result = await db.query("SELECT * FROM videos order by id");

	result
		? res.send(result.rows)
		: res
			.status(500)
			.send({ success: "false", error: "Could not connect to database" });
});

const apiKey = 'AIzaSyDmJOjy9aSsy_kcaaPJS-EH4pX9BaaafBg';

const youtubeTitle = async (url) => {
	const id = getVideoId(url);
	return await fetch(
		`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id.id}&key=${apiKey}`
	)
		.then((res) => res.json())
		.then((data) =>
			data.items.length == 0 ? "Error" : data.items[0].snippet.title);

}

router.post("/videos", async (req, res) => {
	const title = req.body.title || (await youtubeTitle(req.body.src));
	try {
		await db.query(`INSERT INTO videos (title, src , addeddate) VALUES ($1, $2, NOW())`, [title, req.body.src])
		res.send({
			success: true,
			message: 'Successfully added the video.'
		});
	} catch (error) {
		res.status(500).send({
			success: false,
			error: "Video could not be added"
		});
	}
});

router.delete("/videos/:id", async (req, res) => {
	const id = req.params.id;

	const deletedVideo = await db.query(
		`DELETE FROM videos WHERE id='${id}'`
	);

	deletedVideo
		? res.status(200).send({ success: "Deleted the video successfully" })
		: res.status(404).send({ error: "Id for the video does not exist" })
})

router.post("/videos/:id/:vote", async (req, res) => {
	const vote = req.params.vote;
	const id = parseInt(req.params.id);

	if (vote === "up") {
		const result = await db.query("UPDATE videos SET rating = rating + 1 WHERE id= $1", [id]);
		result ? res.status(200).send({ success: true, message: 'update successful' }) : res.status(400).send({ success: false, error: 'update is not successful' });
	} else {
		const result = await db.query("UPDATE videos SET rating = rating- 1 WHERE id= $1", [id]);
		result ? res.status(200).send({ success: true, message: 'update successful' }) : res.status(400).send({ succuss: false, error: 'update is not successful' })
	}


})

router.get("/videos/:sort", async (req, res) => {
	const sort = req.params.sort;
	let result;
	if (sort == "asc") {
		result = await db.query("SELECT * FROM videos ORDER BY rating ASC");
	} else {
		result = await db.query("SELECT * FROM videos ORDER BY rating DESC");
	}
	result ? res.status(200).send(result.rows) : res.status(400).send({ success: false, error: 'Failed to delete video.' });

})



export default router;
