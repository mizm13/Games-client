import React, { useState } from "react";
import GameDataService from "../services/gamesDataService";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddComment = (props) => {
  let editing = false;
  let initialCommentState = "";

  if (props.location.state && props.location.state.currentComment) {
    editing = true;
    initialCommentState = props.location.state.currentComment.comment;
  }

  const [comment, setComment] = useState(initialCommentState);
  // keeps track if comment is submitted
  const [submitted, setSubmitted] = useState(false);

  const onChangeComment = (e) => {
    const comment = e.target.value;
    setComment(comment);
  };

  const saveComment = () => {
    var data = {
      text: comment,
      name: props.user.name,
      user_id: props.user.id,
      // get game id direct from url
      game_id: props.match.params.id,
    };
    console.log(data, "test2");
    if (editing) {
      // get existing comment id
      data.comment_id = props.location.state.currentComment._id;
      GameDataService.updateComment(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data, "test");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      GameDataService.createComment(data)
        .then((response) => {
          setSubmitted(true);
        })
        .catch((e) => {});
    }
  };

  /*
    GameDataService.createComment(data)
      .then((response) => {
        setSubmitted(true);
      })
      .catch((e) => {});
  };
  */

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "70vh",
        backgroundColor: "lightblue",
        height: "500px",
      }}
    >
      {submitted ? (
        <div>
          <b>
            <h4>
              <b>Comment submitted successfully!</b>
            </h4>
          </b>
          <Link to={"/mm355_games/" + props.match.params.id}>Back to Game</Link>
        </div>
      ) : (
        <Form style={{ marginTop: "20px" }}>
          <Form.Group>
            <b>
              <Form.Label>{editing ? "Edit" : "Create"} Comment:</Form.Label>
            </b>
            <Form.Control
              type="text"
              required
              value={comment}
              onChange={onChangeComment}
            />
          </Form.Group>
          <br></br>
          <Button variant="primary" onClick={saveComment}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AddComment;
