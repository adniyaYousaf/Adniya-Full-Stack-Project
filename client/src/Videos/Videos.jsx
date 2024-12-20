import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import "./videos.scss";
import { useState } from "react";

const formatDate = (d) => {
  let date = new Date(d);
  return date.toDateString();
};

const Videos = (props) => {
  const [removeBtnText, setRemoveBtnText] = useState(false);

  const mapVideos = props.video.map((video, index) => {
    return (
      <div key={index} className="container">
        <iframe
          src={video.src}
          title="Video recommendation"
          className="container_video"
        ></iframe>
        <div className="container_btns">
          <div className="container_btns_time">
            <p>{formatDate(video.addeddate)}</p>
          </div>
          <div
            className="container_btns_thumb-box"
            onClick={() => props.update(video.id, "up")}
          >
          
            <FaThumbsUp className="container_btns_thumb-box_thumb" />
          </div>
          <div
            className="container_btns_thumb-box"
            onClick={() => props.update(video.id, "down")}
          >
            <FaThumbsDown className="container_btns_thumb-box_thumb" />
          </div>
          <button
            className="container_btns_delbtn"
            onClick={() => props.click(video.id)}
          >
            Delete
          </button>
        </div>
        <div className="container_title">
          <p>{video.title}</p>
          <p className="container_title_rating">
            Rating {video.rating}
            <span>
              <FaHeart color="red" />
            </span>
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="container-box">{mapVideos}</div>
    </>
  );
};

export default Videos;
