import React, {Component} from 'react';
import { Card, Modal, List } from 'antd';
import { EditTwoTone,  DeleteTwoTone } from '@ant-design/icons';
// import  from './MakeSequenceInOrder';
import classes from './MatchingWords.module.css';
import MakeMatchingWords from './MakeMatchingWords';
class MatchingWords extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            visible: false,
          };
    }
    showModal = () => {
      this.setState({ visible: true });
    };
  
    handleOk = () => { 
      this.setState({ visible: false });
    };
  
    handleCancel = () => {
      this.setState({ visible: false });
    };

    onDelete=()=>{
      this.props.deleteQuestion(this.props.data.id, this.props.data.key);
    }
    render(){
        // const ListStyle = {
        //     display: 'block',
        //     height: '30px',
        //     lineHeight: '30px',
        //   };
        return(
            // <div>
                 <div  className="col-12 col-sm-10 offset-sm-1">
                <Card style={{backgroundColor:this.props.color}}
                  actions={[
                    
                    <EditTwoTone onClick={()=>{this.showModal();}} twoToneColor="#52c41a"   key="edit" />,
                    <DeleteTwoTone onClick={()=>{this.onDelete();}} twoToneColor="#eb2f96" key="del"/>,
                  ]}>
        <p style={{ fontSize: 17}}>{this.props.quesNo}. {this.props.data.description}</p>
            {/* </div> */}
            <div className={classes.DivinCol}>
                <div>
                    <h6>Left Options</h6>
                <List itemLayout="horizontal" >
            {this.props.data.leftoptions.map(index=>{
                return(
                    <div className={classes.MyListDiv} key={"Matchleft"+index}>
                        <List.Item>{index}</List.Item>
                    </div>
            )})}
            </List>
                </div>
                <div>
                    <h6>Right Options</h6>
                <List itemLayout="horizontal" >
            {this.props.data.rightoptions.map(index=>{
                return(
                    <div className={classes.MyListDiv} key={"Matchright"+index}>
                        <List.Item>{index}</List.Item>
                    </div>
            )  })}
            </List>
                </div>
                <div>
                    <h6>Right Answers</h6>
                <List itemLayout="horizontal" >
            {this.props.data.ans.map(index=>{
                return(
                    <div className={classes.MyListDiv} key={"Matchans"+index}>
                        <List.Item>{index}</List.Item>
                    </div>
            )  })}
            </List>
                </div>
            </div>
            
            </Card>
            <Modal
              style={{ width: 1000 }}
              title="Edit Question"
              visible={this.state.visible}
              onCancel={this.handleCancel}
              width={1200}
              footer={null}
            >
            
            <MakeMatchingWords updateQuestion={this.props.updateQuestion} description={this.props.data.description} question={this.props.data}  handleOk={this.handleOk} handleCancel={this.handleCancel}/>
            </Modal>
            </div>
            // </div>
        )
    }
}


export default MatchingWords;