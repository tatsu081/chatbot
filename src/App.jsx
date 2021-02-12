import React from 'react';
import './assets/styles/style.css';
import defaultDataset from "./dataset";
import {AnswersList, Chats} from "./components";

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            answers: [],　　　       //回答コンポーネントに表示するデータ
            chats: [],　　　　　　　　　//チャットボットコンポーネントに表示するデータ
            currentId: "init",　　　　//現在の質問とID
            dataset: defaultDataset,　//質問と回答のデータセット
            open: false　　　　　　　　 //問い合わせフォーム用モーダルの開閉を管理
        }
        this.selectAnswer = this.selectAnswer.bind(this);
    }

    displayNextQuestion = (nextQuestionId) => {
        const chats =this.state.chats
        chats.push({
            text:this.state.dataset[nextQuestionId].question,
            type: 'question'
        })
        this.setState({
            answers: this.state.dataset[nextQuestionId].answers,
            chats: chats,
            currentId:nextQuestionId
        })
    }

    selectAnswer = (selectedAnswer, nextQuestionId) => {
        switch (true){
            case (nextQuestionId === 'init'):
                this.displayNextQuestion(nextQuestionId)
                break;
            case (/^https:*/.test(nextQuestionId)):
                const a = document.createElement('a');
                a.href = nextQuestionId;
                a.target = '_blank';
                a.click();
                break;
            default:
                const chats = this.state.chats;
                chats.push ({
                    text: selectedAnswer,
                    type: 'answer'
                })

                this.setState({
                    chats:chats
                })

                setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
                break;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        const scrollArea = document.getElementById('scroll-area');
        if (scrollArea){
            scrollArea.scrollTop = scrollArea.scrollHeight;
        }
    }

    componentWillMount() {
        const initAnswer = "";
        this.selectAnswer(initAnswer, this.state.currentId)
    }

    render() {
        return (
            <section className={"c-section"}>
                <div className={"c-box"}>
                    <Chats chats={this.state.chats}/>
                    <AnswersList answers={this.state.answers} select={this.selectAnswer}/>
                </div>
            </section>
        );
    }
}

export default App;
