import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import React, { useState, useEffect } from "react";
import GameDataService from "../services/gamesDataService";
import { Link } from "react-router-dom";

const GamesList = (props) => {
  const [games, setGames] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [genre, setGenre] = useState(["All Genres"]);

  useEffect(() => {
    retrieveGames();
    retrieveGenres();
  }, []);

  const retrieveGames = () => {
    GameDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setGames(response.data.games);
        console.log("test");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveGenres = () => {
    GameDataService.getGenres()
      .then((response) => {
        console.log(response.data);
        //start with 'All Genres' if user doesn't specify any genres
        setGenre(["All Genres"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const onChangeSearchGenre = (e) => {
    const searchGenre = e.target.value;
    setSearchGenre(searchGenre);
  };

  const find = (query, by) => {
    GameDataService.find(query, by)
      .then((response) => {
        console.log(response.data);
        setGames(response.data.games);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const findByTitle = () => {
    find(searchTitle, "title");
  };

  const findByGenre = () => {
    if (searchGenre === "All Genres") {
      retrieveGames();
    } else {
      find(searchGenre, "genre");
    }
  };

  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <h5 style={{ fontFamily: "Roboto, sans-serif" }}>
                  <b>Search Game</b>
                </h5>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByTitle}>
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <h5 style={{ fontFamily: "Roboto, sans-serif" }}>
                  <b>Select Genre</b>
                </h5>

                <Form.Control as="select" onChange={onChangeSearchGenre}>
                  {genre.map((genre) => {
                    return <option value={genre}>{genre}</option>;
                  })}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByGenre}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <br></br> {/*line break after the search button to look nicer */}
        <Row>
          {games.map((game) => {
            return (
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Img src={game.thumbnail} />
                  <Card.Body>
                    <Card.Title>{game.title}</Card.Title>
                    <Card.Text>Genre: {game.genre}</Card.Text>
                    <Card.Text>{game.short_description}</Card.Text>
                    <Link to={"/mm355_games/" + game._id}>View Comments</Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default GamesList;
