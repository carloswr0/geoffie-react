import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GameOver from './GameOver/GameOver';
import './Capitals.css';

  class Capitals extends Component {
    constructor(props) {
    super(props);
      this.state = {
        rounds: [],
        round: 0,
        seconds: 10,
        roundsCreated: false,
        points: 0,
        disableAnswer: false,
        answeredQuestionsStyle: ["","","","",],
        gameOverModalOpened: false,
      };
    }
    componentDidMount() {
      this.setTimers(true); // <- Sets time countdown.
      
      const countries = this.props.props.data.filter(country => 
        country.capital !== ""
      ); //<- Has 250 countries, But filters countries without capitals.

      const regionsInPlay = this.props.props.regionsToPlay.filter(region => 
          region.enabled === true
      ); //<- Filters countries from continents that we're not selected (Settings)

      const totalCounstriesInPlay = []; //<- Empty Total-Countries-To-Play array. (Soon to be UNSELECTED-Countries)
      const selectedCountriesToPlay = []; //<- Empty SELECTED-Countries-To-Play array. 
      const questionsQuantity = this.props.props.questionsToPlay; //<- Quantity of questions (Settings)
      
      regionsInPlay.map(region => {
        let result = countries.filter(e => e.region === region.name); //<- Grabs all countries from one continent.
        result.forEach(element => {
          totalCounstriesInPlay.push(element); //<-Inserts all of them in one array.
        });
        return null
      });

      for (let i = 0; i <= questionsQuantity-1; i++) {
        //BELOW: Picks 1 random-country.
        let randomCountry = totalCounstriesInPlay[Math.floor(Math.random()*totalCounstriesInPlay.length)];
        //BELOW: Grabs that 1 random-country index.
        let indexOfSelectedCountry = totalCounstriesInPlay.findIndex(country => country.name === randomCountry.name);
        //BELOW: Removes that 1 random-country from the totalCountries array so it wont be picked again.
        totalCounstriesInPlay.splice(indexOfSelectedCountry,1);
        //BELOW: Inserts that 1 random-country to SelectedCountries array.
        selectedCountriesToPlay.push(randomCountry);
      }

      this.buildRoundsToPlay(totalCounstriesInPlay, selectedCountriesToPlay);
    }

    hasDuplicates(array) {
      console.log( (new Set(array)).size !== array.length);
    }

    buildRoundsToPlay(totalCounstriesInPlay, selectedCountriesToPlay) {
      //BELOW THIS LINE: Merges both selected and unselected countries.
      const allCountries = totalCounstriesInPlay.concat(selectedCountriesToPlay);
      
      //BELOW THIS LINE: Creates 2 empty array, one to store 3 wrong answers and another to create the round scheme.
      let wrongQuestionsArray = [];
      const roundsPlaceholder = [];

      //BELOW THIS LINE: for every round (quantity of questions, do...)
      selectedCountriesToPlay.forEach(
        (country, index) => {
          //BELOW THIS LINE: REMOVE the correct answer from possible questions array.)
          let allButTheSelectedCountry = allCountries.filter((e) => {
            return e.name !== country.name
          });
          //BELOW THIS LINE: for 3 items do...)
          for (let i = 0; i <= 2; i++) {
            //BELOW THIS LINE: Picks 1 random-country.
            const randomWrongQuestion = allButTheSelectedCountry[Math.floor(Math.random()*allButTheSelectedCountry.length)];
            //BELOW THIS LINE: Grabs that 1 random-country index.
            const index = allButTheSelectedCountry.findIndex(country => country.name === randomWrongQuestion.name);
            //BELOW THIS LINE: Removes that 1 random-country from the totalCountries array so it wont be picked again.
            allButTheSelectedCountry.splice(index,1);
            //BELOW THIS LINE: Inserts that 1 random-country to wrongQuestionsArray.
            wrongQuestionsArray.push(randomWrongQuestion); 
          }
          //BELOW THIS LINE: RESETS the WrongQuestionArray.
          allButTheSelectedCountry = [...allCountries]; 
          //BELOW THIS LINE: Inserts the CORRECT Answer inside the wrongQuestionsArray.
          wrongQuestionsArray.push(country);
          //BELOW THIS LINE: and finally, pushes the created round inside the total rounds array.
          roundsPlaceholder.push({
            round: index,
            question: country.name,
            answer: country.capital,
            wrong: this.shuffle(wrongQuestionsArray),

          })
          wrongQuestionsArray = [];
        }
      );

      this.setState({
        roundsCreated: true,
        rounds: roundsPlaceholder,
      });
    }
  
    selectAnswer(answer, position) {
      this.setState({
        disableAnswer: true,
      });

      let thisRound = this.state.rounds[this.state.round]
      if(answer === thisRound.answer) {
        this.correctAnswer(position);
      } else {
        this.incorrectAnswer(position);
      }
    }

    correctAnswer(position) {
      let roundsModified = this.state.rounds;
      roundsModified.answered = true;
      
      let questionsStyle = this.state.answeredQuestionsStyle;
      questionsStyle[position] = "correct-answer";

      this.setState({
        rounds: roundsModified,
        points: this.state.points+1,
        answeredQuestionsStyle: questionsStyle,
        seconds: this.props.props.timePerQuestion/1000,
      })

      this.nextRoundDelay();
    }

    incorrectAnswer(position) {
      let roundsModified = this.state.rounds;
      roundsModified.answered = true;

      let questionsStyle = this.state.answeredQuestionsStyle;
      questionsStyle[position] = "wrong-answer";

      this.setState({
        rounds: roundsModified,
        answeredQuestionsStyle: questionsStyle,
        seconds: this.props.props.timePerQuestion/1000,
      })

      this.nextRoundDelay();
    }

    nextRoundDelay() {
      if(this.props.props.questionsToPlay === this.state.round+1){

        this.setTimers(false);

        setTimeout( ()  =>  {
          this.setState({
            disableAnswer: false,
            answeredQuestionsStyle: ["","","","",],
            gameOverModalOpened: true,
          })
        }, 1000);
      }else{
        setTimeout( ()  =>  {
          this.setState({
            round: this.state.round+1,
            disableAnswer: false,
            answeredQuestionsStyle: ["","","","",],
          })
        }, 1000);
      }
    }

    shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    setTimers(start) {
      if(start){
        this.setState({
          seconds: this.props.props.timePerQuestion / 1000,
        });
        this.timer = setInterval((e) => {
          this.setState({
            seconds: this.state.seconds-1
          });
          if(this.state.seconds < 1) {
            this.ranOutOfTime();
          }
        }, 1000);
        
      } else {
        clearInterval(this.timer);
      }
    }

    ranOutOfTime() {
      let roundsModified = this.state.rounds;
      roundsModified.answered = true;
      let questionsStyle = this.state.answeredQuestionsStyle;
      questionsStyle[0] = "wrong-answer";
      questionsStyle[1] = "wrong-answer";
      questionsStyle[2] = "wrong-answer";
      questionsStyle[3] = "wrong-answer";
      this.setState({
        rounds: roundsModified,
        answeredQuestionsStyle: questionsStyle,
        seconds: this.props.props.timePerQuestion/1000,
      })
      this.nextRoundDelay();
    }
    render() {
    return (
      <React.Fragment>
        {this.state.roundsCreated ? 
              <div className="capitals-container">
                { this.state.gameOverModalOpened ? <GameOver props={this.state}></GameOver>:null}
                <div className="capitals-header">
                  <Link className="back-button option" to={`/`}><span>BACK</span></Link>
                  <span>{this.state.seconds}</span>
                  <span>{this.state.points}/{this.props.props.questionsToPlay}</span>
                </div>
                <div className="capitals-question">
                  <span className="capitals-header-span">ROUND {this.state.round+1}</span>
                  <h1 className="capitals-question-h1">CAPITAL CITY</h1>
                  <h1 className="capitals-question-h1">OF</h1>
                  <span className="capitals-question-span">{this.state.rounds[this.state.round].question}</span>
                </div>
                <div className="capitals-answers-grid">
                  <div className={`capitals-answers option ${this.state.answeredQuestionsStyle[0]}`} onClick={!this.state.disableAnswer ? (e) => this.selectAnswer(this.state.rounds[this.state.round].wrong[0].capital, 0) : undefined}>
                    {this.state.rounds[this.state.round].wrong[0].capital}
                  </div>
                  <div className={`capitals-answers option ${this.state.answeredQuestionsStyle[1]}`} onClick={!this.state.disableAnswer ? (e) => this.selectAnswer(this.state.rounds[this.state.round].wrong[1].capital, 1) : undefined}>
                    {this.state.rounds[this.state.round].wrong[1].capital}
                  </div>
                  <div className={`capitals-answers option ${this.state.answeredQuestionsStyle[2]}`} onClick={!this.state.disableAnswer ? (e) => this.selectAnswer(this.state.rounds[this.state.round].wrong[2].capital, 2) : undefined}>
                    {this.state.rounds[this.state.round].wrong[2].capital}
                  </div>
                  <div className={`capitals-answers option ${this.state.answeredQuestionsStyle[3]}`} onClick={!this.state.disableAnswer ? (e) => this.selectAnswer(this.state.rounds[this.state.round].wrong[3].capital, 3) : undefined}>
                    {this.state.rounds[this.state.round].wrong[3].capital}
                  </div>
                </div>
              </div>
          :
          null
        }
      </React.Fragment>
    );
  }
}

export default Capitals;
