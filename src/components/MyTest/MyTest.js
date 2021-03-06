import React, { Component } from "react";
import { connect } from "react-redux";
import {  withRouter } from "react-router-dom";
import Header from "../Header";
// import Countdown from "react-countdown";
import {  Divider } from "antd";
import * as CategoryTypes from '../../util/Categories';
import * as actions from "../../redux/actions/QuestionActions";
import MultipleChoiceTest from "../Categories/Multiple Choice/MultipleChoiceTest";
import BlanksTest from "../Categories/Blanks/BlanksTest";
import DropDownTest from "../Categories/Select-From-dropdown/DropDownTest";
import TrueAndFalseTest from "../Categories/TrueAndFalse/TrueAndFalseTest";
import MultipleCheckboxTest from "../Categories/MultipleCheckbox/MultipleCheckboxTest";
import SequenceInTest from "../Categories/SequenceInOrder/SequenceInTest";
import MatchingWordsTest from "../Categories/MatchingWords/MatchingWordsTest";
import MatchDragTest from "../Categories/MatchDrag/MatchDragTest";
import MatchDragImgTest from "../Categories/MatchDragImg/MatchDragImgTest";
import AudioMultipleChoiceTest from '../Categories/AudioMultipleChoice/AudioMultipleChoiceTest';
import AudioSequenceInTest from '../Categories/AudioSequenceInOrder/AudioSequenceInTest';
import VideoMultipleChoiceTest from '../Categories/VideoMultipleChoice/VideoMultipleChoiceTest';
import VideoSequenceInTest from '../Categories/VideoSequenceInOrder/VideoSequenceInTest';
import DragImageAreaTest from '../Categories/DragImageArea/DragImageAreaTest';
import SubmitTest from "../SubmitTest/SubmitTest";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";
// import Countdown from "react-countdown";

// import MultipleC from "../Categories/Multip"

const minuteSeconds = 60;
// let hourSeconds = 3600;

class MyTest extends Component{

  state = {
    router: React.PropTypes,
    currentquestion:0,
    questions:this.props.questions,
    remainingTime: 1000
  }
  renderTime = (dimension, time) => {
    // if(remainingTime === 0){
    //   this.onCompleteCountdown()
    // }
    // this.onCompleteCountdown(remainingTime)
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };
  onCompleteCountdown = (rem)=>{

    // if(rem === 0){
    //   console.log("kahsdhagsdihaskdjhalskjdhakjsdhkajshdkjah")
    
    this.setState({currentquestion: this.props.questions.questions.length})
    this.RenderorSubmit()
    // }
    // this.updateCurrentNo()
    
  }
  getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  // getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  getTimeMinutes = (time) => (Math.floor(time / 60)) | 0;
  
  componentDidMount() {
    // this.props.addQuestion();
    this.props.initquestions()
    this.props.initcolor()
    this.props.initscore()
    this.props.inittime()
    this.setState({remainingTime: (Date.now() + this.props.time * 60 * 1000)})
  }

  updateCurrentNo = ()=>{
    let x = this.state.currentquestion + 1
    // if(x<this.props.questions.questions.length)


    // start from here make sure that the final test complete page is added ans also score..



    this.setState({currentquestion: x})
  }

