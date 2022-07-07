import React from "react";

class ExcelInputMeetups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
    };
  }

  deleteHandler(title) {
    const items = this.state.items.slice();
    for (let i = 0; i < items.length; i++) {
      if (items[i].Title === title) {
        items.splice(i, 1);
      }
    }
    this.setState({ items: items });
  }

  confirmHandler() {
    this.state.items.forEach((d) => {
      console.log(d.Title);
    });
  }

  render() {
    return (
      <section>
        <h1>Insert by File</h1>
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
              {this.state.items.map((d) => (
                <tr key={d.Title}>
                  <th>{d.Title}</th>
                  <td>
                    <img
                      className="img-thumbnail"
                      src={d.Image}
                      alt={d.Title}
                    />
                  </td>
                  <th>{d.Description}</th>
                  <td>{d.Address}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteHandler(d.Title)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {this.state.items.length ? (
            <div>
              <button
                className="btn btn-success"
                onClick={() => this.confirmHandler()}
              >
                Confirm
              </button>
            </div>
          ) : null}
        </div>
      </section>
    );
  }
}

export default ExcelInputMeetups;
