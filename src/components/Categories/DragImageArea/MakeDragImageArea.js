import React, { Component } from "react";
import { Input,  Button, Divider, List } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import Joi from "joi-browser";
import * as Schemas from "../../Schemas/Mcqs";
// import "../Multiple Choice/MakeMultipleChoice.css";
import classes from '../MatchingWords/MatchingWords.module.css'
const { TextArea } = Input;

const errorStyleText = {
  color: "#eb2f96",
};
export default class MakeDragImageArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
//  here left oprtions are leftoptions
//  right options are options
//  correct order of answers(ans) is Answers
      description: "",
      descriptionError: "",
      optionValue: "",
      optionValueError: "",
      AnsValueError: "",
      addorupdate : "Add Question",
      options: [],
      leftoptions:[],
      leftoptionsError:"",
      leftoptionValue:"",
      leftoptionValueError:"",
      Answers:[],
      optionsError: "",
      AnsValue:"",
      imageurl:"",
      value: [],
    };
  }
  componentDidMount() {
    if(this.props.description){
      // console.log(this.props.question)
        this.setState({description: this.props.question.description,
            options: this.props.question.rightoptions,
            leftoptions: this.props.question.leftoptions,
            Answers: this.props.question.ans,
            imageurl:this.props.question.imageurl,
            addorupdate : "Update Question"})
    }
  }

  onChangeOptionField = (val) => {
    // console.log(val.target.value);
    
    const value = val.target.value;
    this.setState({ optionValue: value });
    // console.log(this.state.optionValue)
  };
  onChangeAnsField = (val) => {
    // // console.log(val.target.value);
    
    const value = val.target.value;
    this.setState({ AnsValue: value });
    // // console.log(this.state.AnsValue)
  };
  onChangeLeftField = (val) => {
    // // console.log(val.target.value);
    
    const value = val.target.value;
    this.setState({ leftoptionValue: value });
    // // console.log(this.state.AnsValue)
  };

  onChangeDescription = (e) => {
    const value = e.target.value;
    this.setState({ description: value });
  };


  onAddLeftOption = () => {
    const result = Joi.validate(
      { option: this.state.leftoptionValue },
      Schemas.option
    );
    if (result.error) {
      this.setState({ leftoptionValueError: result.error.details[0].message });
    } 
    else {
      const found = this.state.leftoptions.some(
        (item) => item.toUpperCase() === this.state.leftoptionValue.toUpperCase()
      );
      if (!found) {
        this.setState({
          leftoptions: this.state.leftoptions.concat(this.state.leftoptionValue),
          leftoptionValueError: "",
        });
      } else {
        this.setState({ leftoptionValueError: "Already exists" });
      }
    }
  };
  onAddOption = () => {
    const result = Joi.validate(
      { option: this.state.optionValue },
      Schemas.option
    );
    if (result.error) {
      this.setState({ optionValueError: result.error.details[0].message });
    } 
    else {
      const found = this.state.options.some(
        (item) => item.toUpperCase() === this.state.optionValue.toUpperCase()
      );
      if (!found) {
        this.setState({
          options: this.state.options.concat(this.state.optionValue),
          optionValueError: "",
        });
      } else {
        this.setState({ optionValueError: "Already exists" });
      }
    }
  };
  onAddAnswer = () => {
    const result = Joi.validate(
      { option: this.state.AnsValue },
      Schemas.option
    );
    if(this.state.options.includes(this.state.AnsValue) || this.state.leftoptions.includes(this.state.AnsValue)){
      if (result.error) {
        this.setState({ AnsValueError: result.error.details[0].message });
      } 
      else {
        const found = this.state.Answers.some(
          (item) => item.toUpperCase() === this.state.AnsValue.toUpperCase()
        );
        if (!found) {
          this.setState({
            Answers: this.state.Answers.concat(this.state.AnsValue),
            AnsValueError: "",
          });
        } else {
          this.setState({ AnsValueError: "Already exists" });
        }
      }
    }
    else{
      this.setState({ AnsValueError: "Answer value is not present in Options" });
    }
    
  };

  onAddorUpdate = (ans)=>{
    if(this.state.addorupdate === "Update Question"){
      // console.log("Update function is called")
      // this.setState({ descriptionError: "", optionsError: "" });
      const data={category: "Drag Image Area", description: this.state.description,leftoptions:this.state.leftoptions, rightoptions: this.state.options, imageurl: this.state.imageurl, ans: ans};
      this.props.updateQuestion(data, this.props.question.key, this.props.question.id)
    }
    else{
      // console.log("ADD QUESTION function is called")
      const data={category: "Drag Image Area", description: this.state.description,leftoptions:this.state.leftoptions, rightoptions: this.state.options, ans: ans, imageurl: this.state.imageurl};
      this.props.addQuestion(data)
    }
  }

  onDeleteLeft = (option)=>{
    let leftoptions = this.state.leftoptions;
    const index = leftoptions.indexOf(option);
    if (index > -1) {
      leftoptions.splice(index, 1);
    }
    this.setState({ leftoptions: leftoptions})

  }
  onDelete = (optionsorans,option) => {
    let options = optionsorans;
    let ansans = this.state.Answers
    // console.log(options, this.state)
    const index = options.indexOf(option);
    const indexans = ansans.indexOf(option);
    // if(ansans.includes(option)){
      // // console.log("indexans  "+indexans)
    if (indexans > -1) {
      // // console.log("ASDFASDFADFADFDFS")
        ansans.splice(indexans, 1);
    }
    
    if (index > -1) {
      options.splice(index, 1);
    }
    // // console.log(this.state.value)
    // // console.log("aksjhdbfallealleallealle"+ansans)
    this.setState({ options: options, Answers:ansans });
    // // console.log(this.state.value)
  };
  

  renderAnswers = (optionsorans) => {
    return optionsorans.map((item) => {
      return (
        <div style={{ marginTop: 7 }} id={item} className={classes.DivinCol} key={"MDIA"+item}>
          <div className="col-5 col-sm-6 offset-sm-1">
            <div className={classes.MyListDiv}>
                        <List.Item
                        id={item}
                   >{item}</List.Item>
                    </div>
          </div>
          <div className="col-2 col-sm-1 ">
            <Button onClick={() => this.onDelete(this.state.options,item)}>
              {/* {" "} */}
              <span>
                <DeleteTwoTone  twoToneColor="#eb2f96" />
              </span>
            </Button>
          </div>
        </div>
      );
    });
  };
  renderOptions = (leftoptions) => {
    return leftoptions.map((item) => {
      return (
        <div style={{ marginTop: 7 }} id={item} className={classes.DivinCol} key={"MDMO"+item}>
         <div className="col-5 col-sm-6 offset-sm-1">
          {/* <div > */}
            <div className={classes.MyListDiv}>
                        <List.Item
                        id={item}
                   >{item}</List.Item>
                    </div>
          </div>
          <div className="col-2 col-sm-1 ">
            <Button onClick={() => this.onDeleteLeft(item)}>
              {" "}
              <span>
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </span>
            </Button>
          </div>
        </div>
      );
    });
  };
  onAddQuestion = () => {
    if (this.state.options.length > 0) {
      // options are present
      const result = Joi.validate(
        { description: this.state.description },
        Schemas.description
      );
      if (result.error) {
        this.setState({
          descriptionError: result.error.details[0].message,
          optionsError: "",
        });
      } else {
        this.setState({ descriptionError: "", optionsError: "" });
        // if (this.state.value[0]) {
          if (this.state.Answers[0]) {
          //      ADD to DATABASE
          // Closing modal
          // console.log(this.state.value)
          let ans=[];
          ans = this.state.Answers
          this.onAddorUpdate(ans)
          this.props.handleOk();
        } else {
          this.setState({ optionsError: "Please Select Atleast One Option." });
        }

        
      }
    } else {
      this.setState({ optionsError: "Please add atleast one option" });
    }
  };

  onChangeURLField = (e) =>{
    const value = e.target.value;
    this.setState({ imageurl: value });
  }
