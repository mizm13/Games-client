import React, { useState, useEffect } from "react";
import GameDataService from "../services/gamesDataService";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Media from "react-bootstrap/Media";

const Game = (props) => {
  const [game, setGame] = useState({
    id: null,
    title: "",
    genre: "",
    comments: [],
  });
  const getGame = (id) => {
    GameDataService.get(id)
      .then((response) => {
        setGame(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getGame(props.match.params.id);
  }, [props.match.params.id]);

  const deleteComment = (commentId, index) => {
    GameDataService.deleteComment(commentId, props.user.id)
      .then((response) => {
        setGame((prevState) => {
          prevState.comments.splice(index, 1);
          return {
            ...prevState,
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Container style={{ textAlign: "center" }}>
        <Row>
          <Col>
            <Image
              src={game.thumbnail}
              fluid
              style={{ width: "40%", height: "100%" }}
            />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <Card className="w-50 mx-auto">
              <Card.Header as="h5">
                <b>{game.title}</b>
              </Card.Header>
              <Card.Body>
                <Card.Text>{game.short_description}</Card.Text>
                <Card.Text>
                  <b>Genre:</b> {game.genre} <b>Platform:</b> {game.platform}
                </Card.Text>
                <Card.Text>
                  <b>Developer:</b> {game.developer}
                </Card.Text>
                <a href={game.game_url} target="_blank">
                  Link To Play!
                </a>
                <br></br>
                {props.user && (
                  <Link
                    to={"/mm355_games/" + props.match.params.id + "/comment"}
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginLeft: "5 !important",
                    }}
                  >
                    {" "}
                    <br></br>
                    Add Comment
                  </Link>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <h2>
              <u>Comments</u>
            </h2>
            <br></br>
            {game.comments.map((comment, index) => {
              return (
                <Media key={index}>
                  <Media.Body>
                    <h5>
                      <b> {comment.name} </b>
                      {" commented on " +
                        new Date(Date.parse(comment.date)).toDateString()}
                    </h5>
                    <p>- {comment.comment}</p>
                    {props.user && props.user.id === comment.user_id && (
                      <Row>
                        <Col>
                          <Link
                            to={{
                              pathname:
                                "/mm355_games/" +
                                props.match.params.id +
                                "/comment",
                              state: { currentComment: comment },
                            }}
                          >
                            Edit
                          </Link>
                        </Col>
                        <Col>
                          <Button
                            variant="link"
                            onClick={() => {
                              const userConfirmed = window.confirm(
                                "Are you sure you want to delete this comment?"
                              );
                              if (userConfirmed) {
                                deleteComment(comment._id, index);
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Media.Body>
                </Media>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Game;
