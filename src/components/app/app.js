import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import ErrorMessage from '../errorMessage';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';


export default class App extends Component {

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
            <> 
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
                    <CharacterPage />
                </Container>
            </>
        );
    }
}