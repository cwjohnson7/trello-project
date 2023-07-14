import styled from "styled-components";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddItem from "../utilities/AddItem";
import styles from "./HomeScreen.module.css";
import { getUserBoardsThunk } from "./HomeScreenSlice";
import { useEffect } from "react";

// HomeScreen Component
const HomeScreen = () => {
  debugger;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.authenticated );
  const boards = useSelector((state) => state.homeScreen.boards);
  const org  = useSelector((state) => state.auth.org);

  const navigate = useNavigate();

  const handleBoardClick = (e) => {
    const boardId = e.currentTarget.id;
    navigate(`/boards/${boardId}`);
  }
  useEffect(() => {
    dispatch(getUserBoardsThunk({ token }));
  }, [token, dispatch]);


  return(
    <div className={styles.homeScreen}>
      <Container>
        <h2>  Workspace id: {org} </h2>
        <hr />

        <Row>

          {boards.map((board) => (
            <Col md={3} key={board._id} className={styles.cardContainer}>
              <Card id={board._id} board={board} onClick={handleBoardClick} style={{ height: "8rem", margin: "0 10px 10px 0", background: "#ADC8D2" }} className={styles.card}>
                <Card.Body className="text-center">
                  <Card.Title>{board.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))} 
             
        </Row>
        
        <AddItem title="Board" orgId={org} />
        
      </Container>
    </div>
  )
};

export default HomeScreen;