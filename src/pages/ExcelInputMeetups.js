import React from "react";
import Card from "../components/ui/Card";
import Button from "react-bootstrap/Button";

class ExcelInputMeetups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      isLoading: this.props.isLoading
    };
  }

  deleteHandler(title) {
    const items = this.state.items.slice();
    for (let i = 0; i < items.length; i++) {
      if (items[i].title === title) {
        items.splice(i, 1);
      }
    }
    this.setItems(items);
  }

  confirmHandler() {
    this.props.onSubmit(this.state.items);
  }

  setItems(items) {
    this.setState({ items: items });
    this.props.onSetItems(items);
  }

  render() {
    return (
      <Card>
        <div>
          <table className="table container">
            <thead>
              <tr key="Intestazione">
                <th scope="col">Item</th>
                <th scope="col">Image</th>
                <th scope="col">Description</th>
                <th scope="col">address</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map((meetup) => (
                <tr key={meetup.title}>
                  <th>{meetup.title}</th>
                  <td>
                    <img
                      className="img-thumbnail"
                      src={meetup.image}
                      alt={meetup.title}
                    />
                  </td>
                  <th>{meetup.description}</th>
                  <td>{meetup.address}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteHandler(meetup.title)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {this.state.items.length ? (
            <div class="row">
              <div class="col-lg-1 col-centered">
              <Button
                className="mx-auto"
                variant="success"
                size="lg"
                disabled={this.state.isLoading}
                onClick={() => {
                  this.confirmHandler();
                  this.props.setIsLoading(true);
                  this.setState({isLoading: true});
                }}
              >
                {this.state.isLoading ? "Loading..." : "Confirm"}
              </Button>
              </div>
            </div>
          ) : null}
        </div>
      </Card>
    );
  }
}

export default ExcelInputMeetups;
