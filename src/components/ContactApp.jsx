import React from "react";
import { getContacts } from "../utils/data";
import { Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import HomePage from "../pages/HomePage";
import AddPage from "../pages/AddPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { getUserLogged, putAccessToken } from "../utils/api";

class ContactApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: getContacts(),
    };

    this.state = {
      authedUser: null,
      initializing: true,
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onAddContactHandler = this.onAddContactHandler.bind(this);
  }
  onDeleteHandler(id) {
    const contacts = this.state.contacts.filter((contact) => contact.id !== id);
    this.setState({ contacts });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });
    putAccessToken("");
  }

  async componentDidMount() {
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onAddContactHandler({ name, tag }) {
    this.setState((prevState) => {
      return {
        contacts: [
          ...prevState.contacts,
          {
            id: +new Date(),
            name,
            tag,
            image: "../images/default.jpg",
          },
        ],
      };
    });
  }

  render() {
    if (this.state.initializing) {
      return null;
    }
    if (this.state.authedUser === null) {
      return (
        <div className='contact-app'>
          <header className='contact-app__header'>
            <h1>Aplikasi Kontak</h1>
          </header>
          <main>
            <Routes>
              {/*  Tanda asterisk (*) pada nilai path digunakan untuk mencangkup
              seluruh URL yang belum terdefinisikan. Artinya, bila kita
              menetapkan nilai /*, apa pun URL tak terdefinisikan yang diakses
              dengan awal / (contoh /login, /signup, dsb) akan menampilkan
              halaman login.  */}
              <Route
                path='/*'
                element={<LoginPage loginSuccess={this.onLoginSuccess} />}
              />
              <Route path='/register' element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      );
    }

    return (
      <div className='contact-app'>
        <header className='contact-app__header'>
          <h1>Aplikasi Kontak</h1>
          <Navigation
            logout={this.onLogout}
            name={this.state.authedUser.name}
          />
        </header>
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/add' element={<AddPage />} />
          </Routes>
        </main>
      </div>
    );
  }
}

export default ContactApp;
