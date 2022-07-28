import {Form, Button, Navbar, Container} from "react-bootstrap"; // Import the necessary components from React Bootstrap
import {useState} from "react";

const App = () => {
  const [textToReverse, setTextToReverse] = useState(""); // Initialize the state of the text to send to the API
  const [results, setResults] = useState([]); // Initialize the state of the results getted from the API

  // Function to send the text to the API and get the results when the button is clicked
  const reverseText = async (e) => {
    e.preventDefault();
    if (textToReverse === "") return; // If the text is empty, return
    try {
      const res = await fetch(
        `http://localhost:3001/iecho?text=${textToReverse}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); // Send the text to the API

      setResults([...results, (await res.json())?.text]); // Get the results from the API and add them to the results state
    } catch (err) {
      console.log(err);
    }
    setTextToReverse(""); // Reset the text
  };

  return (
    <Container className="bg-light p-0 min-vh-100 pb-5" fluid>
      <Navbar
        className="navbar static-top d-flex justify-content-center"
        bg="danger"
        variant="danger"
        expand="lg"
      >
        {/* Create a form to send the text to the API*/}
        <Form className="d-flex w-50" onSubmit={reverseText}>
          <Form.Control
            type="search"
            placeholder="insert Text"
            className="me-2"
            aria-label="Send"
            value={textToReverse}
            onChange={(e) => setTextToReverse(e.target.value)}
          />
          <Button type="Submit" variant="primary">
            Send
          </Button>
        </Form>
      </Navbar>
      <Container className="w-75 bg-white mt-5 p-5" style={{minHeight: "75vh"}}>
        <h3>Results:</h3>
        {/* Create a list of the results */}
        <ul className="list-group align-items-center">
          {results.map((result, i) => (
            <li
              className="rounded w-75 list-group-item mt-2 border border-secondary"
              key={"Text " + i}
            >
              {result}
            </li>
          ))}
        </ul>
      </Container>
    </Container>
  );
};

export default App;
