import React, { Component } from 'react';
import './event.css';
class EventPage extends Component {
  state = {
    creating: false,
    event: [],
  };
  constructor(props) {
    super(props);
    this.titleEl = React.createRef();
  }
  componentDidMount() {
    this.fetchEvents();
  }
  fetchEvents() {
    const requestBody = {
      query: `query {
            events{
                _id
                title 
            }
        }`,
    };
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }

        return res.json();
      })
      .then((resData) => {
        const events = resData.data.events;
        this.setState({ events: events });
        console.log(events);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  submitHandler = (event) => {
    event.preventDefault();
    const title = this.titleEl.current.value;
    console.log(title);

    const requestBody = {
      query: `mutation {
            createEvent(eventInput:{title:"${title}"}){
                _id
                title
            }
        }`,
    };
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }

        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  rechercher = (event) => {
    event.preventDefault();
    const title = this.titleEl.current.value;

    const requestBody = {
      query: `query {
            getEventByTitle(eventTitle:"${title}"){
                _id
                title 
            }
        }`,
    };
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }

        return res.json();
      })
      .then((resData) => {
        const events = resData.data.events;
        this.setState({ events: events });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  deleteEvent = (event) => {
    event.preventDefault();

    const requestBody = {
      query: `mutation {
            deleteEvent(eventId:{_id:"${event._id}"}){
                
            }
        }`,
    };
    fetch('http://localhost:5000/graphql', {
      method: 'DELETE',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }

        return res.json();
      })
      .then((resData) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    // console.log(this.state);
    const eventList = this.state.events.map((event) => {
      return (
        <li>
          {event.title} <span onClick={this.deleteEvent(event._id)}></span>
        </li>
      );
    });
    return (
      <div>
        <div>
          <form className="title-form">
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" id="text" ref={this.titleEl} />
            </div>
            <div className="form-actions">
              <button type="submit" onClick={this.submitHandler}>
                Confirmer
              </button>
              <button type="submit" onClick={this.rechercher}>
                Rechercher
              </button>
            </div>
          </form>
          <ul>{eventList}</ul>
        </div>
      </div>
    );
  }
}
export default EventPage;
