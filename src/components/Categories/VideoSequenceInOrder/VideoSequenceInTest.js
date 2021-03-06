import React, {Component} from 'react';
import { Card, Button } from 'antd';
import classes from './SequenceInOrder.module.css';
// import ReactAudioPlayer from 'react-audio-player';
// import VideoPlayer from 'react-video-js-player';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
class VideoSequenceInTest extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            visible: false,
            mydata: [...this.props.data.options],
            videourl : this.props.data.videourl
          };
    }
    handleOnDragEnd = (result) =>{
        if (!result.destination) return;
        // console.log(result)
        const items = Array.from(this.state.mydata);
        
        const [reorderedItem] = items.splice(result.source.index, 1);
        // console.log(reorderedItem)
        items.splice(result.destination.index, 0, reorderedItem);
        // console.log(items)
        this.setState({mydata: items})
        
        
    }
    onClickHandler = ()=>{
        const userans = [...this.state.mydata];
        const ansans = [...this.props.data.ans];
        let yesorno = false;
        for(var i = 0; i<userans.length;i++){
            if(userans[i] === ansans[i]){
                yesorno = true
            }
            else{
                yesorno = false
                break;
            }
        }
      const data = {queNo: this.props.quesNo, userAns: userans, correctans:ansans, val:yesorno}
      this.props.userAnsList(data, this.props.testscore, this.props.score)
      this.props.nextQue()

    }

    render(){

        return(
            <div  className="col-12 col-sm-10 offset-sm-1">
                <Card style={{backgroundColor:this.props.color}}
                  >
                {/* <ReactAudioPlayer
                src={this.state.audiourl}
                autoPlay
                controls
                /> */}
                {/* <VideoPlayer controls={true} src={this.props.data.videourl} width="720"
                    height="420" /> */}
                     <iframe src={this.props.data.videourl} title="Video" width="640" height="360" style={{border: "1px solid black"}} 
              allow="autoplay; fullscreen; picture-in-picture" ></iframe>
        <p style={{ fontSize: 17}}>{this.props.quesNo}. {this.props.data.description}</p>
            {/* </div> */}
            <DragDropContext onDragEnd={this.handleOnDragEnd}>
            <Droppable droppableId="characters" >
    {(provided) => (
            <ol className = "characters" {...provided.droppableProps} ref={provided.innerRef}>
            {this.state.mydata.map(index=>{
                // console.log(index.split(",,"))
                // let x = 123 
                // let lala = index.split(",,")
                // {this.props.data.options.indexOf(index)}
                return(
                    <Draggable key = {index} draggableId={index} index= {this.state.mydata.indexOf(index)}>
                    {(provided) => (
                    <li className={classes.MyListDiv} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{index}
                   {/* </List.Item> */}
                   </li>
                    // </div>
                     )}
                     </Draggable>
                    
            )
                  
            })}
            {/* </List> */}
            {provided.placeholder}
            </ol>
            )}
            </Droppable>
            </DragDropContext>
            
            </Card>
            <Button type="primary" style={{float:"right"}} onClick={this.onClickHandler}>Next</Button>
            </div>
        )
    }
}
// <div className={classes.MyListDiv}>
// {/* <div > */}
// {/* <List.Item */}

export default VideoSequenceInTest;