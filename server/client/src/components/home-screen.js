import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

const HomeScreen = () => {
  
  return(
    <HomeScreenContainer>
      <Container>
        <h2>Organization Workspace</h2>
        <hr />

        <Row style={{  }}>
          <CardContainer >
            <Card style={{ height: "8rem", margin: "0 10px 10px 0", background: "#B4F8C8" }}>
              <Card.Body className="text-center">
                <Card.Title>Board Title</Card.Title>
              </Card.Body>
            </Card>
          </CardContainer>

          <CardContainer>
            <Card style={{ height: "8rem", margin: "0 10px 10px 0", background: "#7EC8E3" }}>
              <Card.Body className="text-center">
                <Card.Title>Board Title</Card.Title>
              </Card.Body>
            </Card>
          </CardContainer>
          
          <CardContainer>
            <Card style={{ height: "8rem", margin: "0 10px 10px 0", background: "#BDC3CB" }}>
              <Card.Body className="text-center">
                <Card.Title>Board Title</Card.Title>
              </Card.Body>
            </Card>
          </CardContainer>

          <CardContainer>
            <Card style={{ height: "8rem", margin: "0 10px 10px 0", background: "#7DA1BF" }}>
              <Card.Body className="text-center">
                <Card.Title>Board Title</Card.Title>
              </Card.Body>
            </Card>
          </CardContainer>

          <CardContainer>
            <Card style={{ height: "8rem", margin: "0 10px 10px 0", background: "#99B0B0" }}>
              <Card.Body className="text-center">
                <Card.Title>Board Title</Card.Title>
              </Card.Body>
            </Card>
          </CardContainer>

          <CardContainer>
            <Card style={{ height: "8rem", margin: "0 10px 10px 0", background: "#ADC8D2" }}>
              <Card.Body className="text-center">
                <Card.Title>Board Title</Card.Title>
              </Card.Body>
            </Card>
          </CardContainer>
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
