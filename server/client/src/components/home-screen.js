import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const boards = useSelector((state) => state.homeScreen.boards);
  const org = useSelector((state) => state.homeScreen.user.org);

  return(
    <HomeScreenContainer>
      <Container>
        <h2>{org} Workspace</h2>
        <hr />

        <Row>
          {boards.map((board) => (
            <CardContainer key={board._id} board={board}>
              <Card style={{ height: "8rem", margin: "0 10px 10px 0", background: "#ADC8D2" }}>
                <Card.Body className="text-center">
                  <Card.Title>{board.title}</Card.Title>
                </Card.Body>
              </Card>
            </CardContainer>
          ))}
        
        </Row>
      </Container>
    </HomeScreenContainer>
  )
};

export default HomeScreen;

const HomeScreenContainer = styled.div`
  padding-top: 160px;
`;

const CardContainer = styled.div`
  width: 25%;
  margin-bottom: 20px;
`;
