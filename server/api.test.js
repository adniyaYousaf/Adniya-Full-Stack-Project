import request from "supertest";
import app from "./app.js";
import db from "./db.js";

describe("/api", () => {
	describe("/videos", () => {
		describe("GET", () => {
			it("Returns the list of videos", async () => {
				const response = await request(app).get("/api/videos");

				expect(response.statusCode).toBe(200);
				expect(response.body[0].src).toBe(
					"https://www.youtube.com/embed/dQw4w9WgXcQ?si=sdvqEritjOTwN2Af"
				);
			});
		});

		describe("/:id", () => {
			describe("DELETE", () => {
				it("Returns a successful response if the id exists", async () => {
					const response = await request(app).delete("/api/videos/1");

					expect(response.statusCode).toBe(200);
				});

				it("Deletes the video from the database if the id exists", async () => {
					await request(app).delete("/api/videos/1");

					const dbResponse = await db.query(
						"SELECT * FROM videos WHERE id = $1",
						[1]
					);
					expect(dbResponse.rows.length).toBe(0);
				});
			});
		});
	});
});