//  Add database connection.....




  render() { 
    return (
      <>
        <div className="row">
          <div className="col-12 col-sm-11 offset-sm-1">
            <p>Note: Enter the exact labels of left part of image in the left box, right part of image in the right box and swapped label list in the middle box</p>
            <TextArea
              placeholder="Enter Your Question"
              value={this.state.description}
              onChange={this.onChangeDescription}
              rows={4}
            />
            <br />
            <br />
            <TextArea
              placeholder="Enter Image URL here"
              value={this.state.imageurl}
              onChange={(val) => {
                this.onChangeURLField(val);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1">
            <p style={errorStyleText}>{this.state.descriptionError}</p>
          </div>
        </div>
        <br />

      <div className={classes.BoxOrderDiv}>

      
        <div className="row">
          <div className="col-12 col-sm-7 offset-sm-1">
            <Input
            style ={{width:"250px"}}
              placeholder="Enter Left Option Correct Order Here"
              value={this.state.leftoptionValue}
              onChange={(val) => {
                this.onChangeLeftField(val);
              }}
            />
          </div>
          <div className="col-12 col-sm-3">
            <Button
              className="add-option"
              style={{ marginLeft: 0, width:"100px" }}
              // block
              type="primary"
              // success
              onClick={this.onAddLeftOption}
            >
              {" "}
              Add Left
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-7 offset-sm-1">
            <Input
            style ={{width:"250px"}}
              placeholder="Enter Right Option Correct Order Here"
              value={this.state.optionValue}
              onChange={(val) => {
                this.onChangeOptionField(val);
              }}
            />
          </div>
          <div className="col-12 col-sm-3">
            <Button
              className="add-option"
              style={{ marginLeft: 0, width:"100px" }}
              // block
              type="primary"
              // success
              onClick={this.onAddOption}
            >
              {" "}
              Add Right
            </Button>
          </div>
        </div>
        
        </div>
              <br />
          <div className="row" style={{width:"600px", margin:"0 auto"}}>
          <div className="col-12 col-sm-5 offset-sm-1">
            <Input
            style ={{width:"250px"}}
              placeholder="Enter Swapped Options Here"
              value={this.state.AnsValue}
              onChange={(val) => {
                this.onChangeAnsField(val);
              }}
            />
          </div>
          <div className="col-12 col-sm-3">
            <Button
              className="add-option"
              style={{ marginLeft: 0, width:"105px" }}
              // block
              type="primary"
              // success
              onClick={this.onAddAnswer}
            >
              {" "}
              Add Options
            </Button>
          </div>
        </div>
        

        <p style={errorStyleText}>{this.state.optionValueError}</p>
        <br />
       
        


        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1">
            
            <p style={errorStyleText}>{this.state.AnsValueError}</p>
            {/* <br /> */}
            <p>** Please Enter the Answers in correct sequence **</p>
          </div>
        </div>

        <br />
        <div className={classes.DivinCol}>
        <div>
          <h6>Left Labels Correct Order</h6>
        {this.renderOptions(this.state.leftoptions)}
          </div>
          <div>
          <h6>Right Labels Correct Order</h6>
        {this.renderAnswers(this.state.options)}
          </div>
        
        </div>
        <br />
        <div className="col" style={{paddingLeft:"40%"}}>
        <h6>Swapped Options to be displayed</h6>
        {this.renderAnswers(this.state.Answers)}
        </div>
        
        
        
        <div className="row">
          <div className="col-12 col-sm-12 offset-sm-1">
            <p style={errorStyleText}> {this.state.optionsError} </p>
          </div>
        </div>
        <Divider />
        <div className="row">
          <div className="col-12 col-sm-2 offset-sm-7">
            <Button block
              onClick={() => {
                this.props.handleCancel();
              }}
              style={{marginTop: 7}}
            >
              Cancel
            </Button>
          </div>
          <div className="col-12 col-sm-3 ">
            <Button block
              onClick={() => {
                this.onAddQuestion();
              }}
              type="primary"
              style={{marginTop: 7}}
            >
              {/* Add Question */}
              {this.state.addorupdate}
            </Button>
          </div>
        </div>
      </>
    );
  }
}