  renderQuestionRows = (item, cur) => {
    //<MultipleChoice quesNo={1} data={data} />
    //    const ques = this.props.questions;
    // console.log(this.state.questions.questions[1])
    // console.log(this.state.questions)
    //console.log("ques.ques: ",this.props.questions.questions);
    // const result = this.props.questions.questions.map((item, index) => {
      //console.log("item ",item);
      cur++;
      const index = cur
      // console.log(index, cur)
      //console.log("item: ", item.category)
      if(item.category === CategoryTypes.MULTIPLE_CHOICE){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <MultipleChoiceTest
            color={this.props.questions.color}
            // actions={[
                    
            //   <EditTwoTone onClick={()=>{(new MultipleChoice()).showModal();}} twoToneColor="#52c41a"   key="edit" />,
            //   <DeleteTwoTone onClick={()=>{this.onDelete();}} twoToneColor="#eb2f96" key="del"/>,
            // ]}
            quesNo={index}
            userAnsList={this.props.updateUserAnsList}
            nextQue = {this.updateCurrentNo}
            data={item}
            score = {this.props.score}
            testscore = {this.props.testscore}
          />
        </div>
      );
    }else if(item.category === CategoryTypes.FILL_IN_THE_BLANKS){
     // console.log("sdfsd");
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <BlanksTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
            userAnsList={this.props.updateUserAnsList}
            nextQue = {this.updateCurrentNo}
            score = {this.props.score}
            testscore = {this.props.testscore}
          />
        </div>
      );
    }else if(item.category === CategoryTypes.SELECT_FROM_DROPDOWN){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <DropDownTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
            userAnsList={this.props.updateUserAnsList}
            nextQue = {this.updateCurrentNo}
            score = {this.props.score}
            testscore = {this.props.testscore}
          />
          
        </div>
      );
    }else if(item.category === CategoryTypes.TRUE_AND_FALSE){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <TrueAndFalseTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
            score = {this.props.score}
            userAnsList={this.props.updateUserAnsList}
            nextQue = {this.updateCurrentNo}
            testscore = {this.props.testscore}
            
          />
        </div>
      )
      ;
    }
    else if(item.category === CategoryTypes.MULTIPLE_CHECKBOX){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <MultipleCheckboxTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
            userAnsList={this.props.updateUserAnsList}
            nextQue = {this.updateCurrentNo}
            score = {this.props.score}
            testscore = {this.props.testscore}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.SEQUENCE_IN_ORDER){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <SequenceInTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
            userAnsList={this.props.updateUserAnsList}
            nextQue = {this.updateCurrentNo}
            score = {this.props.score}
            testscore = {this.props.testscore}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.MATCHING_WORDS){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <MatchingWordsTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
            userAnsList={this.props.updateUserAnsList}
            nextQue = {this.updateCurrentNo}
            score = {this.props.score}
            testscore = {this.props.testscore}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.MATCH_DRAG_IMG){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <MatchDragImgTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
            userAnsList={this.props.updateUserAnsList}
            nextQue = {this.updateCurrentNo}
            score = {this.props.score}
            testscore = {this.props.testscore}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.AUDIO_MULTIPLE_CHOICE){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <AudioMultipleChoiceTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
            userAnsList={this.props.updateUserAnsList}
            nextQue = {this.updateCurrentNo}
            score = {this.props.score}
            testscore = {this.props.testscore}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.AUDIO_SEQUENCE_ORDER){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <AudioSequenceInTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
            userAnsList={this.props.updateUserAnsList}
            nextQue = {this.updateCurrentNo}
            score = {this.props.score}
            testscore = {this.props.testscore}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.VIDEO_MULTIPLE_CHOICE){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <VideoMultipleChoiceTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
            userAnsList={this.props.updateUserAnsList}
            nextQue = {this.updateCurrentNo}
            score = {this.props.score}
            testscore = {this.props.testscore}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.VIDEO_SEQUENCE_ORDER){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <VideoSequenceInTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
            userAnsList={this.props.updateUserAnsList}
            nextQue = {this.updateCurrentNo}
            score = {this.props.score}
            testscore = {this.props.testscore}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.DRAG_IMAGE_AREA){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <DragImageAreaTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
            userAnsList={this.props.updateUserAnsList}
            nextQue = {this.updateCurrentNo}
            score = {this.props.score}
            testscore = {this.props.testscore}
          />
        </div>
      );
    }
    else if(item.category === CategoryTypes.MATCH_DRAG){
      return (
        <div
          key={item.ans[0]}
          style={{ marginTop: 20 }}
          // key={item}
          className="row"
        >
          <MatchDragTest
            color={this.props.questions.color}
            quesNo={index}
            data={item}
            userAnsList={this.props.updateUserAnsList}
            nextQue = {this.updateCurrentNo}
            score = {this.props.score}
            testscore = {this.props.testscore}
          />
        </div>
      );
    }
    // })
    ;
    // return result;
  };

  RenderorSubmit = ()=>{
    const crr = this.state.currentquestion
    if(crr === this.props.questions.questions.length){
      return(
        <SubmitTest />
      )
    }
    else if(this.props.questions.questions){
      // console.log(this.props.questions.questions[this.state.currentquestion])
      return(
        this.renderQuestionRows(this.props.questions.questions[this.state.currentquestion],this.state.currentquestion)
      )
    }
    else{
      return(
        <p>No Questions Added yet</p>
      )
    }
  }


    render(){
        // const Completionist = () => <span>You are good to go!</span>;
        // const remainingTime = Date.now() + this.props.time * 60 *1000
        // const remainingTime = this.state.remainingTime
        return(
            <div className="mainBody">
        {/* <h1>{this.props.user.username}</h1> */}
        <Header  onCompleteC = {this.onCompleteCountdown} com = "Test"/>
        <div style={{ position: "fixed" }} className="add">
          <div className="row">
            <br />
            <hr />
            <br />
          </div>
        </div>
        {/* Options */}
        <div style={{ height: 10 }} />
        <div style={{ height: 10 }} />
        <div style={{ height: 10 }} />
        <div />
        <Divider style={{ marginTop: 20 }} orientation="left">
        
        </Divider>

        <div className="row" style={{float: "right", paddingRight:"50px"}}>
        {/* <CountdownCircleTimer
        {...timerProps}
        colors={[["#000000", 0.8],["#FF0000", 0.2]]}
        duration={remainingTime}
        // initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > minuteSeconds
        ]}
      >
        {({ elapsedTime }) =>
        // console.log(elapsedTime)
          this.renderTime("M", this.getTimeMinutes(remainingTime - elapsedTime))
        }
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#000000", 0.8],["#FF0000", 0.2]]}
        duration={minuteSeconds}
        // duration={20}
        // initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > 0
        ]}
      >
        {({ elapsedTime }) =>
          this.renderTime("S", this.getTimeSeconds(elapsedTime))
        }
      </CountdownCircleTimer> */}

      {/* <Countdown date={parseInt(remainingTime)} onComplete={this.onCompleteCountdown} style={{width:"60px"}}  >
    <Completionist />
  </Countdown> */}
      </div>
      



        <Divider style={{ marginTop: 20 }} orientation="left" />
        <div style={{flex:1, flexDirection: "row-reverse", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
          <p>Questions :{" "}
          {this.props.questions.questions.length
            ? this.props.questions.questions.length
            : "0"}</p>
        
        </div>
      
        <br />
        {/* {this.props.questions ? (
          this.renderQuestionRows(this.state.questions.questions[this.state.currentquestion],this.state.currentquestion)
          // this.renderQuestionRows(this.state.questions.questions[7])
        ) : (
          <p>No Questions Added yet</p>
        )} */}
        {/* {this.RenderorSubmit()} */}
        {this.props.questions ? (
          this.RenderorSubmit()
        ) : (
          <p>No Questions Added yet</p>
        )}
      </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateUserAnsList :(list, score, testscore ) =>{
      dispatch(actions.changetestscore(list, testscore, score))
    },
    initquestions:()=>{ dispatch(actions.initquestions())},
    initcolor:()=>{dispatch(actions.initcolor())},
    inittime:()=>{dispatch(actions.inittime())},
    initscore:()=>{dispatch(actions.initscore())},

  });
  const mapStateToProps = (state) => {
    return {
      user: state.user,
      questions: state.question,
      option: state.option,
      score: state.question.score,
      testscore: state.question.testscore,
      time: state.question.time

    };
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyTest));