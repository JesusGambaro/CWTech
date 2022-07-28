import "./App.css";
import {Nav, Form, Button, Navbar, Container} from "react-bootstrap";
import {React, useState} from "react";
function App() {
  const [textSend, setTextSend] = useState("");
  const [results, setResults] = useState([]);
  const senText = async (e) => {
    e.preventDefault();
    if (textSend === "") return;
    try {
      const res = await fetch(`http://localhost:3001/iecho?text=${textSend}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setResults([...results, (await res.json())?.text]);
    } catch (err) {
      console.log(err);
    }
    setTextSend("");
  };
  return (
    <Container className="bg-light p-0 min-vh-100 pb-5" fluid>
      <Navbar
        className="navbar static-top d-flex justify-content-center"
        bg="danger"
        variant="danger"
        expand="lg"
      >
        <Form className="d-flex w-50" onSubmit={senText}>
          <Form.Control
            type="search"
            placeholder="insert Text"
            className="me-2"
            aria-label="Send"
            value={textSend}
            onChange={(e) => setTextSend(e.target.value)}
          />
          <Button type="Submit" variant="primary">
            Send
          </Button>
        </Form>
      </Navbar>
      <Container className="w-75 bg-white mt-5 p-5" style={{minHeight: "75vh"}}>
        <h3>Results:</h3>
        <ul className="list-group align-items-center">
          {results.map((result, i) => (
            <li
              className="rounded w-75 list-group-item mt-2 border border-secondary"
              key={"li " + i}
            >
              {result}
            </li>
          ))}
        </ul>
      </Container>
    </Container>
  );
}

export default App;
