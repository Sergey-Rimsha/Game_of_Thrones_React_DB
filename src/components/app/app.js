import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import ErrorMessage from '../errorMessage';
import RandomChar from '../randomChar';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {

    gotService = new gotService();

    state = {
        show: true,
    }

    onShow = () => {
        this.setState((state) => {
            return {
                show: !state.show
            }
        });
    }

    render() {

        const char = this.state.show ? <RandomChar /> : null;

        if (this.state.error) {
            return <ErrorMessage />
        }

        return(
            <Router>
                <div className='app'> 
                    <Container>
                        <Header /> 
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <button onClick={this.onShow}
                                className="btn btn-secondary">
                                    Toggle random character
                                </button>
                            </Col>
                        </Row>
                        <Route path='/' component={() => <h1>Welcome to GOT DB</h1>} exact/>
                        <Route path='/characters' component={CharacterPage} />
                        <Route path='/books' component={BooksPage} exact/>
                        <Route path='/books/:id' render={({match}) => {
                            const {id} = match.params;
                        return <BooksItem bookId={id}/>}}/>
                        <Route path='/houses' component={HousesPage} />
                    </Container>
                </div>
            </Router>
        );
    }
}