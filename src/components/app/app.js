import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import ErrorMessage from '../errorMessage';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';
import CharDetails from '../charDetails';
import ItemList from '../itemList';
import gotService from '../../services/gotService';

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
                    <Row>
                        <Col md='6'>
                            <ItemList 
                            onItemSelected={this.onItemSelected}
                            getData={this.gotService.getAllBooks}
                            renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row> 
                </Container>
            </>
        );
    }
}